const db = require('../config/db');

exports.getBoards = async (req, res) => {
  const query = 'SELECT * FROM board';
  
  try {
    const db = req.db;
    const [rows] = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Database query error: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
