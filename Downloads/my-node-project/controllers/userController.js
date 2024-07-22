const db = require('../config/db');
const initializeDatabase = require('../config/db');

exports.saveUser = async (req, res) => {
    const user = req.body;
    const checkUserSql = 'SELECT * FROM user WHERE iduser = ?';
    const insertUserSql = 'INSERT INTO user (iduser, name, is_admin) VALUES (?, ?, ?)';
    const values = [user.iduser, user.name, user.is_admin];
  
    console.log('Request received:', user);
  
    try {
      const db = await initializeDatabase();
  
      // 데이터베이스 쿼리 전 로그 추가
      console.log('Checking if user exists...');
      
      const [result] = await db.query(checkUserSql, [user.iduser]);
  
      // 쿼리 결과 로그 추가
      console.log('Check user result:', result);
  
      if (result.length > 0) {
        // 사용자가 이미 존재하는 경우
        console.log('User already exists');
        return res.json({ status: 'success', message: 'User already exists' });
      }
  
      // 사용자가 존재하지 않을 경우 로그 추가
      console.log('Inserting new user...');
  
      const [insertResult] = await db.query(insertUserSql, values);
      console.log('User saved successfully:', insertResult);
      res.json({ status: 'success', message: 'User saved successfully' });
    } catch (err) {
      console.error('Database query error:', err);
      res.status(500).json({ status: 'error', message: err.message });
    }
  };

exports.getUserName = async (req, res) => {
    const userId = req.body.user_id;
  
    // Query to get the user name by user ID
    const query = 'SELECT name FROM user WHERE iduser = ?';
  
    try {
        const db = await initializeDatabase();
        
        const [results] = await db.query(query, [userId]);
        
        if (results.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        res.status(200).json({ user_name: results[0].name });
      } catch (error) {
        return res.status(500).json({ error: 'Database query failed' });
      }
  };

  exports.getStoreMembers = async (req, res) => {
    const { store_id } = req.body;
  
    if (!store_id) {
      return res.status(400).json({ error: 'store_id is required' });
    }
  
    const query = `
      SELECT u.iduser AS user_id, u.name 
      FROM user u
      JOIN user_store us ON u.iduser = us.user_id
      WHERE us.store_id = ? AND u.is_admin = 0
    `;
  
    try {
      const [rows] = await req.db.query(query, [store_id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ message: 'No members found for the specified store_id' });
      }
  
      const members = rows.map(row => ({
        user_id: row.user_id,
        name: row.name
      }));
  
      res.json(members);
    } catch (error) {
      console.error('Database query error: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.checkIsAdmin = async (req, res) => {
    const { user_id } = req.body;
  
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }
  
    const query = 'SELECT is_admin FROM user WHERE iduser = ?';
    
    try {
      const db = req.db;
      const [rows] = await db.query(query, [user_id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isAdmin = rows[0].is_admin;
      res.json(isAdmin ? 1 : 0);
    } catch (error) {
      console.error('Database query error: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };