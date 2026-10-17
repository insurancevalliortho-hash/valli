const dns = require('dns');
const fs = require('fs');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
const Razorpay = require('razorpay');

const env = fs.readFileSync('.env.local', 'utf8');
const match = env.match(/DATABASE_URL=(.+)/);
const dbUrl = match[1].trim();

const smtpUser = env.match(/SMTP_USER=(.+)/)?.[1]?.trim() || 'vallisshospital@gmail.com';
const smtpPass = env.match(/SMTP_PASS=(.+)/)?.[1]?.trim() || 'uvohfmuoaycszims';

const key_id = env.match(/RAZORPAY_KEY_ID=(.+)/)?.[1]?.trim();
const key_secret = env.match(/RAZORPAY_KEY_SECRET=(.+)/)?.[1]?.trim();

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

const pool = new Pool({ connectionString: dbUrl });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function buildActiveSalemEmailHtml(data) {
  const is10KM = data.category.toLowerCase().includes('10');
  const amountPaid = is10KM ? 299 : 249;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Active Salem Marathon 4.0 Registration Confirmed</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f8fafc;
          margin: 0;
          padding: 0;
          color: #0f172a;
          -webkit-font-smoothing: antialiased;
        }
        .wrapper {
          width: 100%;
          background-color: #f8fafc;
          padding: 30px 12px;
          box-sizing: border-box;
        }
        .card {
          max-width: 620px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(242, 101, 34, 0.08);
          border: 1px solid #fed7aa;
        }
        .header {
          background: linear-gradient(135deg, #ea580c 0%, #f26522 50%, #fb923c 100%);
          padding: 36px 28px;
          text-align: center;
          color: #ffffff;
        }
        .badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.22);
          border: 1px solid rgba(255, 255, 255, 0.35);
          border-radius: 9999px;
          padding: 4px 14px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .header h1 {
          margin: 0;
          font-size: 26px;
          font-weight: 800;
          letter-spacing: 0.5px;
        }
        .header p {
          margin: 8px 0 0 0;
          font-size: 13px;
          color: #ffedd5;
          font-weight: 500;
        }
        .content {
          padding: 32px 28px;
        }
        .greeting {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .lead-text {
          font-size: 14px;
          line-height: 1.6;
          color: #475569;
          margin-bottom: 24px;
        }
        .bib-box {
          background: linear-gradient(180deg, #fff7ed 0%, #ffedd5 100%);
          border: 2px dashed #f26522;
          border-radius: 16px;
          padding: 24px 20px;
          text-align: center;
          margin: 20px 0 28px 0;
        }
        .bib-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #c2410c;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .bib-code {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
          font-size: 32px;
          font-weight: 900;
          color: #ea580c;
          letter-spacing: 2px;
          margin: 0;
        }
        .bib-status {
          display: inline-block;
          background: #10b981;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 12px;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 10px;
        }
        .section-heading {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #64748b;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 8px;
          margin: 28px 0 14px 0;
        }
        .table-grid {
          width: 100%;
          border-collapse: collapse;
        }
        .table-grid td {
          padding: 8px 0;
          vertical-align: top;
          font-size: 13px;
        }
        .table-grid td.k {
          width: 38%;
          color: #64748b;
          font-weight: 600;
        }
        .table-grid td.v {
          width: 62%;
          color: #0f172a;
          font-weight: 700;
        }
        .perks-card {
          background-color: #fff7ed;
          border: 1px solid #ffedd5;
          border-radius: 14px;
          padding: 18px 20px;
          margin-top: 24px;
        }
        .perks-card h4 {
          margin: 0 0 10px 0;
          font-size: 13px;
          font-weight: 700;
          color: #c2410c;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .perks-card ul {
          margin: 0;
          padding-left: 18px;
          font-size: 12.5px;
          color: #7c2d12;
          line-height: 1.6;
        }
        .perks-card li {
          margin-bottom: 6px;
        }
        .guidelines-card {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 18px 20px;
          margin-top: 18px;
        }
        .guidelines-card h4 {
          margin: 0 0 8px 0;
          font-size: 13px;
          font-weight: 700;
          color: #334155;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .guidelines-card ul {
          margin: 0;
          padding-left: 18px;
          font-size: 12px;
          color: #475569;
          line-height: 1.6;
        }
        .footer {
          background-color: #0f172a;
          padding: 24px;
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
        }
        .footer p {
          margin: 0 0 4px 0;
        }
        .footer strong {
          color: #f8fafc;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <div class="header">
            <div class="badge">Official Runner Pass & Confirmation</div>
            <h1>Active Salem Marathon 4.0</h1>
            <p>Run for Fitness • Run for Health</p>
          </div>

          <div class="content">
            <div class="greeting">Dear ${data.fullName},</div>
            <p class="lead-text">
              Congratulations! You are officially registered for <strong>Active Salem Marathon 4.0</strong>. Your payment of <strong>₹${amountPaid}</strong> has been received and verified.
            </p>

            <div class="bib-box">
              <div class="bib-label">Your Registration & Bib Code</div>
              <div class="bib-code">${data.registrationCode}</div>
              <div class="bib-status">Entry Confirmed ✓</div>
            </div>

            <div class="section-heading">Runner Profile & Event Category</div>
            <table class="table-grid">
              <tr>
                <td class="k">Runner Name</td>
                <td class="v">${data.fullName}</td>
              </tr>
              <tr>
                <td class="k">Run Category</td>
                <td class="v">${data.category} Marathon Run</td>
              </tr>
              <tr>
                <td class="k">Official T-Shirt Size</td>
                <td class="v">${data.tshirtSize} (Unisex Sports Fit)</td>
              </tr>
              ${data.gender ? `<tr><td class="k">Gender</td><td class="v">${data.gender}</td></tr>` : ''}
              ${data.age ? `<tr><td class="k">Age</td><td class="v">${data.age} Years</td></tr>` : ''}
              <tr>
                <td class="k">Mobile Number</td>
                <td class="v">${data.mobileNumber}</td>
              </tr>
              <tr>
                <td class="k">City / Location</td>
                <td class="v">${data.city || 'Salem'}</td>
              </tr>
              ${data.emergencyContact ? `<tr><td class="k">Emergency Contact</td><td class="v">${data.emergencyContact}</td></tr>` : ''}
              <tr>
                <td class="k">Registration Fee</td>
                <td class="v">₹${amountPaid} (Verified)</td>
              </tr>
              <tr>
                <td class="k">Payment Reference</td>
                <td class="v" style="font-family: monospace;">${data.transactionId}</td>
              </tr>
            </table>

            <div class="perks-card">
              <h4>What's Included in Your Runner Kit</h4>
              <ul>
                <li><strong>Official Running T-Shirt:</strong> Size ${data.tshirtSize} high-performance moisture-wicking jersey.</li>
                <li><strong>Hydration:</strong> Refreshments, energy drinks.</li>
                <li><strong>Digital Timing Certificate:</strong> Available for download post-event.</li>
              </ul>
            </div>

            <div class="guidelines-card">
              <h4>Race Day Reporting & Collection</h4>
              <ul>
                <li><strong>Date:</strong> Sunday, 11 October 2026</li>
                <li><strong>Reporting Time:</strong> 5:00 AM on Race Day</li>
                <li><strong>Venue:</strong> Valli Super Speciality Hospital, Meyyanoor Road, Salem - 636 004</li>
                <li><strong>Kit Collection:</strong> Present this email and your Registration Code (${data.registrationCode}) at the kit distribution counter.</li>
              </ul>
            </div>
          </div>

          <div class="footer">
            <p><strong>Active Salem • Valli Super Speciality Hospital</strong></p>
            <p>Meyyanoor Road, Salem, Tamil Nadu, 636004</p>
            <p style="margin-top: 8px; font-size: 11px; opacity: 0.8;">For queries or support, reach out to info@vallihospital.in or call our helpline.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

const reg = {
  transactionId: 'pay_TgyfXRWLNZypYx',
  registrationCode: 'SALEM26-0149',
  fullName: 'Prakash Vairavel',
  emailId: 'prakashpep@gmail.com',
  mobileNumber: '9742575796',
  category: '10KM',
  tshirtSize: 'L',
  gender: 'Male',
  age: 43,
  emergencyContact: '8946063460',
  city: 'Salem',
  source: 'Google'
};

async function main() {
  console.log('=== Processing Registration for Prakash Vairavel ===');

  const rzp = (key_id && key_secret) ? new Razorpay({ key_id, key_secret }) : null;
  if (rzp) {
    try {
      const payment = await rzp.payments.fetch(reg.transactionId);
      console.log(`Razorpay status for ${reg.transactionId}: ${payment.status}, amount: ₹${payment.amount / 100}`);
    } catch (err) {
      console.warn(`Razorpay fetch notice:`, err.message);
    }
  }

  // Check DB for transaction_id
  const existingTx = await pool.query(
    'SELECT * FROM active_salem_registrations WHERE transaction_id = $1',
    [reg.transactionId]
  );

  let regRecord;
  if (existingTx.rows.length > 0) {
    console.log(`Record with transaction_id ${reg.transactionId} already exists:`, existingTx.rows[0].registration_code);
    regRecord = existingTx.rows[0];
    // If registration_code differs or is not verified, update
    if (regRecord.registration_code !== reg.registrationCode || !regRecord.is_verified) {
      const updateRes = await pool.query(
        `UPDATE active_salem_registrations SET
          registration_code = $1,
          full_name = $2,
          email_id = $3,
          mobile_number = $4,
          category = $5,
          tshirt_size = $6,
          gender = $7,
          age = $8,
          emergency_contact = $9,
          city = $10,
          source = $11,
          is_verified = TRUE
        WHERE transaction_id = $12
        RETURNING *;`,
        [
          reg.registrationCode,
          reg.fullName,
          reg.emailId,
          reg.mobileNumber,
          reg.category,
          reg.tshirtSize,
          reg.gender,
          reg.age,
          reg.emergencyContact,
          reg.city,
          reg.source,
          reg.transactionId
        ]
      );
      regRecord = updateRes.rows[0];
      console.log('Updated existing record to match requested details.');
    }
  } else {
    // Check if registrationCode already exists for someone else
    const existingCode = await pool.query(
      'SELECT * FROM active_salem_registrations WHERE registration_code = $1',
      [reg.registrationCode]
    );

    let targetCode = reg.registrationCode;
    if (existingCode.rows.length > 0) {
      console.warn(`Registration code ${reg.registrationCode} already taken by:`, existingCode.rows[0].full_name);
      // If taken by someone else, check if we need to assign next or if it's the same person
      if (existingCode.rows[0].mobile_number === reg.mobileNumber || existingCode.rows[0].email_id === reg.emailId) {
        console.log('Same runner, updating transaction_id...');
        const updateRes = await pool.query(
          'UPDATE active_salem_registrations SET transaction_id = $1, is_verified = TRUE WHERE id = $2 RETURNING *',
          [reg.transactionId, existingCode.rows[0].id]
        );
        regRecord = updateRes.rows[0];
      } else {
        const seqRes = await pool.query('SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM active_salem_registrations');
        const nextId = seqRes.rows[0]?.next_id || 1;
        targetCode = `SALEM26-${String(nextId).padStart(4, '0')}`;
        console.log(`Assigned new code: ${targetCode}`);
      }
    }

    if (!regRecord) {
      const insertRes = await pool.query(
        `INSERT INTO active_salem_registrations (
          registration_code,
          full_name,
          email_id,
          mobile_number,
          category,
          tshirt_size,
          gender,
          age,
          emergency_contact,
          city,
          source,
          transaction_id,
          payment_screenshot,
          is_verified
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING *;`,
        [
          targetCode,
          reg.fullName,
          reg.emailId,
          reg.mobileNumber,
          reg.category,
          reg.tshirtSize,
          reg.gender,
          reg.age,
          reg.emergencyContact,
          reg.city,
          reg.source,
          reg.transactionId,
          'RAZORPAY_ONLINE_PAYMENT',
          true
        ]
      );
      regRecord = insertRes.rows[0];
      console.log(`Successfully created registration ID ${regRecord.id} with Code: ${regRecord.registration_code}`);
    }
  }

  // Send confirmation email
  const emailHtml = buildActiveSalemEmailHtml({
    registrationCode: regRecord.registration_code,
    fullName: regRecord.full_name,
    category: regRecord.category,
    tshirtSize: regRecord.tshirt_size,
    gender: regRecord.gender,
    age: regRecord.age,
    mobileNumber: regRecord.mobile_number,
    city: regRecord.city,
    emergencyContact: regRecord.emergency_contact,
    transactionId: regRecord.transaction_id,
  });

  try {
    console.log(`Sending confirmation email to ${regRecord.email_id}...`);
    const info = await transporter.sendMail({
      from: '"Active Salem Marathon 4.0" <vallisshospital@gmail.com>',
      to: regRecord.email_id,
      subject: `Active Salem Marathon 4.0 - Registration Confirmed [${regRecord.registration_code}]`,
      html: emailHtml,
    });
    console.log(`✓ Email sent to ${regRecord.email_id}: ${info.messageId}`);
  } catch (mailErr) {
    console.error(`✗ Email failed for ${regRecord.email_id}:`, mailErr.message);
  }

  console.log('Final Record:', JSON.stringify(regRecord, null, 2));
  await pool.end();
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
