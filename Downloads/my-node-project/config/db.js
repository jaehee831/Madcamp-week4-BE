// 데이터베이스 연결
const mysql = require('mysql2/promise');

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'wogml0913!',
  database: 'mydb'
};

async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('MySQL connected...');
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

module.exports = initializeDatabase;
