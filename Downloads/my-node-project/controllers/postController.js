const db = require('../config/db');

exports.getPostsByBoard = async (req, res) => {
  const { board_id } = req.query;

  if (!board_id) {
    return res.status(400).json({ error: 'board_id is required' });
  }

  const query = 'SELECT * FROM post WHERE board_id = ?';
  
  try {
    const db = req.db;
    const [rows] = await db.query(query, [board_id]);
    res.json(rows);
  } catch (error) {
    console.error('Database query error: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createPost = async (req, res) => {
    const { title, content, board_id, user_id } = req.body;
  
    if (!title || !content || !board_id || !user_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const query = 'INSERT INTO post (title, content, board_id, user_id) VALUES (?, ?, ?, ?)';
    
    try {
      const db = req.db;
      const [result] = await db.query(query, [title, content, board_id, user_id]);
      res.json({ id: result.insertId, title, content, board_id, user_id, time: new Date(), like_count: 0, comment_count: 0 });
    } catch (error) {
      console.error('Database query error: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };