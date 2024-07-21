//데이터베이스 연결
const mysql=require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'wogml0913!',
    database: 'mydb'
})

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
  });
  
  module.exports = db;
  