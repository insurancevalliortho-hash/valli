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
