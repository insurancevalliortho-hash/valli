const fs = require('fs');
const nodemailer = require('nodemailer');

const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim().replace(/^['"](.*)['"]$/, '$1');
});

const pass = (env.SMTP_PASS || '').replace(/\s+/g, '').trim();
console.log('Testing SMTP connection for:', env.SMTP_USER, 'password length:', pass.length);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: env.SMTP_USER, pass },
  tls: { rejectUnauthorized: false }
});

transporter.verify()
  .then(() => {
    console.log('>>> SUCCESS: SMTP credentials are VALID and connected to Gmail! <<<');
    process.exit(0);
  })
  .catch(err => {
    console.error('>>> ERROR: SMTP verification failed:', err.message);
    process.exit(1);
  });
