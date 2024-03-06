const mysql = require('mysql')
const db = mysql.createConnection({
    host:"monorail.proxy.rlwy.net",
    user:"root",
    password:"HeBG4b1B-421g3bB-3HHA62EGg5gF-1c",
    port:10335,
    database:"railway"
})

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

module.exports= db,allowCrossDomain