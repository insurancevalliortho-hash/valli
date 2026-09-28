const dns = require('dns');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
const match = env.match(/DATABASE_URL=(.+)/);
const dbUrl = match[1].trim();

const resolver = new dns.Resolver();
resolver.setServers(['8.8.8.8', '1.1.1.1']);
const origLookup = dns.lookup;
dns.lookup = (hostname, options, callback) => {
  let cb = callback;
  let opts = options;
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

async function check() {
  const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
  console.log('Tables:', res.rows.map(r => r.table_name));
  for (let row of res.rows) {
    const countRes = await pool.query(`SELECT count(*) FROM ${row.table_name}`);
    console.log(`Table ${row.table_name}: ${countRes.rows[0].count} rows`);
    if (parseInt(countRes.rows[0].count) > 0) {
      const dataRes = await pool.query(`SELECT * FROM ${row.table_name} ORDER BY id DESC LIMIT 5`);
      console.log(`Sample data for ${row.table_name}:`, JSON.stringify(dataRes.rows, null, 2));
    }
  }
  await pool.end();
}
check().catch(console.error);
