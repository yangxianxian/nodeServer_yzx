const mysql = require('mysql')

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    port:'3306',
    database:'myblog'
})

function sqlQuery (sql) {
    return new Promise((resolve,reject) => {
        con.query(sql,(err,result) => {
            if(err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

module.exports = {
    sqlQuery
}