const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser')
const index = require('./app/routes/indexRoute')
app.listen(PORT)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
index(app)  //url이 들어오면 index로 가라


