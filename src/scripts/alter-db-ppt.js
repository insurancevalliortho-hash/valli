const { Client } = require('pg');

const connectionString = "postgresql://neondb_owner:npg_UbVtH6u1ToyO@ep-icy-lab-ah4q57yb-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

async function main() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected to database. Running migrations for PPT uploads...");

    // Add ppt_file column
    await client.query(`
      ALTER TABLE technovations_registrations 
      ADD COLUMN IF NOT EXISTS ppt_file TEXT;
    `);
    console.log("Column 'ppt_file' verified/added.");

    // Add ppt_filename column
    await client.query(`
      ALTER TABLE technovations_registrations 
      ADD COLUMN IF NOT EXISTS ppt_filename VARCHAR(255);
    `);
    console.log("Column 'ppt_filename' verified/added.");

    // Add ppt_uploaded_at column
    await client.query(`
      ALTER TABLE technovations_registrations 
      ADD COLUMN IF NOT EXISTS ppt_uploaded_at TIMESTAMP;
    `);
    console.log("Column 'ppt_uploaded_at' verified/added.");

    console.log("PPT Migration completed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.end();
  }
}

main();
