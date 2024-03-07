const mysql = require('mysql')
const db = mysql.createConnection({
    host:"roundhouse.proxy.rlwy.net",
    user:"root",
    password:"f4baFDAdbheGCdf6dGgD2d6gGE2F-A-4",
    port:15817,
    database:"railway"
})

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

module.exports= db,allowCrossDomain