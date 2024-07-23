const db = require('../config/db');

exports.addUserTask = async (req, res) => {
    const { task_id, user_ids } = req.body;

    if (!task_id || !Array.isArray(user_ids) || user_ids.length === 0) {
        return res.status(400).send('task_id and user_ids are required and user_ids should be a non-empty array');
    }

    const userTaskQuery = 'INSERT INTO user_task (task_id, user_id) VALUES ?';
    const userTasks = user_ids.map(userId => [task_id, userId]);

    try {
        const db = req.db;
        await db.query(userTaskQuery, [userTasks]);
        res.status(200).send('User tasks added successfully');
    } catch (err) {
        console.error('Error inserting user tasks:', err);
        res.status(500).send('Error inserting user tasks');
    }
};


exports.getUserFromTask = async (req, res) => {
  console.log('Received request body:', req.body);
  const { task_id } = req.body; // Use req.body to get task_id

  // Log the received task_id to verify it's being passed correctly
  console.log('Extracted task_id:', task_id);
  if (!task_id) {
    return res.status(400).json({ error: 'task_id is required' });
  }

  const query = 'SELECT user_id FROM user_task WHERE task_id = ?';
  
  try {
    const db = req.db;
    const [rows] = await db.query(query, [task_id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No user found for the specified task_id' });
    }

    const userIds = rows.map(row => row.user_id);
    res.status(200).json(userIds);
  } catch (error) {
    console.error('Database query error: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
