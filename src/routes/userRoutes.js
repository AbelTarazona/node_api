const User = require('../models/user')

module.exports = function (app) {

    app.get('/users', (req, res) => {
        User.getUsers((err, data) => {
            res.json(data);
        });
    });

    app.post('/users', (req, res) => {
        const userData = {
            title: req.body.title,
            news: req.body.news
        };

        User.insertUser(userData, (err, data) => {
            if (data && data.insertId) {
                res.json({
                    success: true,
                    msg: 'Dato insertado',
                    data: data
                })
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                })
            }
        })
    });

    app.put('/users/:id_news', (req, res) => {
        const userData = {
            id_news: req.params.id_news,
            title: req.body.title,
            news: req.body.news
        };
        User.updateUser(userData, (err, data) => {
            if(data && data.msg){
                res.json(data)
            } else {
                res.json({
                    success: false,
                    msg: 'error'
                })
            }
        })
    });

    app.delete('/users/:id_news', (req, res) => {

        User.deleteUser(req.params.id_news, (err, rows) => {
            if(rows && rows.msg === 'deleted' || rows.msg === 'not exist') {
                res.json({
                    success: true,
                    msg: 'bien'
                })
            }else {
                res.status(500).json({
                    msg: 'error'
                })
            }
        })
    });

}