const db = require('../config/db');

exports.saveUser = (req, res) => {
    const user = req.body;
    const checkUserSql = 'SELECT * FROM user WHERE iduser = ?';
    const insertUserSql = 'INSERT INTO user (iduser, name, is_admin) VALUES (?, ?, ?)';
    const values = [user.iduser, user.name, user.is_admin];

    db.query(checkUserSql, [user.iduser], (err, result) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }

        if (result.length > 0) {
            // 사용자가 이미 존재하는 경우
            return res.json({ status: 'success', message: 'User already exists' });
        }


    db.query(insertUserSql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }
        res.json({ status: 'success', message: 'User saved successfully' });
    });
});
};