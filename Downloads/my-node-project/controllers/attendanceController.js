const db = require('../config/db');

exports.getMemberWorkTime = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' });
  }

  const query = 'SELECT check_in_time, check_out_time, break_start_time, break_end_time FROM attendance WHERE user_id = ?';
  
  try {
    const db = req.db;
    const [rows] = await req.db.query(query, [user_id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No records found for the specified user_id' });
    }

    const records = rows.map(row => ({
      check_in_time: row.check_in_time,
      check_out_time: row.check_out_time,
      break_start_time: row.break_start_time,
      break_end_time: row.break_end_time
    }));

    res.json({ user_id, records });
  } catch (error) {
    console.error('Database query error: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.recordAttendance = async (req, res) => {
  const { userId, type, time } = req.body;

  if (!['check_in_time', 'check_out_time', 'break_start_time', 'break_end_time'].includes(type)) {
    return res.status(400).json({ error: 'Invalid type' });
  }

  let query;
  if (type === 'check_in_time') {
    query = 'INSERT INTO attendance (user_id, check_in_time) VALUES (?, ?) ON DUPLICATE KEY UPDATE check_in_time = VALUES(check_in_time)';
  } else {
    const column = type;
    query = `UPDATE attendance SET ${column} = ? WHERE user_id = ? AND ${column} IS NULL`;
  }

  try {
    const [result] = await req.db.query(query, type === 'check_in_time' ? [userId, time] : [time, userId]);
    res.status(200).json({ message: `${type} recorded`, result });
  } catch (error) {
    console.error('Database query error: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
