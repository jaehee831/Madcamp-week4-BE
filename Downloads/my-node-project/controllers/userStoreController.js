const db = require('../config/db');

exports.saveUserStore = async (req, res) => {
    const { user_id, store_id } = req.body;

    if (!user_id || !store_id) {
        return res.status(400).json({ error: 'user_id and store_id are required' });
    }

    const query = 'INSERT INTO user_store (user_id, store_id) VALUES (?, ?)';
    try {
        const db = req.db;
        const [result] = await db.query(query, [user_id, store_id]);
        res.status(200).json({ message: 'User store information saved successfully' });
    } catch (error) {
        console.error('Error inserting into DB: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.checkUserRegisterStore = async (req, res) => {
    const { user_id } = req.body;
  
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }
  
    const query = 'SELECT store_id FROM user_store WHERE user_id = ?';
    try {
      const db = req.db; // 요청 객체에서 데이터베이스 연결 객체를 가져옵니다
      const [rows] = await db.query(query, [user_id]);
      if (rows.length === 0) {
        res.json({ message: 'No store registered' });
      } else {
        const storeIds = rows.map(row => row.store_id);
        res.json({ storeIds });
      }
    } catch (error) {
      console.error('Database query error: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.getStoreList = async (req, res) => {
    const { user_id } = req.body;
    console.log('Received user_id:', user_id); // 디버깅 메시지 추가
  
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }
  
    const query = 'SELECT store_id FROM user_store WHERE user_id = ?';
    try {
      const db = req.db; // 요청 객체에서 데이터베이스 연결 객체를 가져옵니다
      const [rows] = await db.query(query, [user_id]);
      console.log('Query result:', rows); // 디버깅 메시지 추가
      if (rows.length === 0) {
        res.json({ message: 'No store registered' });
      } else {
        const storeIds = rows.map(row => row.store_id);
        res.json({ storeIds });
      }
    } catch (error) {
      console.error('Database query error: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.deleteStore = async (req, res) => {
    const { user_id, store_id } = req.body;

    if (!user_id || !store_id) {
        return res.status(400).json({ error: 'user_id and store_id are required' });
    }

    // Check if the user is an admin
    const adminQuery = 'SELECT is_admin FROM user WHERE iduser = ?';
    try {
        const db = req.db;
        const [adminRows] = await db.query(adminQuery, [user_id]);
        if (adminRows.length === 0 || adminRows[0].is_admin !== 1) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Delete the store
        const deleteQuery = 'DELETE FROM user_store WHERE user_id = ? AND store_id = ?';
        await db.query(deleteQuery, [user_id, store_id]);
        res.status(200).json({ message: 'Store deleted successfully' });
    } catch (error) {
        console.error('Database query error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getStoreNameList = async (req, res) => {
    const { store_id } = req.body;

    if (!store_id) {
        return res.status(400).json({ error: 'store_id is required' });
    }

    const query = 'SELECT name FROM stores WHERE idstores = ?';
    try {
        const db = req.db;
        const [rows] = await db.query(query, [store_id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Store not found' });
        } else {
            res.json({ store_name: rows[0].name });
        }
    } catch (error) {
        console.error('Database query error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};