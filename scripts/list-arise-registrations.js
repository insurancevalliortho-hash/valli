const dns = require('dns');
const fs = require('fs');
const { Pool } = require('pg');

const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim().replace(/^['"](.*)['"]$/, '$1');
});

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

const pool = new Pool({ connectionString: env.DATABASE_URL });

async function main() {
  const res = await pool.query(`
    SELECT id, registration_code, full_name, email_id, mobile_number, category, transaction_id
    FROM arise_registrations
    ORDER BY id ASC;
  `);

  console.log(`Total ARISE Registrations: ${res.rows.length}\n`);
  for (const r of res.rows) {
    console.log(`[#${r.id}] ${r.registration_code} | ${r.full_name} | ${r.email_id} | ${r.mobile_number} | ${r.category}`);
  }

  await pool.end();
}
main().catch(err => { console.error(err.message); pool.end(); });
