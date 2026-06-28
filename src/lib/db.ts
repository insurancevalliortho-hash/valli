import { neon } from "@neondatabase/serverless";

const connectionString = "postgresql://neondb_owner:npg_UbVtH6u1ToyO@ep-icy-lab-ah4q57yb-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

// Initialize Neon SQL client
export const sql = neon(connectionString);

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

  // Fallback for .gmail.con typos
  const alternativeEmail = cleanEmail.endsWith('.com') 
    ? cleanEmail.replace(/\.com$/, '.con') 
    : cleanEmail.endsWith('.con') 
      ? cleanEmail.replace(/\.con$/, '.com') 
      : cleanEmail;

  if (alternativeEmail !== cleanEmail) {
    const fallbackResult = await sql`
      SELECT * FROM delegates 
      WHERE LOWER(TRIM(email)) = ${alternativeEmail}
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

