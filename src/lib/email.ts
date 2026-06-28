import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import jsPDF from "jspdf";

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
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM || "Technovations 2026 <no-reply@valli-hospital.com>";

  if (host && user && pass) {
    // Production SMTP setup
    return {
      transporter: nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
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
  delegateName: string;
  email: string;
  pdfBase64?: string;
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

    let pdfBuffer: Buffer;
    if (data.pdfBase64 && data.pdfBase64.length > 500000) {
      const cleanBase64 = data.pdfBase64.includes(";base64,")
        ? data.pdfBase64.split(";base64,")[1]
        : data.pdfBase64.replace(/^data:application\/pdf;.*base64,/, "");
      pdfBuffer = Buffer.from(cleanBase64, "base64");
    } else {
      // Server-side PDF generation for 100% reliable 2.09MB attachment
      const imgPath = path.join(process.cwd(), "public/certificate-template.png");
      const imgBuffer = fs.readFileSync(imgPath);
      const imgBase64 = `data:image/png;base64,${imgBuffer.toString("base64")}`;

      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgBase64, "PNG", 0, 0, pdfWidth, pdfHeight);

      let fontSize = 42;
      if (formattedName.length > 25) fontSize = 30;
      else if (formattedName.length > 20) fontSize = 36;

      pdf.setFont("times", "bold");
      pdf.setFontSize(fontSize);
      pdf.setTextColor(15, 89, 71); // #0f5947

      const yPos = pdfHeight * 0.542;
      pdf.text(formattedName, pdfWidth / 2, yPos, { align: "center" });

      const pdfArrayBuffer = pdf.output("arraybuffer");
      pdfBuffer = Buffer.from(pdfArrayBuffer);
    }

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
            padding: 20px;
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
          .highlight-[#004B57] {
            font-size: 16px;
            font-weight: 700;
            color: #004B57;
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
              <h1>Valli Super Speciality Hospital</h1>
              <p>The Practical Ortho Rheumat Summit 2026</p>
            </div>
            
            <div class="body-content">
              <div class="greeting">Dear ${formattedName},</div>
              
              <div class="paragraph">
                Thank you for participating in <strong>The Practical Ortho Rheumat Summit 2026</strong> held on 28th June, 2026 at Hotel Grand Estancia, Salem, Tamil Nadu. We sincerely appreciate your valuable feedback and presence.
              </div>
              
              <div class="highlight-box">
                <div class="highlight-title">Official Certificate Attached</div>
                <div class="highlight-[#004B57]">Certificate of Participation</div>
                <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Attached to this email as a high-resolution PDF document</div>
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
              <p style="margin: 0; font-weight: 600;">Valli Super Speciality Hospital</p>
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

