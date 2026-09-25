import nodemailer from "nodemailer";

interface EmailPayload {
  registrationCode: string;
  teamName: string;
  teamSize: number;
  teamLead: string;
  leadPhone: string;
  coMembers: Array<{ name: string; phone: string }>;
  emailId: string;
  collegeName: string;
  collegeLocation: string;
  department: string;
  yearOfStudy: string;
  transactionId: string;
}

/**
 * Helper function to configure nodemailer transport.
 * Reads environment variables if available; otherwise falls back to a dynamic test account.
 */
async function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER?.trim();
  const rawPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || "";
  const pass = rawPass.replace(/\s+/g, "").trim();
  const from = process.env.SMTP_FROM || `"Valli Super Speciality Hospital" <${user || "vallisshospital@gmail.com"}>`;

  if (user && pass) {
    const isGmail = host.toLowerCase().includes("gmail");
    return {
      transporter: nodemailer.createTransport({
        service: isGmail ? "gmail" : undefined,
        host: !isGmail ? host : undefined,
        port: port,
        secure: port === 465,
        auth: { user, pass },
        tls: {
          rejectUnauthorized: false,
        },
      }),
      from,
    };
  }

  // Fallback: Dynamic Ethereal Email test account for local testing/development
  console.log("SMTP environment variables not fully configured. Setting up Ethereal test SMTP...");
  const testAccount = await nodemailer.createTestAccount();
  return {
    transporter: nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    }),
    from: `"Technovations 2026 (Demo)" <${testAccount.user}>`,
  };
}

/**
 * Sends a registration confirmation email to the Team Leader.
 */
export async function sendRegistrationEmail(data: EmailPayload) {
  try {
    const { transporter, from } = await getTransporter();

    const coMembersHtml = data.coMembers && data.coMembers.length > 0
      ? data.coMembers.map(m => `<li>${m.name} (${m.phone})</li>`).join("")
      : "<li>No co-members registered</li>";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Technovations 2026 Registration Confirmed</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f1f5f9;
            margin: 0;
            padding: 0;
            color: #1e293b;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            border: 1px solid #e2e8f0;
          }
          .header {
            background: linear-gradient(135deg, #004B57 0%, #00A896 100%);
            padding: 40px 20px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 26px;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          .header p {
            margin: 10px 0 0 0;
            font-size: 14px;
            opacity: 0.9;
          }
          .content {
            padding: 30px 40px;
            line-height: 1.6;
          }
          .welcome-text {
            font-size: 16px;
            font-weight: bold;
            color: #0f172a;
          }
          .code-box {
            background-color: #f0faf9;
            border: 2px dashed #00a896;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            margin: 24px 0;
          }
          .code-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #007a6e;
            font-weight: bold;
            margin-bottom: 6px;
          }
          .code-val {
            font-family: 'Courier New', Courier, monospace;
            font-size: 32px;
            font-weight: 900;
            color: #ff8c00;
            margin: 0;
            letter-spacing: 1px;
          }
          .section-title {
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #64748b;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 6px;
            margin-top: 30px;
            margin-bottom: 12px;
            font-weight: bold;
          }
          .details-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          .details-table td {
            padding: 8px 0;
            vertical-align: top;
          }
          .details-table td.label {
            width: 130px;
            color: #64748b;
            font-weight: 600;
          }
          .details-table td.value {
            color: #0f172a;
            font-weight: 700;
          }
          .instructions-card {
            background-color: #fff8f0;
            border: 1px solid #ffe8d1;
            border-radius: 12px;
            padding: 20px;
            margin-top: 24px;
          }
          .instructions-title {
            font-size: 13px;
            font-weight: bold;
            color: #ff8c00;
            margin: 0 0 10px 0;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .instructions-list {
            margin: 0;
            padding-left: 20px;
            font-size: 12px;
            color: #475569;
          }
          .instructions-list li {
            margin-bottom: 8px;
          }
          .btn {
            display: inline-block;
            background-color: #ff8c00;
            color: #ffffff !important;
            text-decoration: none;
            padding: 12px 28px;
            font-size: 13px;
            font-weight: bold;
            border-radius: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 15px;
            text-align: center;
          }
          .btn:hover {
            background-color: #e05000;
          }
          .footer {
            background-color: #0f172a;
            padding: 24px;
            text-align: center;
            font-size: 11px;
            color: #64748b;
            border-bottom-left-radius: 16px;
            border-bottom-right-radius: 16px;
          }
          .footer a {
            color: #00a896;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Technovations 2026</h1>
            <p>AI Sports Rehabilitation Innovation Challenge</p>
          </div>
          
          <div class="content">
            <p class="welcome-text">Dear ${data.teamLead},</p>
            <p>Congratulations! Your team <strong>${data.teamName}</strong> has been successfully registered for the Technovations 2026 SportAIthon. We have received your payment reference details (UTR: ${data.transactionId}) which are currently undergoing verification by the Valli Hospital Trust board.</p>
            
            <div class="code-box">
              <div class="code-label">Your Unique Registration Code</div>
              <div class="code-val">${data.registrationCode}</div>
            </div>
            
            <div class="section-title">Registration Summary</div>
            <table class="details-table">
              <tr>
                <td class="label">Team Name</td>
                <td class="value">${data.teamName} (${data.teamSize} Members)</td>
              </tr>
              <tr>
                <td class="label">Team Leader</td>
                <td class="value">${data.teamLead} (${data.leadPhone})</td>
              </tr>
              <tr>
                <td class="label">Academic Profile</td>
                <td class="value">${data.collegeName}<br><span style="font-weight: 500; font-size:11px; color:#64748b;">${data.department} Dept — ${data.yearOfStudy} Year</span></td>
              </tr>
              <tr>
                <td class="label">Transaction Ref</td>
                <td class="value" style="font-family: monospace;">${data.transactionId}</td>
              </tr>
            </table>

            <div class="section-title">Co-Members</div>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569;">
              ${coMembersHtml}
            </ul>

            <div class="instructions-card">
              <h4 class="instructions-title">CRITICAL NEXT STEPS: PPT PRESENTATION</h4>
              <p style="margin: 0 0 10px 0; font-size:12px; color: #475569;">You must submit your project presentation slide deck to lock in your eligibility for the challenge:</p>
              <ul class="instructions-list">
                <li>Go to the Leader Portal at <strong>/iyakkam/technnovations/portal</strong></li>
                <li>Log in using your Registration Code <strong>${data.registrationCode}</strong> and the Leader's Email (<strong>${data.emailId}</strong>) or Phone (<strong>${data.leadPhone}</strong>).</li>
                <li>Upload your slides in <strong>PPT, PPTX, or PDF</strong> format.</li>
                <li>Ensure the file size is under <strong>5MB</strong>.</li>
                <li>All submissions must be completed before the deadline on <strong style="color: #00A896;">July 19, 2026</strong>. Selected teams will present at the live exhibition on <strong style="color: #F26522;">August 2, 2026</strong>.</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/iyakkam/technnovations/portal" class="btn">Access Submission Portal</a>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p>Valli Orthopaedic & Sports Hospital · Iyakkam CME</p>
            <p>If you have any questions, please reply directly to this email or contact the hospital helpdesk.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from,
      to: data.emailId,
      subject: `[Technovations 2026] Registration Confirmed - Code: ${data.registrationCode}`,
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email successfully dispatched to ${data.emailId}. Message ID: ${info.messageId}`);

    const testUrl = nodemailer.getTestMessageUrl(info);
    if (testUrl) {
      console.log(`[TEST EMAIL PREVIEW] View the rendered email at: ${testUrl}`);
    }

    return { success: true, messageId: info.messageId, previewUrl: testUrl || null };
  } catch (error) {
    console.error("Nodemailer failed to dispatch registration email:", error);
    return { success: false, error };
  }
}

export async function sendCertificateEmail(data: {
  delegateId?: number;
  delegateName: string;
  email: string;
  pdfBase64: string;
}) {
  try {
    const { transporter } = await getTransporter();

    const formattedName = data.delegateName.toLowerCase().startsWith("dr.") || data.delegateName.toLowerCase().startsWith("dr ")
      ? data.delegateName
      : `Dr. ${data.delegateName}`;

    const senderName = process.env.SENDER_NAME || "Valli Hospital";
    const replyTo = process.env.REPLY_TO || "info@vallihospital.in";
    const from = `"${senderName}" <${process.env.SMTP_USER || "info@vallihospital.in"}>`;
    const subject = process.env.EMAIL_SUBJECT || `Your Official Certificate - The Practical Ortho Rheumat Summit 2026`;

    const cleanBase64 = data.pdfBase64.includes(";base64,")
      ? data.pdfBase64.split(";base64,")[1]
      : data.pdfBase64.replace(/^data:application\/pdf;.*base64,/, "");
    const pdfBuffer = Buffer.from(cleanBase64, "base64");

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.vallihospital.in";
    const downloadUrl = data.delegateId ? `${baseUrl}/api/certificate/download?id=${data.delegateId}` : null;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Official Participation Certificate</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
            color: #1e293b;
            -webkit-font-smoothing: antialiased;
          }
          .wrapper {
            width: 100%;
            background-color: #f8fafc;
            padding: 40px 15px;
            box-sizing: border-box;
          }
          .card {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,75,87,0.06);
            border: 1px solid #e2e8f0;
          }
          .header {
            background-color: #004B57;
            padding: 36px 30px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 22px;
            font-weight: 700;
            letter-spacing: -0.5px;
          }
          .header p {
            margin: 6px 0 0 0;
            font-size: 13px;
            color: #b2e0da;
            font-weight: 500;
          }
          .body-content {
            padding: 36px 32px;
          }
          .greeting {
            font-size: 20px;
            font-weight: 700;
            color: #0F172A;
            margin-bottom: 16px;
          }
          .paragraph {
            font-size: 14px;
            line-height: 1.65;
            color: #475569;
            margin-bottom: 20px;
          }
          .highlight-box {
            background-color: #f0fdfa;
            border: 1px solid #ccfbf1;
            border-radius: 16px;
            padding: 24px;
            margin: 24px 0;
            text-align: center;
          }
          .highlight-title {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #0D9488;
            margin-bottom: 6px;
          }
          .btn-download {
            display: inline-block;
            background-color: #004B57;
            color: #ffffff !important;
            font-weight: 700;
            font-size: 14px;
            padding: 14px 28px;
            border-radius: 12px;
            text-decoration: none;
            margin-top: 16px;
            box-shadow: 0 4px 12px rgba(0,75,87,0.2);
          }
          .signature-section {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #f1f5f9;
            display: table;
            width: 100%;
          }
          .signature-col {
            display: table-cell;
            width: 50%;
            vertical-align: top;
          }
          .sig-title {
            font-size: 13px;
            font-weight: 700;
            color: #1e293b;
          }
          .sig-sub {
            font-size: 11px;
            color: #64748b;
          }
          .footer {
            background-color: #f1f5f9;
            padding: 24px 32px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="card">
            <div class="header">
              <h1>Valli Super Specialty Hospital</h1>
              <p>The Practical Ortho Rheumat Summit 2026</p>
            </div>
            
            <div class="body-content">
              <div class="greeting">Dear ${formattedName},</div>
              
              <div class="paragraph">
                Thank you for participating in <strong>The Practical Ortho Rheumat Summit 2026</strong> held on 28th June, 2026 at Hotel Grand Estancia, Salem, Tamil Nadu. We sincerely appreciate your valuable feedback and presence.
              </div>
              
              <div class="highlight-box">
                <div class="highlight-title">Official Certificate Ready</div>
                <div style="font-size: 16px; font-weight: 700; color: #004B57;">Certificate of Participation</div>
                <div style="font-size: 13px; color: #475569; margin-top: 6px;">Your certificate is securely stored in our cloud database and attached to this email.</div>
                ${downloadUrl ? `
                  <div style="margin-top: 16px;">
                    <a href="${downloadUrl}" class="btn-download" target="_blank">Download Certificate (PDF)</a>
                  </div>
                ` : ""}
              </div>
              <div class="paragraph">
                We hope the scientific topics and clinical sessions proved valuable to your clinical practice. We wish you continued success in all your professional endeavors.
              </div>

              <div class="signature-section">
                <div class="signature-col">
                  <div class="sig-title">Dr. T. Natanasabapathy</div>
                  <div class="sig-sub">Organizing Chairman</div>
                </div>
                <div class="signature-col" style="text-align: right;">
                  <div class="sig-title">Dr. K. N. Jotheesvar</div>
                  <div class="sig-sub">Organizing Secretary</div>
                </div>
              </div>
            </div>

            <div class="footer">
              <p style="margin: 0; font-weight: 600;">Valli Super Specialty Hospital</p>
              <p style="margin: 4px 0 0 0;">Salem, Tamil Nadu • Contact: info@vallihospital.in</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from,
      replyTo,
      to: data.email,
      subject,
      html: emailHtml,
      attachments: [
        {
          filename: `Certificate_${data.delegateName.replace(/\s+/g, "_")}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Certificate email sent to ${data.email}. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send certificate email:", error);
    return { success: false, error };
  }
}

export interface AriseEmailPayload {
  registrationCode: string;
  fullName: string;
  emailId: string;
  mobileNumber: string;
  category: string;
  includeWorkshop: boolean;
  institution: string;
  department?: string;
  city?: string;
  transactionId: string;
  designation?: string;
  qualification?: string;
  foodPreference?: string;
  iapCreditPoints?: boolean;
  iapMembershipNumber?: string;
  bonafideCertificate?: string;
}

export async function sendAriseRegistrationEmail(data: AriseEmailPayload) {
  try {
    const { transporter, from } = await getTransporter();

    let amountPaid = 2000;
    const isStudent = data.designation === "Student / Intern";
    if (data.category.toLowerCase().includes("bulk")) {
      amountPaid = 20000;
    } else if (data.category === "Conference with Workshop") {
      amountPaid = isStudent ? 1500 : 2500;
    } else if (data.category === "Workshop") {
      amountPaid = 500;
    } else {
      amountPaid = isStudent ? 1000 : 2000;
    }

    const workshopStatus = data.includeWorkshop
      ? "Yes (Includes Hands-on Workshop)"
      : "Conference Only";

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ARISE 2026 Registration Confirmation</title>
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
            box-shadow: 0 10px 30px rgba(0, 75, 87, 0.08);
            border: 1px solid #e2e8f0;
          }
          .header {
            background: linear-gradient(135deg, #004B57 0%, #007A6E 50%, #00A896 100%);
            padding: 36px 28px;
            text-align: center;
            color: #ffffff;
          }
          .badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.18);
            border: 1px solid rgba(255, 255, 255, 0.3);
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
            color: #d1fae5;
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
          .pass-box {
            background: linear-gradient(180deg, #f0fdfa 0%, #e6fffa 100%);
            border: 2px dashed #00a896;
            border-radius: 16px;
            padding: 24px 20px;
            text-align: center;
            margin: 20px 0 28px 0;
          }
          .pass-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #007a6e;
            font-weight: 700;
            margin-bottom: 6px;
          }
          .pass-code {
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
            font-size: 32px;
            font-weight: 900;
            color: #004B57;
            letter-spacing: 2px;
            margin: 0;
          }
          .pass-status {
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
          .highlight-card {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            padding: 18px 20px;
            margin-top: 24px;
          }
          .highlight-card h4 {
            margin: 0 0 8px 0;
            font-size: 13px;
            font-weight: 700;
            color: #004B57;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .highlight-card ul {
            margin: 0;
            padding-left: 18px;
            font-size: 12.5px;
            color: #475569;
            line-height: 1.6;
          }
          .highlight-card li {
            margin-bottom: 6px;
          }
          .signatures {
            margin-top: 32px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            display: table;
            width: 100%;
          }
          .sig-cell {
            display: table-cell;
            width: 50%;
            vertical-align: top;
          }
          .sig-name {
            font-size: 13px;
            font-weight: 800;
            color: #0f172a;
          }
          .sig-title {
            font-size: 11px;
            color: #64748b;
            margin-top: 2px;
          }
          .footer {
            background-color: #002e35;
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
            <!-- Header -->
            <div class="header">
              <div class="badge">Official Delegate Confirmation</div>
              <h1>ARISE 2026</h1>
              <p>Advancements in Recovery, Intelligence & Sports Engineering</p>
            </div>

            <!-- Content -->
            <div class="content">
              <div class="greeting">Dear ${data.fullName},</div>
              <p class="lead-text">
                Thank you for registering for <strong>ARISE 2026 National CME & Hands-on Workshop</strong>. Your registration and delegate pass have been verified and confirmed.
              </p>

              <!-- Delegate Pass Card -->
              <div class="pass-box">
                <div class="pass-label">Official Delegate Registration Code</div>
                <div class="pass-code">${data.registrationCode}</div>
                <div class="pass-status">Registration Confirmed ✓</div>
              </div>

              <!-- Registration Summary -->
              <div class="section-heading">Registration Summary</div>
              <table class="table-grid">
                <tr>
                  <td class="k">Delegate Name</td>
                  <td class="v">${data.fullName}</td>
                </tr>
                <tr>
                  <td class="k">Pass Category</td>
                  <td class="v">${data.category}</td>
                </tr>
                <tr>
                  <td class="k">Hands-on Workshop</td>
                  <td class="v">${workshopStatus}</td>
                </tr>
                ${data.designation ? `<tr><td class="k">Designation</td><td class="v">${data.designation}</td></tr>` : ""}
                ${data.qualification ? `<tr><td class="k">Qualification</td><td class="v">${data.qualification}</td></tr>` : ""}
                <tr>
                  <td class="k">Institution / Hospital</td>
                  <td class="v">${data.institution}</td>
                </tr>
                ${data.department ? `<tr><td class="k">Department</td><td class="v">${data.department}</td></tr>` : ""}
                ${data.city ? `<tr><td class="k">City / Location</td><td class="v">${data.city}</td></tr>` : ""}
                <tr>
                  <td class="k">Food Preference</td>
                  <td class="v">${data.foodPreference || "Vegetarian"}</td>
                </tr>
                ${data.iapCreditPoints ? `<tr><td class="k">IAP Credit Points</td><td class="v">Yes${data.iapMembershipNumber ? ` (ID: ${data.iapMembershipNumber})` : ""}</td></tr>` : ""}
                <tr>
                  <td class="k">Amount Paid</td>
                  <td class="v">₹${amountPaid.toLocaleString("en-IN")}</td>
                </tr>
                <tr>
                  <td class="k">Transaction Ref</td>
                  <td class="v" style="font-family: monospace;">${data.transactionId}</td>
                </tr>
              </table>

              <!-- Event Schedule & Venue -->
              <div class="section-heading">Event Date & Venue Details</div>
              <table class="table-grid">
                <tr>
                  <td class="k">Date</td>
                  <td class="v">Saturday, 17 October 2026</td>
                </tr>
                <tr>
                  <td class="k">Timing</td>
                  <td class="v">8:00 AM - 5:00 PM IST</td>
                </tr>
                <tr>
                  <td class="k">Venue</td>
                  <td class="v">Knowledge Institute of Technology (KIOT), Salem, Tamil Nadu</td>
                </tr>
              </table>

              <!-- Important Delegate Instructions -->
              <div class="highlight-card">
                <h4>Important Instructions for Delegates</h4>
                <ul>
                  <li>Please present your <strong>Registration Code (${data.registrationCode})</strong> at the reception desk on arrival to collect your delegate badge and conference kit.</li>
                  <li>Scientific sessions commence sharply at 9:00 AM. Breakfast and registration counters open at 8:00 AM.</li>
                  <li>Conference scientific souvenir, lunch, high tea, and participation certificate are provided.</li>
                </ul>
              </div>

              <!-- Signatures -->
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

            <!-- Footer -->
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

    const senderEmail = from.match(/<([^>]+)>/)?.[1] || process.env.SMTP_USER || "vallisshospital@gmail.com";
    const mailOptions = {
      from: `"ARISE 2026 | Valli Hospital" <${senderEmail}>`,
      to: data.emailId,
      subject: `ARISE 2026 Delegate Pass Confirmed [${data.registrationCode}]`,
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`ARISE registration email sent to ${data.emailId}. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send ARISE registration email:", error);
    return { success: false, error };
  }
}

export interface ActiveSalemEmailPayload {
  registrationCode: string;
  fullName: string;
  emailId: string;
  mobileNumber: string;
  category: string; // "5KM" | "10KM"
  tshirtSize: string; // "S" | "M" | "L" | "XL" | "XXL"
  gender?: string;
  age?: number;
  emergencyContact?: string;
  city?: string;
  transactionId: string;
}

export async function sendActiveSalemRegistrationEmail(data: ActiveSalemEmailPayload) {
  try {
    const { transporter, from } = await getTransporter();

    const is10KM = data.category.toLowerCase().includes("10");
    const amountPaid = is10KM ? 299 : 249;

    const emailHtml = `
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
            <!-- Header -->
            <div class="header">
              <div class="badge">Official Runner Pass & Confirmation</div>
              <h1>Active Salem Marathon 4.0</h1>
              <p>Run for Fitness • Run for Health</p>
            </div>

            <!-- Content -->
            <div class="content">
              <div class="greeting">Dear ${data.fullName},</div>
              <p class="lead-text">
                Congratulations! You are officially registered for <strong>Active Salem Marathon 4.0</strong>. Your payment of <strong>₹${amountPaid}</strong> has been received and verified.
              </p>

              <!-- Runner Bib Card -->
              <div class="bib-box">
                <div class="bib-label">Your Registration & Bib Code</div>
                <div class="bib-code">${data.registrationCode}</div>
                <div class="bib-status">Entry Confirmed ✓</div>
              </div>

              <!-- Runner Details -->
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
                ${data.gender ? `<tr><td class="k">Gender</td><td class="v">${data.gender}</td></tr>` : ""}
                ${data.age ? `<tr><td class="k">Age</td><td class="v">${data.age} Years</td></tr>` : ""}
                <tr>
                  <td class="k">Mobile Number</td>
                  <td class="v">${data.mobileNumber}</td>
                </tr>
                <tr>
                  <td class="k">City / Location</td>
                  <td class="v">${data.city || "Salem"}</td>
                </tr>
                ${data.emergencyContact ? `<tr><td class="k">Emergency Contact</td><td class="v">${data.emergencyContact}</td></tr>` : ""}
                <tr>
                  <td class="k">Registration Fee</td>
                  <td class="v">₹${amountPaid} (Verified)</td>
                </tr>
                <tr>
                  <td class="k">Payment Reference</td>
                  <td class="v" style="font-family: monospace;">${data.transactionId}</td>
                </tr>
              </table>

              <!-- What's included in your kit -->
              <div class="perks-card">
                <h4>What's Included in Your Runner Kit</h4>
                <ul>
                  <li><strong>Official Running T-Shirt:</strong> Size ${data.tshirtSize} high-performance moisture-wicking jersey.</li>
                  <li><strong>Hydration:</strong> Refreshments, energy drinks.</li>
                  <li><strong>Digital Timing Certificate:</strong> Available for download post-event.</li>
                </ul>
              </div>

              <!-- Race Day Guidelines -->
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

            <!-- Footer -->
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

    const senderEmail = from.match(/<([^>]+)>/)?.[1] || process.env.SMTP_USER || "vallisshospital@gmail.com";
    const mailOptions = {
      from: `"Active Salem Marathon 4.0" <${senderEmail}>`,
      to: data.emailId,
      subject: `Active Salem Marathon 4.0 - Registration Confirmed [${data.registrationCode}]`,
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Active Salem registration email sent to ${data.emailId}. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send Active Salem registration email:", error);
    return { success: false, error };
  }
}

/**
 * Sends a demo verification email to a target address (e.g. mohammedarif2303@gmail.com)
 */
export async function sendDemoVerificationEmail(targetEmail: string, type: "salem" | "arise" | "both" = "both") {
  const results: any = {};

  if (type === "salem" || type === "both") {
    results.salem = await sendActiveSalemRegistrationEmail({
      registrationCode: "SALEM26-DEMO",
      fullName: "Mohammed Arif",
      emailId: targetEmail,
      mobileNumber: "9876543210",
      category: "10KM",
      tshirtSize: "L",
      gender: "Male",
      age: 26,
      emergencyContact: "9123456780",
      city: "Salem",
      transactionId: "pay_DEMO_ACTIVE_SALEM_2026",
    });
  }

  if (type === "arise" || type === "both") {
    results.arise = await sendAriseRegistrationEmail({
      registrationCode: "ARISE26-DEMO",
      fullName: "Dr. Mohammed Arif",
      emailId: targetEmail,
      mobileNumber: "9876543210",
      category: "Conference with Workshop",
      includeWorkshop: true,
      institution: "Valli Super Speciality Hospital",
      department: "Sports Medicine & Rehabilitation",
      city: "Salem",
      transactionId: "pay_DEMO_ARISE_2026",
      designation: "Sports Physiotherapist",
      qualification: "MPT (Sports)",
      foodPreference: "Non-Vegetarian",
      iapCreditPoints: true,
      iapMembershipNumber: "IAP-2026-9812",
    });
  }

  return results;
}
