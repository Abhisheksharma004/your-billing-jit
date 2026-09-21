const mysql = require('mysql2/promise');

async function setup() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'your-billing-jit',
  });

  try {
    // 1. Create companies table
    console.log('Creating companies table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company_id VARCHAR(10) UNIQUE NOT NULL COMMENT '7-digit numeric format (e.g. 7849201)',
        company_name VARCHAR(255) NOT NULL,
        contact_person VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        contact_number VARCHAR(15) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        default_password VARCHAR(255) NOT NULL COMMENT 'Bcrypt hash of master password',
        whatsapp_updates TINYINT(1) DEFAULT 0,
        email_verified TINYINT(1) DEFAULT 1,
        status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
        trial_start DATE DEFAULT (CURRENT_DATE),
        trial_end DATE DEFAULT (DATE_ADD(CURRENT_DATE, INTERVAL 14 DAY)),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Table "companies" created/verified.');

    // 2. Create email_otps table
    console.log('Creating email_otps table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS email_otps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        otp VARCHAR(7) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        verified TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_expires (expires_at)
      )
    `);
    console.log('✅ Table "email_otps" created/verified.');

    console.log('\n🎉 All signup tables ready!');
  } catch (err) {
    console.error('❌ Setup error:', err);
  } finally {
    await pool.end();
  }
}

setup();
