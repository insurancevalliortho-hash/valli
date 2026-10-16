/**
 * Update institution name: Vinayaka Mission College of Physiotherapy → Kavery College of Physiotherapy, Salem
 * Run: node scripts/update-institution-name.js
 */

const dns = require('dns');
const fs = require('fs');
const { Pool } = require('pg');

// Load .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim().replace(/^['"](.*)['"]$/, '$1');
});

const dbUrl = env.DATABASE_URL;
if (!dbUrl) { console.error('❌ DATABASE_URL not found in .env.local'); process.exit(1); }

// DNS Patch for Neon PostgreSQL
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

const pool = new Pool({ connectionString: dbUrl });

const NEW_INSTITUTION = 'Kavery College of Physiotherapy, Salem';

async function main() {
  // Preview first
  const preview = await pool.query(`
    SELECT id, registration_code, full_name, institution
    FROM arise_registrations
    WHERE institution ILIKE '%vinay%' OR institution ILIKE '%vmrf%' OR institution ILIKE '%vmcp%'
    ORDER BY id ASC;
  `);

  if (preview.rows.length === 0) {
    console.log('⚠️  No Vinayaka Mission registrations found. Nothing to update.');
    await pool.end();
    return;
  }

  console.log(`\n📋 Found ${preview.rows.length} registrations to update:\n`);
  for (const r of preview.rows) {
    console.log(`  [#${r.id}] ${r.registration_code} - ${r.full_name}`);
    console.log(`         FROM: ${r.institution}`);
    console.log(`           TO: ${NEW_INSTITUTION}\n`);
  }

  // Perform the update
  const result = await pool.query(`
    UPDATE arise_registrations
    SET institution = $1
    WHERE institution ILIKE '%vinay%' OR institution ILIKE '%vmrf%' OR institution ILIKE '%vmcp%'
    RETURNING id, registration_code, full_name;
  `, [NEW_INSTITUTION]);

  console.log(`✅ Successfully updated ${result.rowCount} registrations to "${NEW_INSTITUTION}"`);
  await pool.end();
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  pool.end();
  process.exit(1);
});
