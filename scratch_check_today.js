// Script to check ALL active_salem_registrations and filter by today
const dns = require('dns');
const fs = require('fs');
const nodemailer = require('nodemailer');

const env = fs.readFileSync('.env.local', 'utf8');
const dbMatch = env.match(/DATABASE_URL=(.+)/);
const dbUrl = dbMatch[1].trim();

const smtpHost = env.match(/SMTP_HOST=(.+)/)?.[1]?.trim() || '';
const smtpPort = parseInt(env.match(/SMTP_PORT=(.+)/)?.[1]?.trim() || '587');
const smtpUser = env.match(/SMTP_USER=(.+)/)?.[1]?.trim() || '';
const smtpPass = env.match(/SMTP_PASS=(.+)/)?.[1]?.trim() || '';

// DNS patch for Neon
const resolver = new dns.Resolver();
resolver.setServers(['8.8.8.8', '1.1.1.1']);
const origLookup = dns.lookup;
dns.lookup = (hostname, options, callback) => {
  let cb = callback, opts = options;
  if (typeof options === 'function') { cb = options; opts = {}; }
  if (typeof hostname === 'string' && hostname.includes('neon.tech')) {
    const returnIp = (ip) => opts && opts.all ? cb(null, [{ address: ip, family: 4 }]) : cb(null, ip, 4);
    resolver.resolve4(hostname, (err, addresses) => {
      if (!err && addresses && addresses.length > 0) return returnIp(addresses[0]);
      return returnIp('23.21.74.185');
    });
    return;
  }
  return origLookup(hostname, opts, cb);
};

const { Pool } = require('pg');
const pool = new Pool({ connectionString: dbUrl });

async function main() {
  // Get all registrations ordered by newest first
  const res = await pool.query(
    "SELECT * FROM active_salem_registrations ORDER BY created_at DESC LIMIT 50"
  );
  
  console.log(`\nTotal registrations in DB: ${res.rows.length}\n`);
  console.log('=== All Registrations ===');
  for (const row of res.rows) {
    const date = new Date(row.created_at).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
    const time = new Date(row.created_at).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
    console.log(`ID: ${row.id} | Code: ${row.registration_code} | Name: ${row.full_name} | Email: ${row.email_id} | Category: ${row.category} | Verified: ${row.is_verified} | Date: ${date} ${time}`);
  }
  
  // Today's registrations (IST)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayRes = await pool.query(
    "SELECT * FROM active_salem_registrations WHERE created_at >= NOW() - INTERVAL '24 hours' ORDER BY created_at DESC"
  );
  console.log(`\n=== Registrations in last 24 hours: ${todayRes.rows.length} ===`);
  for (const row of todayRes.rows) {
    console.log(JSON.stringify(row, null, 2));
  }
  
  await pool.end();
}

main().catch(console.error);
