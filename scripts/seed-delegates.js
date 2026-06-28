const { neon } = require("@neondatabase/serverless");
const delegates = require("./delegates-data");

const connectionString = "postgresql://neondb_owner:npg_UbVtH6u1ToyO@ep-icy-lab-ah4q57yb-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
const sql = neon(connectionString);

async function main() {
  console.log("Creating/updating database tables...");
  
  await sql`
    CREATE TABLE IF NOT EXISTS delegates (
      id SERIAL PRIMARY KEY,
      delegate_id INT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      reg_no TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS feedback_responses (
      id SERIAL PRIMARY KEY,
      delegate_id INT REFERENCES delegates(delegate_id),
      email TEXT NOT NULL,
      q1_event_quality INT,
      q2_session_relevance INT,
      q3_speaker_effectiveness INT,
      q4_organization_venue INT,
      comments TEXT,
      submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;

  console.log("Seeding delegates data...");
  for (const d of delegates) {
    await sql`
      INSERT INTO delegates (delegate_id, name, email, phone, reg_no)
      VALUES (${d.id}, ${d.name}, ${d.email}, ${d.phone}, ${d.regNo})
      ON CONFLICT (delegate_id) DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        reg_no = EXCLUDED.reg_no;
    `;
  }

  console.log(`Successfully updated schema and seeded ${delegates.length} delegates!`);
}

main().catch(err => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
