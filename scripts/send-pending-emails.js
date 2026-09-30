const dns = require('dns');
const fs = require('fs');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');

// 1. Read environment variables from .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) process.env[match[1].trim()] = match[2].trim().replace(/^['\"](.*)['\"]$/, '$1');
});

const dbUrl = process.env.DATABASE_URL;
const smtpUser = process.env.SMTP_USER?.trim() || 'vallisshospital@gmail.com';
const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '').trim();

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

// Helper: Active Salem HTML generator
function getActiveSalemHtml(data) {
  const is10KM = (data.category || '').toLowerCase().includes('10');
  const amountPaid = is10KM ? 299 : 249;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Active Salem Marathon 4.0 Registration Confirmed</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; color: #0f172a; -webkit-font-smoothing: antialiased; }
        .wrapper { width: 100%; background-color: #f8fafc; padding: 30px 12px; box-sizing: border-box; }
        .card { max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(242, 101, 34, 0.08); border: 1px solid #fed7aa; }
        .header { background: linear-gradient(135deg, #ea580c 0%, #f26522 50%, #fb923c 100%); padding: 36px 28px; text-align: center; color: #ffffff; }
        .badge { display: inline-block; background: rgba(255, 255, 255, 0.22); border: 1px solid rgba(255, 255, 255, 0.35); border-radius: 9999px; padding: 4px 14px; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px; }
        .header h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 0.5px; }
        .header p { margin: 8px 0 0 0; font-size: 13px; color: #ffedd5; font-weight: 500; }
        .content { padding: 32px 28px; }
        .greeting { font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
        .lead-text { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px; }
        .bib-box { background: linear-gradient(180deg, #fff7ed 0%, #ffedd5 100%); border: 2px dashed #f26522; border-radius: 16px; padding: 24px 20px; text-align: center; margin: 20px 0 28px 0; }
        .bib-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #c2410c; font-weight: 700; margin-bottom: 6px; }
        .bib-code { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-size: 32px; font-weight: 900; color: #ea580c; letter-spacing: 2px; margin: 0; }
        .bib-status { display: inline-block; background: #10b981; color: #ffffff; font-size: 11px; font-weight: 700; padding: 3px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px; margin-top: 10px; }
        .section-heading { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin: 28px 0 14px 0; }
        .table-grid { width: 100%; border-collapse: collapse; }
        .table-grid td { padding: 8px 0; vertical-align: top; font-size: 13px; }
        .table-grid td.k { width: 38%; color: #64748b; font-weight: 600; }
        .table-grid td.v { width: 62%; color: #0f172a; font-weight: 700; }
        .perks-card { background-color: #fff7ed; border: 1px solid #ffedd5; border-radius: 14px; padding: 18px 20px; margin-top: 24px; }
        .perks-card h4 { margin: 0 0 10px 0; font-size: 13px; font-weight: 700; color: #c2410c; text-transform: uppercase; letter-spacing: 0.5px; }
        .perks-card ul { margin: 0; padding-left: 18px; font-size: 12.5px; color: #7c2d12; line-height: 1.6; }
        .perks-card li { margin-bottom: 6px; }
        .guidelines-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px 20px; margin-top: 18px; }
        .guidelines-card h4 { margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.5px; }
        .guidelines-card ul { margin: 0; padding-left: 18px; font-size: 12px; color: #475569; line-height: 1.6; }
        .footer { background-color: #0f172a; padding: 24px; text-align: center; font-size: 12px; color: #94a3b8; }
        .footer p { margin: 0 0 4px 0; }
        .footer strong { color: #f8fafc; }
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
              <tr><td class="k">Runner Name</td><td class="v">${data.fullName}</td></tr>
              <tr><td class="k">Run Category</td><td class="v">${data.category} Marathon Run</td></tr>
              <tr><td class="k">Official T-Shirt Size</td><td class="v">${data.tshirtSize} (Unisex Sports Fit)</td></tr>
              ${data.gender ? `<tr><td class="k">Gender</td><td class="v">${data.gender}</td></tr>` : ''}
              ${data.age ? `<tr><td class="k">Age</td><td class="v">${data.age} Years</td></tr>` : ''}
              <tr><td class="k">Mobile Number</td><td class="v">${data.mobileNumber}</td></tr>
              <tr><td class="k">City / Location</td><td class="v">${data.city || 'Salem'}</td></tr>
              ${data.emergencyContact ? `<tr><td class="k">Emergency Contact</td><td class="v">${data.emergencyContact}</td></tr>` : ''}
              <tr><td class="k">Registration Fee</td><td class="v">₹${amountPaid} (Verified)</td></tr>
              <tr><td class="k">Payment Reference</td><td class="v" style="font-family: monospace;">${data.transactionId}</td></tr>
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

// Helper: ARISE HTML generator
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
  const isLead = Boolean(data.registrationCode?.includes('LEAD'));
  const isBulkStudent = catLower.includes('bulk') && !isLead;

  if (isLead) {
    amountPaid = 20000;
  } else if (isBulkStudent) {
    amountPaid = 0;
  } else if (
    catLower === 'workshop' ||
    (catLower.includes('workshop') && !catLower.includes('conference') && !data.includeWorkshop)
  ) {
    amountPaid = 500;
  } else if (data.includeWorkshop || catLower.includes('workshop')) {
    amountPaid = isStudent ? 2000 : 3000;
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
            <p>Advancements in Recovery, Intelligence & Sports Engineering</p>
          </div>
          <div class="content">
            <div class="greeting">Dear ${data.fullName},</div>
            <p class="lead-text">
              Thank you for registering for <strong>ARISE 2026 National CME & Hands-on Workshop</strong>. Your registration and delegate pass have been verified and confirmed.
            </p>
            <div class="pass-box">
              <div class="pass-label">Official Delegate Registration Code</div>
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
              <tr><td class="k">Institution / Hospital</td><td class="v">${data.institution}</td></tr>
              ${data.department ? `<tr><td class="k">Department</td><td class="v">${data.department}</td></tr>` : ''}
              ${data.city ? `<tr><td class="k">City / Location</td><td class="v">${data.city}</td></tr>` : ''}
              <tr><td class="k">Food Preference</td><td class="v">${data.foodPreference || 'Vegetarian'}</td></tr>
              ${data.iapCreditPoints ? `<tr><td class="k">IAP Credit Points</td><td class="v">Yes</td></tr>` : ''}
              <tr><td class="k">Amount Paid</td><td class="v">₹${amountPaid.toLocaleString('en-IN')}</td></tr>
              <tr><td class="k">Transaction Ref</td><td class="v" style="font-family: monospace;">${data.transactionId}</td></tr>
            </table>
            <div class="section-heading">Event Date & Venue Details</div>
            <table class="table-grid">
              <tr><td class="k">Date</td><td class="v">Saturday, 17 October 2026</td></tr>
              <tr><td class="k">Timing</td><td class="v">8:00 AM - 5:00 PM IST</td></tr>
              <tr><td class="k">Venue</td><td class="v">Knowledge Institute of Technology (KIOT), Salem, Tamil Nadu</td></tr>
            </table>
            <div class="highlight-card">
              <h4>Important Instructions for Delegates</h4>
              <ul>
                <li>Please present your <strong>Registration Code (${data.registrationCode})</strong> at the reception desk on arrival to collect your delegate badge and conference kit.</li>
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

  // 1. Fetch ARISE registrations
  console.log('=== FETCHING ARISE REGISTRATIONS ===');
  const ariseResult = await pool.query('SELECT * FROM arise_registrations ORDER BY id ASC;');
  const ariseList = ariseResult.rows;
  console.log(`Found ${ariseList.length} ARISE registrations to send.\n`);

  // 2. Fetch Active Salem registrations after 0126
  console.log('=== FETCHING ACTIVE SALEM REGISTRATIONS (AFTER 0126) ===');
  const salemResult = await pool.query(
    "SELECT * FROM active_salem_registrations WHERE id > 127 ORDER BY id ASC;"
  );
  const salemList = salemResult.rows;
  console.log(`Found ${salemList.length} Active Salem registrations to send (ID > 127, Code > SALEM26-0126).\n`);

  const totalToSend = ariseList.length + salemList.length;
  console.log(`>>> TOTAL EMAILS TO DISPATCH: ${totalToSend} <<<\n`);

  let currentIdx = 0;
  let successCount = 0;
  let failCount = 0;
  const failures = [];

  // SEND ARISE EMAILS
  for (const reg of ariseList) {
    currentIdx++;
    process.stdout.write(`[${currentIdx}/${totalToSend}] Sending ARISE to ${reg.full_name} (${reg.email_id}) [${reg.registration_code}]... `);
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
      });

      const info = await transporter.sendMail({
        from: `"ARISE 2026 | Valli Hospital" <${smtpUser}>`,
        to: reg.email_id,
        subject: `ARISE 2026 Delegate Pass Confirmed [${reg.registration_code}]`,
        html: emailHtml,
      });

      successCount++;
      console.log(`✓ SENT (ID: ${info.messageId})`);
    } catch (err) {
      failCount++;
      console.log(`✗ FAILED: ${err.message}`);
      failures.push({ type: 'ARISE', code: reg.registration_code, email: reg.email_id, error: err.message });
    }
    await sleep(650);
  }

  // SEND ACTIVE SALEM EMAILS
  for (const reg of salemList) {
    currentIdx++;
    process.stdout.write(`[${currentIdx}/${totalToSend}] Sending Active Salem to ${reg.full_name} (${reg.email_id}) [${reg.registration_code}]... `);
    try {
      const emailHtml = getActiveSalemHtml({
        registrationCode: reg.registration_code,
        fullName: reg.full_name,
        category: reg.category,
        tshirtSize: reg.tshirt_size,
        gender: reg.gender,
        age: reg.age,
        mobileNumber: reg.mobile_number,
        city: reg.city,
        emergencyContact: reg.emergency_contact,
        transactionId: reg.transaction_id,
      });

      const info = await transporter.sendMail({
        from: `"Active Salem Marathon 4.0" <${smtpUser}>`,
        to: reg.email_id,
        subject: `Active Salem Marathon 4.0 - Registration Confirmed [${reg.registration_code}]`,
        html: emailHtml,
      });

      successCount++;
      console.log(`✓ SENT (ID: ${info.messageId})`);
    } catch (err) {
      failCount++;
      console.log(`✗ FAILED: ${err.message}`);
      failures.push({ type: 'Active Salem', code: reg.registration_code, email: reg.email_id, error: err.message });
    }
    await sleep(650);
  }

  console.log('\n=======================================');
  console.log('           BATCH SUMMARY               ');
  console.log('=======================================');
  console.log(`Total Attempted : ${totalToSend}`);
  console.log(`Successfully Sent: ${successCount}`);
  console.log(`Failed          : ${failCount}`);

  if (failures.length > 0) {
    console.log('\nFailures breakdown:');
    console.table(failures);
  } else {
    console.log('\n✓ ALL EMAILS DISPATCHED SUCCESSFULLY WITHOUT ERRORS!');
  }

  await pool.end();
}

main().catch(err => {
  console.error('Fatal batch script error:', err);
  process.exit(1);
});
