/**
 * Create arise_feedback table in Neon database
 * Run: node scripts/create-arise-feedback-table.js
 */

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
  await pool.query(`
    CREATE TABLE IF NOT EXISTS arise_feedback (
      id                       SERIAL PRIMARY KEY,
      registration_id          INTEGER NOT NULL,
      registration_code        TEXT NOT NULL,
      email                    TEXT NOT NULL,
      full_name                TEXT,
      q1_event_quality         INTEGER CHECK (q1_event_quality BETWEEN 1 AND 5),
      q2_session_relevance     INTEGER CHECK (q2_session_relevance BETWEEN 1 AND 5),
      q3_speaker_effectiveness INTEGER CHECK (q3_speaker_effectiveness BETWEEN 1 AND 5),
      q4_hands_on_workshop     INTEGER CHECK (q4_hands_on_workshop BETWEEN 1 AND 5),
      q5_organization_venue    INTEGER CHECK (q5_organization_venue BETWEEN 1 AND 5),
      comments                 TEXT DEFAULT '',
      submitted_at             TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(registration_id)
    );
  `);
  console.log('✅ arise_feedback table created (or already exists).');
  await pool.end();
}

main().catch(err => { console.error(err.message); pool.end(); process.exit(1); });
