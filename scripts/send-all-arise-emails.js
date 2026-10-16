const dns = require('dns');
const fs = require('fs');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');

// 1. Read environment variables from .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim().replace(/^['"](.*)['"]$/, '$1');
});

const dbUrl = env.DATABASE_URL;
const smtpUser = env.SMTP_USER?.trim() || 'vallisshospital@gmail.com';
const smtpPass = (env.SMTP_PASS || '').replace(/\s+/g, '').trim();

if (!smtpUser || !smtpPass) {
  console.error('Missing SMTP_USER or SMTP_PASS in .env.local');
  process.exit(1);
}

// 2. DNS resolver fallback for Neon PostgreSQL
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
  auth: { user: smtpUser, pass: smtpPass },
  tls: { rejectUnauthorized: false }
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function getAriseHtml(data) {
  let amountPaid = 2000;
  const catLower = (data.category || '').toLowerCase();
  const desigLower = (data.designation || '').toLowerCase();
  const qualLower = (data.qualification || '').toLowerCase();
  const isStudent =
    desigLower.includes('student') ||
    desigLower.includes('intern') ||
    catLower.includes('student') ||
    qualLower.includes('student');

  if (
    catLower.includes('special concession') ||
    catLower.includes('concession') ||
    (catLower.includes('special') && catLower.includes('300')) ||
    catLower.includes('300')
  ) {
    amountPaid = 300;
  } else if (catLower.includes('bulk') || catLower.includes('5 persons')) {
    amountPaid = 500;
  } else if (
    catLower.includes('special category 1') ||
    catLower.includes('special catagory 1') ||
    (catLower.includes('special') && catLower.includes('500'))
  ) {
    amountPaid = 500;
  } else if (
    catLower.includes('special category 2') ||
    catLower.includes('special catagory 2') ||
    (catLower.includes('special') && catLower.includes('1000'))
  ) {
    amountPaid = 1000;
  } else if (catLower.includes('online')) {
    amountPaid = isStudent ? 500 : 1000;
  } else if (catLower.includes('1000')) {
    amountPaid = 1000;
  } else if (
    catLower === 'workshop' ||
    (catLower.includes('workshop') && !catLower.includes('conference') && !data.includeWorkshop)
  ) {
    amountPaid = 500;
  } else if (data.includeWorkshop || catLower.includes('workshop')) {
    amountPaid = isStudent ? 1500 : 2500;
  } else {
    amountPaid = isStudent ? 1000 : 2000;
  }

  const workshopStatus = data.includeWorkshop ? 'Yes (Includes Hands-on Workshop)' : 'Conference Only';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ARISE 2026 Registration Confirmation</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; color: #0f172a; -webkit-font-smoothing: antialiased; }
        .wrapper { width: 100%; background-color: #f8fafc; padding: 30px 12px; box-sizing: border-box; }
        .card { max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 75, 87, 0.08); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #004B57 0%, #007A6E 50%, #00A896 100%); padding: 36px 28px; text-align: center; color: #ffffff; }
        .badge { display: inline-block; background: rgba(255, 255, 255, 0.18); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 9999px; padding: 4px 14px; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px; }
        .header h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 0.5px; }
        .header p { margin: 8px 0 0 0; font-size: 13px; color: #d1fae5; font-weight: 500; }
        .content { padding: 32px 28px; }
        .greeting { font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
        .lead-text { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px; }
        .pass-box { background: linear-gradient(180deg, #f0fdfa 0%, #e6fffa 100%); border: 2px dashed #00a896; border-radius: 16px; padding: 24px 20px; text-align: center; margin: 20px 0 28px 0; }
        .pass-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #007a6e; font-weight: 700; margin-bottom: 6px; }
        .pass-code { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-size: 32px; font-weight: 900; color: #004B57; letter-spacing: 2px; margin: 0; }
        .pass-status { display: inline-block; background: #10b981; color: #ffffff; font-size: 11px; font-weight: 700; padding: 3px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px; margin-top: 10px; }
        .section-heading { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin: 28px 0 14px 0; }
        .table-grid { width: 100%; border-collapse: collapse; }
        .table-grid td { padding: 8px 0; vertical-align: top; font-size: 13px; }
        .table-grid td.k { width: 38%; color: #64748b; font-weight: 600; }
        .table-grid td.v { width: 62%; color: #0f172a; font-weight: 700; }
        .feedback-cta { background: linear-gradient(135deg, #003d47 0%, #007a6e 100%); color: #ffffff; padding: 20px 24px; border-radius: 14px; margin-top: 24px; text-align: center; }
        .feedback-cta h4 { margin: 0 0 6px 0; font-size: 15px; font-weight: 700; }
        .feedback-cta p { margin: 0 0 14px 0; font-size: 12.5px; color: #d1fae5; line-height: 1.5; }
        .feedback-btn { display: inline-block; background-color: #00A896; color: #ffffff; font-weight: 700; font-size: 13px; text-decoration: none; padding: 10px 22px; border-radius: 8px; letter-spacing: 0.5px; }
        .highlight-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px 20px; margin-top: 24px; }
        .highlight-card h4 { margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #004B57; text-transform: uppercase; letter-spacing: 0.5px; }
        .highlight-card ul { margin: 0; padding-left: 18px; font-size: 12.5px; color: #475569; line-height: 1.6; }
        .highlight-card li { margin-bottom: 6px; }
        .signatures { margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0; display: table; width: 100%; }
        .sig-cell { display: table-cell; width: 50%; vertical-align: top; }
        .sig-name { font-size: 13px; font-weight: 800; color: #0f172a; }
        .sig-title { font-size: 11px; color: #64748b; margin-top: 2px; }
        .footer { background-color: #002e35; padding: 24px; text-align: center; font-size: 12px; color: #94a3b8; }
        .footer p { margin: 0 0 4px 0; }
        .footer strong { color: #f8fafc; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <div class="header">
            <div class="badge">Official Delegate Confirmation</div>
            <h1>ARISE 2026</h1>
            <p>Advancements in Recovery, Intelligence &amp; Sports Engineering</p>
          </div>
          <div class="content">
            <div class="greeting">Dear ${data.fullName},</div>
            <p class="lead-text">
              Thank you for registering for <strong>ARISE 2026 National CME &amp; Hands-on Workshop</strong>. Your registration and delegate pass have been verified and confirmed.
            </p>
            <div class="pass-box">
              <div class="pass-label">Official Delegate Pass Code</div>
              <div class="pass-code">${data.registrationCode}</div>
              <div class="pass-status">Registration Confirmed ✓</div>
            </div>
            <div class="section-heading">Registration Summary</div>
            <table class="table-grid">
              <tr><td class="k">Delegate Name</td><td class="v">${data.fullName}</td></tr>
              <tr><td class="k">Pass Category</td><td class="v">${data.category}</td></tr>
              <tr><td class="k">Hands-on Workshop</td><td class="v">${workshopStatus}</td></tr>
              ${data.designation ? `<tr><td class="k">Designation</td><td class="v">${data.designation}</td></tr>` : ''}
              ${data.qualification ? `<tr><td class="k">Qualification</td><td class="v">${data.qualification}</td></tr>` : ''}
              <tr><td class="k">Institution / College</td><td class="v">${data.institution || 'Kavery College'}</td></tr>
              ${data.department ? `<tr><td class="k">Department</td><td class="v">${data.department}</td></tr>` : ''}
              ${data.city ? `<tr><td class="k">City / Location</td><td class="v">${data.city}</td></tr>` : ''}
              <tr><td class="k">Registered Mobile</td><td class="v">${data.mobileNumber}</td></tr>
              <tr><td class="k">Amount Paid</td><td class="v">₹${amountPaid.toLocaleString('en-IN')}</td></tr>
              <tr><td class="k">Transaction Ref</td><td class="v" style="font-family: monospace;">${data.transactionId}</td></tr>
            </table>

            <div class="feedback-cta">
              <h4>Delegate Feedback Form</h4>
              <p>Share your event feedback easily using your registered mobile number (<strong>${data.mobileNumber}</strong>).</p>
              <a href="https://www.vallihospital.in/iyakkam/arise/feedback" class="feedback-btn" target="_blank">Open Feedback Form</a>
            </div>

            <div class="section-heading">Event Date &amp; Venue Details</div>
            <table class="table-grid">
              <tr><td class="k">Date</td><td class="v">Saturday, 17 October 2026</td></tr>
              <tr><td class="k">Timing</td><td class="v">8:00 AM - 5:00 PM IST</td></tr>
              <tr><td class="k">Venue</td><td class="v">Knowledge Institute of Technology (KIOT), Salem, Tamil Nadu</td></tr>
            </table>

            <div class="highlight-card">
              <h4>Important Instructions for Delegates</h4>
              <ul>
                <li>Please present your <strong>Pass Code (${data.registrationCode})</strong> or registered mobile number at the reception desk on arrival to collect your delegate badge and conference kit.</li>
                <li>Scientific sessions commence sharply at 9:00 AM. Breakfast and registration counters open at 8:00 AM.</li>
                <li>Conference scientific souvenir, lunch, high tea, and participation certificate are provided.</li>
              </ul>
            </div>

            <div class="signatures">
              <div class="sig-cell">
                <div class="sig-name">DR. T. NATANASABAPATHY</div>
                <div class="sig-title">Organising Chairman<br>Valli Super Speciality Hospital</div>
              </div>
              <div class="sig-cell" style="text-align: right;">
                <div class="sig-name">DR. E. AAKASH</div>
                <div class="sig-title">Organising Secretary<br>ARISE 2026 Committee</div>
              </div>
            </div>
          </div>
          <div class="footer">
            <p><strong>Valli Super Speciality Hospital</strong></p>
            <p>Meyyanoor Road, Salem, Tamil Nadu - 636004</p>
            <p style="margin-top: 8px; font-size: 11px; opacity: 0.8;">Need help? Email info@vallihospital.in or call hospital reception.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

async function main() {
  console.log('=== VERIFYING SMTP CONNECTION ===');
  await transporter.verify();
  console.log('✓ SMTP Connected Successfully to Google Mail\n');

  console.log('=== FETCHING ALL ARISE REGISTRATIONS FROM ADMIN LIST ===');
  const res = await pool.query('SELECT * FROM arise_registrations ORDER BY id ASC;');
  const ariseList = res.rows;
  console.log(`Found ${ariseList.length} total registrations in ARISE admin list.\n`);

  let currentIdx = 0;
  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;
  const failures = [];

  for (const reg of ariseList) {
    currentIdx++;
    let email = (reg.email_id || '').replace(/^mailto:/i, '').trim();

    // Skip dummy test emails
    if (!email || email.includes('vallicountry.com') || email === 'test@test.com') {
      console.log(`[${currentIdx}/${ariseList.length}] ⏭ SKIPPED test/dummy email: ${reg.full_name} (${email}) [${reg.registration_code}]`);
      skippedCount++;
      continue;
    }

    process.stdout.write(`[${currentIdx}/${ariseList.length}] Sending ARISE pass to ${reg.full_name} (${email}) [${reg.registration_code}]... `);

    try {
      const emailHtml = getAriseHtml({
        registrationCode: reg.registration_code,
        fullName: reg.full_name,
        category: reg.category,
        includeWorkshop: reg.include_workshop,
        institution: reg.institution,
        department: reg.department,
        city: reg.city,
        transactionId: reg.transaction_id,
        designation: reg.designation,
        qualification: reg.qualification,
        foodPreference: reg.food_preference,
        iapCreditPoints: reg.iap_credit_points,
        mobileNumber: reg.mobile_number,
      });

      const info = await transporter.sendMail({
        from: `"ARISE 2026 | Valli Hospital" <${smtpUser}>`,
        to: email,
        subject: `ARISE 2026 Delegate Pass Confirmed [${reg.registration_code}]`,
        html: emailHtml,
      });

      successCount++;
      console.log(`✓ SENT (ID: ${info.messageId})`);
    } catch (err) {
      failCount++;
      console.log(`✗ FAILED: ${err.message}`);
      failures.push({ code: reg.registration_code, name: reg.full_name, email, error: err.message });
    }

    // Rate-limiting pause to respect Gmail quotas
    await sleep(700);
  }

  console.log('\n=======================================');
  console.log('       ARISE BATCH EMAIL SUMMARY       ');
  console.log('=======================================');
  console.log(`Total In Admin List : ${ariseList.length}`);
  console.log(`Successfully Sent   : ${successCount}`);
  console.log(`Skipped (Dummy/Test): ${skippedCount}`);
  console.log(`Failed              : ${failCount}`);

  if (failures.length > 0) {
    console.log('\nFailures breakdown:');
    console.table(failures);
  } else {
    console.log('\n✓ ALL ARISE EMAILS DISPATCHED SUCCESSFULLY TO ALL REGISTRANTS!');
  }

  await pool.end();
}

main().catch(err => {
  console.error('Fatal batch email script error:', err);
  process.exit(1);
});
