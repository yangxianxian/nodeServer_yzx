const {sqlQuery} = require('../../db/mysql')
const checkLogin = ((userName,password) => {
    if(userName && password) {
        let sql = `select username,password from users where username='${userName}' and password='${password}';`
        return sqlQuery(sql)
    }
})

module.exports = {
    checkLogin
}