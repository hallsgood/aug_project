const mysql = require('mysql')
const connection = mysql.createPool({
    host:'localhost',
    port:3306,
    user:'root',
    password:'1234',
    database:'rdb',
    dateStrings:true,
})

module.exports = connection