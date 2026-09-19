/**
 * Active Salem Manual Registration & Email Sender
 * -----------------------------------------------
 * Use this when payment was received but the success page failed.
 * Edit the MEMBERS array below, then run: node send_active_salem_emails.js
 */

const dns = require('dns');
const fs = require('fs');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');

// ─────────────────────────────────────────────────────────────────
// 1. ADD THE 3 MEMBERS HERE
//    Fill in details from Razorpay dashboard + registration form
// ─────────────────────────────────────────────────────────────────
const MEMBERS = [
  {
    fullName: "Mani",
    emailId: "maniaug29@gmail.com",
    mobileNumber: "8884381854",
    category: "5KM",
    tshirtSize: "M",
    gender: "Male",
    age: 25,
    city: "Salem",
    emergencyContact: "N/A",
    transactionId: "pay_TdoQ62mAv6HRDW",
  },
  {
    fullName: "Sree Shankar",
    emailId: "rsreeshankar@gmail.com",
    mobileNumber: "8122266678",
    category: "5KM",
    tshirtSize: "M",
    gender: "Male",
    age: 25,
    city: "Salem",
    emergencyContact: "N/A",
    transactionId: "pay_TdoH9v2PlWRICX",
  },
  {
    fullName: "Gowthaman",
    emailId: "mgowthaman1993@gmail.com",
    mobileNumber: "9994015099",
    category: "10KM",
    tshirtSize: "M",
    gender: "Male",
    age: 33,
    city: "Salem",
    emergencyContact: "N/A",
    transactionId: "pay_Tdo64vcuLyO0lB",
  },
];

// ─────────────────────────────────────────────────────────────────
// Setup (reads from .env.local automatically)
// ─────────────────────────────────────────────────────────────────
const env = fs.readFileSync('.env.local', 'utf8');
const dbUrl = env.match(/DATABASE_URL=(.+)/)?.[1]?.trim() || '';
const smtpHost = env.match(/SMTP_HOST=(.+)/)?.[1]?.trim() || 'smtp.gmail.com';
const smtpPort = parseInt(env.match(/SMTP_PORT=(.+)/)?.[1]?.trim() || '587');
const smtpUser = env.match(/SMTP_USER=(.+)/)?.[1]?.trim() || '';
const smtpPass = env.match(/SMTP_PASS=(.+)/)?.[1]?.trim() || '';

// DNS patch for Neon DB (needed on local ISP)
const resolver = new dns.Resolver();
resolver.setServers(['8.8.8.8', '1.1.1.1']);
const origLookup = dns.lookup;
dns.lookup = (hostname, options, callback) => {
  let cb = callback, opts = options;
  if (typeof options === 'function') { cb = options; opts = {}; }
  if (typeof hostname === 'string' && hostname.includes('neon.tech')) {
    const returnIp = (ip) => opts && opts.all ? cb(null, [{ address: ip, family: 4 }]) : cb(null, ip, 4);
    resolver.resolve4(hostname, (err, addresses) => {
      if (!err && addresses?.length > 0) return returnIp(addresses[0]);
      return returnIp('23.21.74.185');
    });
    return;
  }
  return origLookup(hostname, opts, cb);
};

const pool = new Pool({ connectionString: dbUrl });

// ─────────────────────────────────────────────────────────────────
// Email HTML template for Active Salem confirmation
// ─────────────────────────────────────────────────────────────────
function buildEmailHtml(data) {
  const fee = data.category === '10KM' ? 299 : 249;
  return `<!DOCTYPE html>
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
    .info-card { background-color: #fff7ed; border: 1px solid #fed7aa; border-radius: 12px; padding: 20px; margin-top: 24px; }
    .info-title { font-size: 13px; font-weight: bold; color: #c2410c; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px; }
    .info-list { margin: 0; padding-left: 20px; font-size: 12px; color: #475569; }
    .info-list li { margin-bottom: 8px; }
    .badge { display: inline-block; background-color: #22c55e; color: #fff; font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; }
    .footer { background-color: #0f172a; padding: 24px; text-align: center; font-size: 11px; color: #64748b; }
    .footer a { color: #F26522; text-decoration: none; }
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
        <tr><td class="label">T-Shirt Size</td><td class="value">${data.tshirtSize}</td></tr>
        <tr><td class="label">Gender</td><td class="value">${data.gender}</td></tr>
        <tr><td class="label">Mobile</td><td class="value">${data.mobileNumber}</td></tr>
        <tr><td class="label">City</td><td class="value">${data.city}</td></tr>
        <tr><td class="label">Amount Paid</td><td class="value">₹${fee} (Verified)</td></tr>
        <tr><td class="label">Transaction ID</td><td class="value" style="font-family: monospace; font-size: 11px;">${data.transactionId}</td></tr>
      </table>

      <div class="section-title">Event Details</div>
      <table class="details-table">
        <tr><td class="label">Date</td><td class="value">11 October 2026, Sunday</td></tr>
        <tr><td class="label">Reporting Time</td><td class="value">5:00 AM</td></tr>
        <tr><td class="label">Venue</td><td class="value">Valli Super Speciality Hospital<br><span style="font-weight:500;font-size:11px;color:#64748b;">Meyyanoor Road, Salem - 636 004</span></td></tr>
      </table>

      <div class="info-card">
        <h4 class="info-title">🏁 What to Bring on Race Day</h4>
        <ul class="info-list">
          <li>Your <strong>Runner Pass Code: ${data.registrationCode}</strong> — screenshot or printout</li>
          <li>A valid government photo ID (Aadhaar / Voter ID / Passport)</li>
          <li>Comfortable running shoes and sportswear</li>
          <li>Your own water bottle (hydration stations available on track)</li>
          <li>Bib collection starts at the venue from <strong>4:30 AM</strong></li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <p>Active Salem 4.0 · Valli Super Speciality Hospital</p>
      <p>Meyyanoor Road, Salem, Tamil Nadu - 636 004</p>
      <p>For queries: <a href="mailto:vallisshospital@gmail.com">vallisshospital@gmail.com</a></p>
    </div>
  </div>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────
// Main: Save to DB + Send emails
// ─────────────────────────────────────────────────────────────────
async function main() {
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  console.log(`\n🔧 SMTP: ${smtpHost}:${smtpPort} (user: ${smtpUser})`);
  console.log(`🗄️  DB: Connected\n`);
  console.log(`Processing ${MEMBERS.length} members...\n`);

  for (const member of MEMBERS) {
    console.log(`─────────────────────────────────`);
    console.log(`👤 Processing: ${member.fullName} (${member.emailId})`);

    try {
      // 1. Generate sequential registration code
      const seqRes = await pool.query(
        "SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM active_salem_registrations"
      );
      const nextId = seqRes.rows[0]?.next_id || 1;
      const regCode = `SALEM26-${String(nextId).padStart(4, '0')}`;

      // 2. Check if already saved (by transaction ID)
      const existing = await pool.query(
        "SELECT id, registration_code FROM active_salem_registrations WHERE transaction_id = $1",
        [member.transactionId]
      );

      let finalRegCode = regCode;
      let wasAlreadySaved = false;

      if (existing.rows.length > 0) {
        wasAlreadySaved = true;
        finalRegCode = existing.rows[0].registration_code;
        console.log(`   ⚠️  Already in DB with code: ${finalRegCode} — skipping DB insert`);
      } else {
        // 3. Save to database
        await pool.query(
          `INSERT INTO active_salem_registrations (
            registration_code, full_name, email_id, mobile_number, category, tshirt_size,
            gender, age, emergency_contact, city, source, transaction_id, payment_screenshot, is_verified
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
          [
            finalRegCode,
            member.fullName,
            member.emailId,
            member.mobileNumber,
            member.category,
            member.tshirtSize,
            member.gender,
            member.age,
            member.emergencyContact || 'N/A',
            member.city || 'Salem',
            'Online Gateway',
            member.transactionId,
            'RAZORPAY_ONLINE_PAYMENT',
            true, // is_verified = true since payment was received
          ]
        );
        console.log(`   ✅ Saved to DB with code: ${finalRegCode}`);
      }

      // 4. Send confirmation email
      const emailHtml = buildEmailHtml({ ...member, registrationCode: finalRegCode });
      const currentTransporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      const mailResult = await currentTransporter.sendMail({
        from: `"Active Salem 4.0" <${smtpUser}>`,
        to: member.emailId,
        subject: `Active Salem 4.0 - Registration Confirmed [${finalRegCode}]`,
        html: emailHtml,
      });

      console.log(`   📧 Email sent to ${member.emailId} | Message ID: ${mailResult.messageId}`);

    } catch (err) {
      console.error(`   ❌ ERROR for ${member.fullName}:`, err.message);
    }
  }

  await pool.end();
  console.log(`\n─────────────────────────────────`);
  console.log(`✅ Done! All members processed.`);
  console.log(`📋 Check the admin panel at /active-salem/admin to verify entries.\n`);
}

main().catch(console.error);
