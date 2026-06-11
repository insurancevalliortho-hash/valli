const { Client } = require('pg');

const connectionString = "postgresql://neondb_owner:npg_UbVtH6u1ToyO@ep-icy-lab-ah4q57yb-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

async function main() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected to database. Running migrations...");

    // Add payment_screenshot column
    await client.query(`
      ALTER TABLE technovations_registrations 
      ADD COLUMN IF NOT EXISTS payment_screenshot TEXT;
    `);
    console.log("Column 'payment_screenshot' verified/added.");

    // Add is_verified column
    await client.query(`
      ALTER TABLE technovations_registrations 
      ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;
    `);
    console.log("Column 'is_verified' verified/added.");

    console.log("Migration completed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.end();
  }
}

main();
