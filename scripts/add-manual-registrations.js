/**
 * Add 5 new ARISE registrations manually at ₹500 each
 * Run: node scripts/add-manual-registrations.js
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

// ─── The 5 new registrations ──────────────────────────────────────────────────
const NEW_MEMBERS = [
  {
    fullName: "Indhumathi E",
    emailId: "shivmathi0206@gmail.com",
    mobileNumber: "9585962941",
  },
  {
    fullName: "Jaisiva A S",
    emailId: "asjaisiva@gmail.com",
    mobileNumber: "9159798199",
  },
  {
    fullName: "Rinit Ranjan S",
    emailId: "jananishreeneha@gmail.com",
    mobileNumber: "9361772251",
  },
  {
    fullName: "S. Vishnuprakash",
    emailId: "vishnuprakashsalem.tn@gmail.com",
    mobileNumber: "8072530744",
  },
  {
    fullName: "B. Mahaveer Sai",
    emailId: "ammu.devmaha@gmail.com",
    mobileNumber: "9014558179",
  },
];

async function main() {
  // Get next available ID and latest MANUAL-CASH number
  const seqRes = await pool.query(
    "SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM arise_registrations"
  );
  let nextId = parseInt(seqRes.rows[0]?.next_id || '1', 10);

  // Get next manual cash number
  const cashRes = await pool.query(
    `SELECT transaction_id FROM arise_registrations
     WHERE transaction_id ILIKE 'MANUAL-CASH-VMCP-%'
     ORDER BY transaction_id DESC LIMIT 1;`
  );
  let nextCashNum = 1;
  if (cashRes.rows.length > 0) {
    const lastTxId = cashRes.rows[0].transaction_id;
    const lastNum = parseInt(lastTxId.split('-').pop(), 10);
    nextCashNum = lastNum + 1;
  }

  console.log(`\n📋 Adding ${NEW_MEMBERS.length} registrations starting from ID #${nextId}\n`);

  for (let i = 0; i < NEW_MEMBERS.length; i++) {
    const m = NEW_MEMBERS[i];
    const regCode = `ARISE26-${String(nextId + i).padStart(4, '0')}`;
    const txId = `MANUAL-CASH-VMCP-${String(nextCashNum + i).padStart(3, '0')}`;

    await pool.query(
      `INSERT INTO arise_registrations (
        registration_code, full_name, email_id, mobile_number,
        category, include_workshop, institution, department, city,
        source, transaction_id, payment_screenshot,
        designation, qualification, food_preference,
        iap_credit_points, is_verified
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
      [
        regCode,
        m.fullName,
        m.emailId,
        m.mobileNumber,
        'Special Category 1 (₹500)',       // → calculateFee returns 500
        false,                              // no workshop
        'Kavery College of Physiotherapy, Salem',
        'Physiotherapy',
        'Salem',
        'Direct',
        txId,
        'MANUAL-CASH-PAYMENT',
        'Student',
        'BPT',
        'Vegetarian',
        false,
        true,                              // is_verified = true (cash collected)
      ]
    );

    console.log(`✅ [${regCode}] ${m.fullName}`);
    console.log(`   Email: ${m.emailId}  |  Mobile: ${m.mobileNumber}`);
    console.log(`   Transaction ID: ${txId}  |  Amount: ₹500\n`);
  }

  console.log('─────────────────────────────────────────');
  console.log(`✅ All ${NEW_MEMBERS.length} registrations added successfully!`);
  console.log('   Refresh the admin panel to see them.\n');

  await pool.end();
}

main().catch(err => {
  console.error('Error:', err.message);
  pool.end();
  process.exit(1);
});
