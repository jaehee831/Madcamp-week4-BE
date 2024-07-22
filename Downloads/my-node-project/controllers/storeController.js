const db = require('../config/db');

exports.saveStore = async (req, res) => {
  const { store_name, password } = req.body;

  if (!store_name || !password) {
    return res.status(400).json({ error: 'store_name and password are required' });
  }

  const query = 'INSERT INTO stores (name, password) VALUES (?, ?)';

  try {
    const db = req.db;
    await db.query(query, [store_name, password]);
    res.status(200).json({ message: 'Store saved successfully' });
  } catch (error) {
    console.error('Database query error: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
