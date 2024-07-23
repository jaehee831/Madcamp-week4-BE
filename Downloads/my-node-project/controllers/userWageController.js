// controllers/userWageController.js
const db = require('../config/db');

exports.addUsersToWages = async (req, res) => {
    const selectQuery = `SELECT iduser FROM user`;
    const insertQuery = `INSERT INTO user_wages (user_id, hourly_rate) VALUES (?, 9860) ON DUPLICATE KEY UPDATE hourly_rate = VALUES(hourly_rate)`;
    const updateNullRatesQuery = `
      UPDATE user_wages uw
      JOIN user u ON uw.user_id = u.iduser
      SET uw.hourly_rate = 9860
      WHERE uw.hourly_rate IS NULL
    `;
  
    try {
      const db = req.db;
      const [users] = await db.query(selectQuery);
  
      for (const user of users) {
        await db.execute(insertQuery, [user.iduser]);
      }
  
      // 추가된 부분: hourly_rate가 NULL인 경우 9860으로 업데이트
      const [updateResult] = await db.execute(updateNullRatesQuery);
  
      res.status(200).json({ message: 'Users added to user_wages table and hourly rates updated', updatedRows: updateResult.affectedRows });
    } catch (error) {
      console.error('Database query error: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.getUserWages = async (req, res) => {
    const selectQuery = `SELECT u.iduser, uw.hourly_rate FROM user u JOIN user_wages uw ON u.iduser = uw.user_id`;
  
    try {
      const db = req.db;
      const [rows] = await db.query(selectQuery);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Database query error: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.getUserWage = async (req, res) => {
    const userId = req.query.user_id;
    const selectQuery = `SELECT u.iduser, uw.hourly_rate FROM user u JOIN user_wages uw ON u.iduser = uw.user_id WHERE u.iduser = ?`;
  
    try {
      const db = req.db;
      const [rows] = await db.query(selectQuery, [userId]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Database query error: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
exports.editUserWage = async (req, res) => {
    const { iduser, hourly_rate } = req.body;
  
    if (!iduser || !hourly_rate) {
      return res.status(400).json({ error: 'Missing iduser or hourly_rate in request body' });
    }
  
    const updateQuery = `UPDATE user_wages SET hourly_rate = ? WHERE user_id = ?`;
  
    try {
      const db = req.db;
      const [result] = await db.execute(updateQuery, [hourly_rate, iduser]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'User wage updated successfully' });
    } catch (error) {
      console.error('Database query error: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  