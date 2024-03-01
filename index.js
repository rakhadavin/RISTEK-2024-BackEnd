const express = require('express')
const app = express()
const port = 3002
const bodyParser = require('body-parser')
const db = require("./connection")
const response = require("./response")
const cors = require('cors')

require('dotenv').config();
app.use(bodyParser.json());
// app.use(bodyParser.json)
app.use(cors({
    origin:"http://localhost:3000",
}))



app.get('/', (req, res) => {
    console.log("normal")
    res.send("ok")
})

app.get('/user', (req, res) => {
    console.log("User Getted")
    db.query("SELECT * FROM user", (error, result) => {
        console.log(result)
        console.log(error)
        console.log()
        // res.send("Succsessfully to get Users")
        // res.json(result)

        response(200, result, "Berhasil mendapatkan users", res)
    })
    // res.send("User Getted")
})


app.get('/user-record/:user_id', (req, res) => {
    var userId = req.params.user_id
    console.log(userId)
    db.query(`SELECT * FROM records WHERE user_id = ${userId}`, (error, result) => {
        console.log(result)
        console.log(error)
 

        response(200, result, "Berhasil mendapatkan record", res)
    })
    // res.send("User Getted")
})



app.post('/user', (req, res) => {
    console.log(req.body)
    var name = req.body.name
    var username = req.body.username
    var password = req.body.password
    var amount = req.body.amount
    var command = `INSERT INTO user (name,username,password,amount) VALUES ('${name}','${username}','${password}','${amount}')`
    db.query(command, (error, fields) => {
        if (error) throw error
        if (fields.affectedRows) {
            res.send(`Berhasil menambahkan data atas nama ${username}`)
        }
        // console.log(`fields : ${fields.affectedRows}`)
        console.log(username)
        })
    
})



app.post('/user-record', (req, res) => {
    console.log(req.body)
    var userId = req.body.userId
    var description = req.body.description
    var category = req.body.category
    var amount = req.body.amount
    var date = req.body.date

    
    var command = `INSERT INTO records (user_id,description,category,amount,dates) VALUES ('${userId}','${description}','${category}','${amount}','${date}')`
    db.query(command, (error, fields) => {
        if (error) throw error
        if (fields.affectedRows) {
            res.send(`Berhasil menambahkan record  ${description}`)
        }
        // console.log(`fields : ${fields.affectedRows}`)
        })
    
})


app.get("/record_identity/:userID", (req, res) => {
    var user_id = req.params.userID

    //req.params refers to items with a ':' in the URL and req.query refers to items associated with the '?'    var user_id = req.params.userID
    console.log(user_id)
    db.query(`SELECT * FROM record_identity WHERE user_id = '${user_id}' `, (error, result) => {
        console.log(result)
        console.log(error)
        console.log()
        console.log(result[0])
        response(200, result, "Berhasil mendapatkan users", res)
    })
})




app.get("/records/:recordID", (req, res) => {

    var record_id = req.params.recordID
    db.query(`SELECT * FROM records WHERE record_id = '${record_id}' `, (error, result) => {
        console.log(result)
        console.log(error)

        // res.send("Succsessfully to get Users")
        // res.json(result)

        response(200, result, "Berhasil mendapatkan users", res)
    })


})

app.listen(port, () => {
    console.log("SERVER ON")
    console.log(`Listening To This Port (${port})`)
})

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}