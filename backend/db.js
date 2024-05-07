const mysql = require('mysql2/promise');
require('dotenv').config(); // Load environment variables

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0,
});

module.exports = pool;

// Example usage in your application
async function fetchDataFromDatabase() {
  let connection;
  try {
    connection = await pool.getConnection();
    // Perform database operations
    // ...
  } catch (error) {
    console.error('Error interacting with the database:', error);
  } finally {
    if (connection) {
      connection.release(); // Release the connection back to the pool
    }
  }
}
