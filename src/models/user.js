const mysql = require('mysql');
connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'news_portal'
});

let userModel = {};

userModel.getUsers = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM news ORDER BY id_news',
            (err, rows) => {
                if(err) throw err
                else callback(null, rows)
            }

        )
    }
};

userModel.insertUser = (userData, callback) => {
    if(connection){
        connection.query(
            'INSERT INTO news SET ?', userData, (err, rows) => {
                if(err) throw err
                else callback(null, {'insertId': rows.insertId})
            }
        )
    }
}

userModel.updateUser = (userData, callback) => {
    if(connection){
        const sql = `
            UPDATE news SET 
            title = ${connection.escape(userData.title)},
            news = ${connection.escape(userData.news)} 
            WHERE id_news = ${connection.escape(userData.id_news)}
        `
        connection.query(
            sql, (err, rows) => {
                if(err) throw err
                else callback(null, {"msg":"success"});
            }
        )
    }
}

userModel.deleteUser = (id_news, callback) => {
    if(connection) {
        let sql = `
        SELECT * FROM news 
        WHERE id_news = ${connection.escape(id_news)}
    `
    
    connection.query(
        sql, (err, row) => {
            if(row) {
                let sql =   `
                DELETE FROM news 
                WHERE id_news = ${connection.escape(id_news)}`
                connection.query(sql, (err, rows) => {
                    if(err) throw err
                    else {
                        callback(null, {msg: 'deleted'})
                    }
                })
            } else {
                callback(null, {
                    msg: 'not exist'
                })
            }
        }
    )}
}

module.exports = userModel;