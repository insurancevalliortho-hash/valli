import { neon } from "@neondatabase/serverless";
import { Pool } from "pg";

// ISP DNS blocks Neon hostnames — use direct IP with SNI servername as workaround.
// IP resolved via Google DNS (8.8.8.8) for:
//   ep-icy-lab-ah4q57yb-pooler.c-3.us-east-1.aws.neon.tech => 18.215.6.120
const NEON_HOST = "18.215.6.120";
const NEON_SNI  = "ep-icy-lab-ah4q57yb-pooler.c-3.us-east-1.aws.neon.tech";
const NEON_USER = "neondb_owner";
const NEON_PASS = "npg_UbVtH6u1ToyO";
const NEON_DB   = "neondb";

// Neon HTTP driver needs a connection string — use the pooler hostname as-is
// (the @neondatabase/serverless driver uses fetch, not TCP, so DNS is irrelevant here)
const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${NEON_USER}:${NEON_PASS}@${NEON_SNI}/${NEON_DB}?sslmode=require&channel_binding=require`;

export const sql = neon(connectionString);

let sharedPool: InstanceType<typeof Pool> | null = null;
export function getPgPool() {
  if (!sharedPool) {
    sharedPool = new Pool({
      host: NEON_HOST,
      port: 5432,
      database: NEON_DB,
      user: NEON_USER,
      password: NEON_PASS,
      ssl: { rejectUnauthorized: false, servername: NEON_SNI },
      max: 5,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 10000,
    });
  }
  return sharedPool;
}

export async function saveRegistration(data: {
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
  source: string;
  transactionId: string;
  paymentScreenshot?: string;
}) {
  const result = await sql`
    INSERT INTO technovations_registrations (
      registration_code,
      team_name,
      team_size,
      team_lead,
      lead_phone,
      co_members,
      email_id,
      college_name,
      college_location,
      department,
      year_of_study,
      source,
      transaction_id,
      payment_screenshot
    ) VALUES (
      ${data.registrationCode},
      ${data.teamName},
      ${data.teamSize},
      ${data.teamLead},
      ${data.leadPhone},
      ${JSON.stringify(data.coMembers)},
      ${data.emailId},
      ${data.collegeName},
      ${data.collegeLocation},
      ${data.department},
      ${data.yearOfStudy},
      ${data.source},
      ${data.transactionId},
      ${data.paymentScreenshot || null}
    )
    RETURNING id;
  `;
  return result;
}

export async function getDelegateByEmail(email: string) {
  const cleanEmail = email.trim().toLowerCase();
  const result = await sql`
    SELECT * FROM delegates 
    WHERE LOWER(TRIM(email)) = ${cleanEmail}
    LIMIT 1;
  `;
  if (result.length > 0) return result[0];

  // Fallbacks for common email domain typos (.gmail.con, .gmai.com, etc.)
  let altEmail = cleanEmail;
  if (cleanEmail.endsWith('.com')) altEmail = cleanEmail.replace(/\.com$/, '.con');
  else if (cleanEmail.endsWith('.con')) altEmail = cleanEmail.replace(/\.con$/, '.com');
  else if (cleanEmail.endsWith('@gmai.com')) altEmail = cleanEmail.replace(/@gmai\.com$/, '@gmail.com');
  else if (cleanEmail.endsWith('@gmail.com')) altEmail = cleanEmail.replace(/@gmail\.com$/, '@gmai.com');

  if (altEmail !== cleanEmail) {
    const fallbackResult = await sql`
      SELECT * FROM delegates 
      WHERE LOWER(TRIM(email)) = ${altEmail}
      LIMIT 1;
    `;
    if (fallbackResult.length > 0) return fallbackResult[0];
  }

  return null;
}

export async function checkFeedbackSubmitted(delegateId: number) {
  const result = await sql`
    SELECT id FROM feedback_responses 
    WHERE delegate_id = ${delegateId} 
    LIMIT 1;
  `;
  return result.length > 0;
}

export async function saveFeedbackResponse(data: {
  delegateId: number;
  email: string;
  q1EventQuality: number;
  q2SessionRelevance: number;
  q3SpeakerEffectiveness: number;
  q4OrganizationVenue: number;
  comments: string;
}) {
  const result = await sql`
    INSERT INTO feedback_responses (
      delegate_id,
      email,
      q1_event_quality,
      q2_session_relevance,
      q3_speaker_effectiveness,
      q4_organization_venue,
      comments
    ) VALUES (
      ${data.delegateId},
      ${data.email},
      ${data.q1EventQuality},
      ${data.q2SessionRelevance},
      ${data.q3SpeakerEffectiveness},
      ${data.q4OrganizationVenue},
      ${data.comments}
    )
    RETURNING id;
  `;
  return result;
}

export async function getAllDelegatesWithFeedback() {
  const result = await sql`
    SELECT 
      d.delegate_id,
      d.name,
      d.email,
      d.phone,
      d.reg_no,
      f.id as feedback_id,
      f.q1_event_quality,
      f.q2_session_relevance,
      f.q3_speaker_effectiveness,
      f.q4_organization_venue,
      f.comments,
      f.submitted_at
    FROM delegates d
    LEFT JOIN feedback_responses f ON d.delegate_id = f.delegate_id
    ORDER BY d.delegate_id ASC;
  `;
  return result;
}

export async function saveCertificateFile(delegateId: number, email: string, pdfBase64: string) {
  const result = await sql`
    INSERT INTO certificate_files (delegate_id, email, pdf_base64)
    VALUES (${delegateId}, ${email}, ${pdfBase64})
    ON CONFLICT (delegate_id) DO UPDATE SET
      email = EXCLUDED.email,
      pdf_base64 = EXCLUDED.pdf_base64,
      created_at = NOW()
    RETURNING id;
  `;
  return result;
}

export async function getCertificateFile(delegateId: number) {
  const result = await sql`
    SELECT * FROM certificate_files
    WHERE delegate_id = ${delegateId}
    LIMIT 1;
  `;
  return result.length > 0 ? result[0] : null;
}

export async function saveAriseRegistration(data: {
  registrationCode: string;
  fullName: string;
  emailId: string;
  mobileNumber: string;
  category: string;
  includeWorkshop: boolean;
  institution: string;
  department?: string;
  city?: string;
  source?: string;
  transactionId: string;
  paymentScreenshot?: string;
  designation?: string;
  qualification?: string;
  bonafideCertificate?: string;
  foodPreference?: string;
  iapCreditPoints?: boolean;
  iapMembershipNumber?: string;
}) {
  const pool = getPgPool();
  try {
    const res = await pool.query(
      `INSERT INTO arise_registrations (
        registration_code, full_name, email_id, mobile_number, category, include_workshop,
        institution, department, city, source, transaction_id, payment_screenshot,
        designation, qualification, bonafide_certificate, food_preference,
        iap_credit_points, iap_membership_number
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING id;`,
      [
        data.registrationCode,
        data.fullName,
        data.emailId,
        data.mobileNumber,
        data.category,
        data.includeWorkshop,
        data.institution,
        data.department || null,
        data.city || null,
        data.source || null,
        data.transactionId,
        data.paymentScreenshot || null,
        data.designation || null,
        data.qualification || null,
        data.bonafideCertificate || null,
        data.foodPreference || null,
        data.iapCreditPoints || false,
        data.iapMembershipNumber || null
      ]
    );
    return res.rows;
  } catch (err: any) {
    // Attempt table creation if missing
    if (err.message && err.message.toLowerCase().includes("does not exist")) {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS arise_registrations (
          id SERIAL PRIMARY KEY,
          registration_code VARCHAR(100) UNIQUE NOT NULL,
          full_name TEXT NOT NULL,
          email_id TEXT NOT NULL,
          mobile_number TEXT NOT NULL,
          category VARCHAR(100) NOT NULL,
          include_workshop BOOLEAN DEFAULT FALSE,
          institution TEXT NOT NULL,
          department TEXT,
          city TEXT,
          source TEXT,
          transaction_id VARCHAR(100) UNIQUE NOT NULL,
          payment_screenshot TEXT,
          is_verified BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          designation TEXT,
          qualification TEXT,
          bonafide_certificate TEXT,
          food_preference TEXT,
          iap_credit_points BOOLEAN DEFAULT FALSE,
          iap_membership_number TEXT
        );
      `);
      const retryRes = await pool.query(
        `INSERT INTO arise_registrations (
          registration_code, full_name, email_id, mobile_number, category, include_workshop,
          institution, department, city, source, transaction_id, payment_screenshot,
          designation, qualification, bonafide_certificate, food_preference,
          iap_credit_points, iap_membership_number
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING id;`,
        [
          data.registrationCode,
          data.fullName,
          data.emailId,
          data.mobileNumber,
          data.category,
          data.includeWorkshop,
          data.institution,
          data.department || null,
          data.city || null,
          data.source || null,
          data.transactionId,
          data.paymentScreenshot || null,
          data.designation || null,
          data.qualification || null,
          data.bonafideCertificate || null,
          data.foodPreference || null,
          data.iapCreditPoints || false,
          data.iapMembershipNumber || null
        ]
      );
      return retryRes.rows;
    }
    throw err;
  }
}

export async function saveActiveSalemRegistration(data: {
  registrationCode: string;
  fullName: string;
  emailId: string;
  mobileNumber: string;
  category: string; // "5KM" | "10KM"
  tshirtSize: string; // "S" | "M" | "L" | "XL" | "XXL"
  gender: string;
  age: number;
  emergencyContact?: string;
  city?: string;
  source?: string;
  transactionId: string;
  paymentScreenshot?: string;
}) {
  const pool = getPgPool();
  try {
    const res = await pool.query(
      `INSERT INTO active_salem_registrations (
        registration_code, full_name, email_id, mobile_number, category, tshirt_size,
        gender, age, emergency_contact, city, source, transaction_id, payment_screenshot
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id;`,
      [
        data.registrationCode,
        data.fullName,
        data.emailId,
        data.mobileNumber,
        data.category,
        data.tshirtSize,
        data.gender,
        data.age,
        data.emergencyContact || null,
        data.city || null,
        data.source || null,
        data.transactionId,
        data.paymentScreenshot || null
      ]
    );
    return res.rows;
  } catch (err: any) {
    if (err.message && err.message.toLowerCase().includes("does not exist")) {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS active_salem_registrations (
          id SERIAL PRIMARY KEY,
          registration_code VARCHAR(100) UNIQUE NOT NULL,
          full_name VARCHAR(255) NOT NULL,
          email_id VARCHAR(255) NOT NULL,
          mobile_number VARCHAR(50) NOT NULL,
          category VARCHAR(50) NOT NULL,
          tshirt_size VARCHAR(20) NOT NULL,
          gender VARCHAR(20) NOT NULL,
          age INTEGER NOT NULL,
          emergency_contact VARCHAR(50),
          city VARCHAR(100),
          source VARCHAR(100),
          transaction_id VARCHAR(100) UNIQUE NOT NULL,
          payment_screenshot TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
      const retryRes = await pool.query(
        `INSERT INTO active_salem_registrations (
          registration_code, full_name, email_id, mobile_number, category, tshirt_size,
          gender, age, emergency_contact, city, source, transaction_id, payment_screenshot
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id;`,
        [
          data.registrationCode,
          data.fullName,
          data.emailId,
          data.mobileNumber,
          data.category,
          data.tshirtSize,
          data.gender,
          data.age,
          data.emergencyContact || null,
          data.city || null,
          data.source || null,
          data.transactionId,
          data.paymentScreenshot || null
        ]
      );
      return retryRes.rows;
    }
    throw err;
  }
}



