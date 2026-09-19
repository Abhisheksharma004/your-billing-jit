const mysql = require('mysql2/promise');

async function setup() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'your-billing-jit',
  });

  try {
    console.log('Creating subscription_plans table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS subscription_plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        tagline VARCHAR(255) NULL,
        billing_cycle VARCHAR(50) DEFAULT 'monthly',
        monthly_price DECIMAL(10, 2) DEFAULT 0,
        max_users VARCHAR(50) DEFAULT '5',
        eway_limit VARCHAR(50) DEFAULT '2500',
        trial_days INT DEFAULT 14,
        cta_text VARCHAR(100) DEFAULT 'Start 14-Day Free Trial',
        is_popular TINYINT(1) DEFAULT 0,
        description TEXT NULL,
        features JSON NULL,
        subscribers_count INT DEFAULT 0,
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Table subscription_plans verified successfully.');
  } catch (err) {
    console.error('Setup error:', err);
  } finally {
    await pool.end();
  }
}

setup();
