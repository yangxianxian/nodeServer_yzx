const {successModul,errorModul} = require('../modul/resMoudul')

const {checkLogin} = require('../controller/user')
const {set} = require('../../db/myredis')

const handleUserRouter = ((req,res) => {
    //登录
    if(req.method == 'POST' && req.path == "/api/user/login") {
        const {username,password} = req.body
        // const userName = req.query.username || ''
        // const password = req.query.password || ''
        return checkLogin(username,password).then(result => {
            console.log(result,333333)
            if(result.length > 0) {
                req.session.username = result[0].username
                req.session.password = result[0].password
                set(req.sessionId,req.session)
                res.setHeader('Set-Cookie',`username=${result[0].username}; path=/; httpOnly; expires=${setCoolieExprise()}`)
                return new successModul('登录成功')
            }else {
                return new errorModul('登录失败')
            }
        })
        
    }

    
})

//设置cookie过期时间
const setCoolieExprise = () => {
    let nowTime = new Date()
    nowTime.setTime(nowTime.getTime() + (24*60*60*1000))
    return nowTime.toUTCString()
}

module.exports = handleUserRouter