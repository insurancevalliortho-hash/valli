const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_UbVtH6u1ToyO@ep-icy-lab-ah4q57yb-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

async function main() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected to Neon DB. Checking and creating arise_registrations table...");

    await client.query(`
      CREATE TABLE IF NOT EXISTS arise_registrations (
        id SERIAL PRIMARY KEY,
        registration_code VARCHAR(50) UNIQUE NOT NULL,
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

    await client.query(`
      ALTER TABLE arise_registrations 
      ADD COLUMN IF NOT EXISTS designation TEXT,
      ADD COLUMN IF NOT EXISTS qualification TEXT,
      ADD COLUMN IF NOT EXISTS bonafide_certificate TEXT,
      ADD COLUMN IF NOT EXISTS food_preference TEXT,
      ADD COLUMN IF NOT EXISTS iap_credit_points BOOLEAN DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS iap_membership_number TEXT;
    `);
    console.log("Table 'arise_registrations' successfully verified/created.");
  } catch (err) {
    console.error("Migration error:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
