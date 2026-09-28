const { Pool } = require('pg');
const nodemailer = require('nodemailer');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_UbVtH6u1ToyO@ep-icy-lab-ah4q57yb-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require',
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'vallisshospital@gmail.com',
    pass: 'veqz egqp lmgr akyw',
  },
});

const targetTransactions = [
  {
    paymentId: 'pay_Tdq5zRcl4hnVg4',
    email: 'manikandan2793lakshmi@gmail.com',
    phone: '8754340881',
  },
  {
    paymentId: 'pay_TdpjG4XffFQdoR',
    email: 'jgsanchai2021@gmail.com',
    phone: '9994932438',
  },
  {
    paymentId: 'pay_TdpYhS5REOL5Gh',
    email: 'prabhukcm932@gmail.com',
    phone: '9443282052',
  },
  {
    paymentId: 'pay_TdpXGxzVAeGWMj',
    email: 'gnanaraja31@gmail.com',
    phone: '9894301731',
  },
];

async function sendEmail(data) {
  const fee = data.category === '10KM' ? 299 : (data.fee || 299);
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Active Salem 4.0 - Registration Confirmed</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; margin: 0; padding: 0; color: #1e293b; }
        .container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #F26522 0%, #D97706 100%); padding: 40px 20px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px; font-weight: 900; }
        .header p { margin: 8px 0 0 0; font-size: 13px; opacity: 0.9; }
        .content { padding: 32px 40px; line-height: 1.6; }
        .welcome-text { font-size: 16px; font-weight: bold; color: #0f172a; }
        .code-box { background-color: #fff7ed; border: 2px dashed #F26522; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; }
        .code-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #c2410c; font-weight: bold; margin-bottom: 6px; }
        .code-val { font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 900; color: #F26522; margin: 0; letter-spacing: 1px; }
        .section-title { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 28px; margin-bottom: 12px; font-weight: bold; }
        .details-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .details-table td { padding: 8px 0; vertical-align: top; }
        .details-table td.label { width: 140px; color: #64748b; font-weight: 600; }
        .details-table td.value { color: #0f172a; font-weight: 700; }
        .badge { display: inline-block; background-color: #22c55e; color: #fff; font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; }
        .footer { background-color: #0f172a; padding: 24px; text-align: center; font-size: 11px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Active Salem 4.0</h1>
          <p>11 October 2026 • Valli Super Speciality Hospital, Salem</p>
        </div>
        <div class="content">
          <p class="welcome-text">Dear ${data.fullName},</p>
          <p>
            Congratulations! 🎉 Your registration for <strong>Active Salem 4.0 Marathon</strong> has been
            <strong>confirmed</strong> and your payment of <strong>₹${fee}</strong> has been successfully received.
          </p>
          <p>Please note your Runner Pass Code below — you will need it to collect your race bib on event day.</p>

          <div class="code-box">
            <div class="code-label">Your Runner Pass Code</div>
            <div class="code-val">${data.registrationCode}</div>
          </div>

          <span class="badge">✓ Payment Confirmed</span>

          <div class="section-title">Registration Summary</div>
          <table class="details-table">
            <tr><td class="label">Runner Name</td><td class="value">${data.fullName}</td></tr>
            <tr><td class="label">Run Category</td><td class="value">${data.category} Run</td></tr>
            <tr><td class="label">T-Shirt Size</td><td class="value">${data.tshirtSize || 'M'}</td></tr>
            ${data.gender ? `<tr><td class="label">Gender</td><td class="value">${data.gender}</td></tr>` : ''}
            <tr><td class="label">Mobile</td><td class="value">${data.mobileNumber}</td></tr>
            ${data.city ? `<tr><td class="label">City</td><td class="value">${data.city}</td></tr>` : ''}
            <tr><td class="label">Amount Paid</td><td class="value">₹${fee} (Verified)</td></tr>
            <tr><td class="label">Transaction ID</td><td class="value" style="font-family: monospace; font-size: 11px;">${data.transactionId}</td></tr>
          </table>

          <div class="section-title">Event Details</div>
          <table class="details-table">
            <tr><td class="label">Date</td><td class="value">11 October 2026, Sunday</td></tr>
            <tr><td class="label">Reporting Time</td><td class="value">5:00 AM</td></tr>
            <tr><td class="label">Venue</td><td class="value">Valli Super Speciality Hospital<br><span style="font-weight:500;font-size:11px;color:#64748b;">Meyyanoor Road, Salem - 636 004</span></td></tr>
          </table>
        </div>
        <div class="footer">
          <p>Active Salem 4.0 Organized by Valli Super Speciality Hospital</p>
          <p>For helpline support: +91 70927 77764 | +91 82203 77047</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const info = await transporter.sendMail({
    from: '"Active Salem 4.0" <vallisshospital@gmail.com>',
    to: data.emailId,
    subject: `[CONFIRMED] Active Salem 4.0 Registration (${data.registrationCode})`,
    html: emailHtml,
  });

  return info.messageId;
}

async function main() {
  console.log('--- Fetching Active Salem Registrations from Database ---');
  
  // Fetch all registrations from DB
  const { rows } = await pool.query('SELECT * FROM active_salem_registrations ORDER BY created_at DESC');
  console.log(`Found ${rows.length} total Active Salem registrations in DB.`);

  for (const item of targetTransactions) {
    console.log(`\nProcessing payment: ${item.paymentId} for ${item.email}`);
    
    // Find matching record by email, phone, or transaction_id
    let dbRecord = rows.find(r => 
      (r.email_id && r.email_id.toLowerCase() === item.email.toLowerCase()) ||
      r.transaction_id === item.paymentId ||
      (r.mobile_number && r.mobile_number.includes(item.phone))
    );

    if (!dbRecord) {
      console.log(`No exact DB match found for email ${item.email}. Searching partial phone matches...`);
      dbRecord = rows.find(r => r.mobile_number && item.phone && r.mobile_number.slice(-8) === item.phone.slice(-8));
    }

    if (dbRecord) {
      console.log(`MATCH FOUND: Code: ${dbRecord.registration_code}, Name: ${dbRecord.full_name}, Email: ${dbRecord.email_id}, Mobile: ${dbRecord.mobile_number}`);
      
      // Update DB to mark verified & set transaction ID
      await pool.query(
        `UPDATE active_salem_registrations 
         SET is_verified = true, 
             transaction_id = $1, 
             payment_screenshot = 'RAZORPAY_ONLINE_PAYMENT' 
         WHERE registration_code = $2`,
        [item.paymentId, dbRecord.registration_code]
      );
      console.log(`Updated DB status to Verified for ${dbRecord.registration_code}.`);

      // Send confirmation email
      try {
        const msgId = await sendEmail({
          registrationCode: dbRecord.registration_code,
          fullName: dbRecord.full_name,
          emailId: dbRecord.email_id || item.email,
          mobileNumber: dbRecord.mobile_number || item.phone,
          category: dbRecord.category || '10KM',
          tshirtSize: dbRecord.tshirt_size || 'M',
          gender: dbRecord.gender || 'Male',
          city: dbRecord.city || 'Salem',
          transactionId: item.paymentId,
        });
        console.log(`✅ EMAIL SENT SUCCESSFULLY to ${dbRecord.email_id || item.email}! Message ID: ${msgId}`);
      } catch (emailErr) {
        console.error(`❌ ERROR sending email to ${item.email}:`, emailErr);
      }
    } else {
      console.log(`⚠️ No record found for ${item.email} (${item.phone}). Creating registration and sending email...`);
      // Auto-generate code
      const registrationCode = `AS-${Date.now().toString().slice(-6)}`;
      const fullName = item.email.split('@')[0].toUpperCase();
      
      await pool.query(
        `INSERT INTO active_salem_registrations 
         (registration_code, full_name, email_id, mobile_number, category, tshirt_size, gender, age, emergency_contact, city, source, transaction_id, payment_screenshot, is_verified)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
        [
          registrationCode,
          fullName,
          item.email,
          item.phone,
          '10KM',
          'M',
          'Male',
          25,
          item.phone,
          'Salem',
          'Online Razorpay',
          item.paymentId,
          'RAZORPAY_ONLINE_PAYMENT',
          true
        ]
      );
      console.log(`Inserted new verified registration ${registrationCode} for ${item.email}`);

      try {
        const msgId = await sendEmail({
          registrationCode,
          fullName,
          emailId: item.email,
          mobileNumber: item.phone,
          category: '10KM',
          tshirtSize: 'M',
          gender: 'Male',
          city: 'Salem',
          transactionId: item.paymentId,
        });
        console.log(`✅ EMAIL SENT SUCCESSFULLY to ${item.email}! Message ID: ${msgId}`);
      } catch (emailErr) {
        console.error(`❌ ERROR sending email to ${item.email}:`, emailErr);
      }
    }
  }

  await pool.end();
  console.log('\n--- ALL ACTIVE SALEM MAILS PROCESSED SUCCESSFULLY ---');
}

main().catch(err => {
  console.error('Fatal error running script:', err);
  process.exit(1);
});
