const express = require('express')
const app = express()
const port = process.env.PORT||3000
const bodyParser = require('body-parser')
const db = require("./connection")
const response = require("./response")
const cors = require('cors')
const { NULL } = require('mysql/lib/protocol/constants/types')

require('dotenv').config();
app.use(bodyParser.json());
// app.use(bodyParser.json)
app.use(cors({
    origin: "https://myfinance88.vercel.app",
}))



app.get('/', (req, res) => {
    console.log("normal")
    res.send("Successfully connected to the database.")
})

app.get('/user', (req, res) => {
    console.log("User Getted")
    db.query("SELECT * FROM USER", (error, result) => {

        console.log(error)
        console.log(result)
        res.send("Succsessfully to get Users -- > ",result) 
        // res.json(result)

        response(200, result, "Berhasil mendapatkan users", res)
    })
    // res.send("User Getted")
})


app.get('/user/:user_id', (req, res) => {
    const userid = req.params.user_id
    db.query(`SELECT * FROM USER WHERE id = '${userid}'`, (error, result) => {
            console.log(userid)
            console.log(error)
            console.log(result)
            error.fatal = true
            console.trace()
        // res.send("Succsessfully to get Users") 
        // res.json(result)

        response(200, result, "Berhasil mendapatkan users", res)
    })
    // res.send("User Getted")
})

app.put("/update-amount/:userID", (req, res) => {
    const amount= req.body.amount;
    var newAmount =0;
    const userID = req.params.userID
    const category = req.body.category
    const getUser = `SELECT * FROM user WHERE id = '${userID}'`
    db.query(getUser, (error, fields) => {
        if(error)throw error
        else if ((fields == [] || fields == NULL)){
            res.json("404 Not Found ")

        }
        else{
            console.log("Checking : ",fields)
            var Oldamount  = fields[0].amount
            if(category.toLowerCase() == "income"){
                newAmount = parseInt(amount) + parseInt(Oldamount)
                
            }else{
                newAmount = Oldamount-amount 

            }
            console.log(fields[0].amount)
            console.log("Error : ",error)
            const sqlCommand = `UPDATE user SET amount='${newAmount}' WHERE id = '${userID}'`
            db.query(sqlCommand, (error, fields) => {
                if(error)throw error
                else{
                    console.log(fields)
                }
        
            })
        }

    })

  console.log(userID)
  
    console.log(req.params)
    res.json(`Berhasil melakukan perubahan dengan id nomor ${userID}`)
  })


  app.put("/user-profile/:user_id", (req, res) => {
    const userID = req.params.user_id;
    const name = req.body.name;
    const username = req.body.username;
    const amount= req.body.amount;
    const image_link = req.body.image_link;
    console.log(req.body)
  
    const sqlCommand = `UPDATE user SET name ='${name}', username ='${username}', amount='${amount}', image='${NULL}' WHERE id = '${userID}'`
  console.log("berhasil masuk update")
    db.query(sqlCommand, (error, fields) => {
        if(error)throw error
        else{

            console.log(`{fields : '${fields}'}`)
        }
    })
  
    
  
  
  
    res.json(`Berhasil melakukan perubahan dengan id nomor ${userID}`)
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


app.get('/user-record/:user_id/:category', (req, res) => {
    console.log("record category getted")

    var userId = req.params.user_id
    var categories = req.params.category
    console.log(categories)
    db.query(`SELECT * FROM records WHERE user_id = '${userId}' AND category = '${categories}'`, (error, result) => {
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