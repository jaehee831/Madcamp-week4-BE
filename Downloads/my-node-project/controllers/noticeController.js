const db = require('../config/db');

exports.getNotice = async (req, res) => {
  const query = 'SELECT * FROM bulletin_board LIMIT 1';

  try {
    const db = req.db;
    const [rows] = await db.query(query);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No notice found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Database query error: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateNotice = async (req, res) => {
  const { content, time, idstores } = req.body;

  if (!content || !time || !idstores) {
    return res.status(400).json({ error: 'content, time, and idstores are required' });
  }

  const query = 'UPDATE bulletin_board SET content = ?, time = ?, idstores = ? WHERE idbulletinBoard = 1';

  try {
    const db = req.db;
    await db.query(query, [content, time, idstores]);

    res.json({ message: 'Notice updated successfully' });
  } catch (error) {
    console.error('Database query error: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
