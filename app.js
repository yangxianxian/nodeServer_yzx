const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
const {get,set} = require('./db/myredis')

const getPostData = ((req) => {
    return new Promise((resolve,reject) => {
        if(req.method !== 'POST') {
            resolve({})
            return
        }
        if(req.headers["content-type"] !== "application/json") {
            resolve({})
            return
        }
        
        let postData = ''
        req.on('data',(chunk) => {
            postData += chunk.toString()
        })
        req.on('end',() => {
            if(!postData){
                resolve({})
            }else {
                resolve(JSON.parse(postData))
            }
        })
    })
})

// let SESSION_DATA={}//全部session存储

const requestDetail= (req,res) => {
    res.setHeader('content-type','application/json')
    //获取路径
    const url = req.url
    req.path = url.split('?')[0]

    //解析query
    req.query = querystring.parse(url.split('?')[1])
     //cookie解析
     let cookieSTR = req.headers.cookie || ''
     req.cookie = cookieSTR ? querystring.parse(cookieSTR.replace(/\s*;\s*/g,'&')) : '';

     //session解析
     let userId = req.cookie.userid
     req.sessionId = userId
     let needSetCookie = false //是否需要设置cookie，当cookie中不存在userid时就需要设置
     if(!userId) {
         needSetCookie = true
         userId = `${Date.now()}_${Math.random()}`
         set(userId,{})
     }
     get(userId).then(sessionData => {
         if(!sessionData) {
             req.session = {}
             set(userId,{})
         }else {
             req.session = sessionData
         }
         return getPostData(req)
     }).then(postData => {
        req.body = postData
        //处理blog路由
        
        let blogData = handleBlogRouter(req,res)
        if(blogData) {
            blogData.then(result => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${setCoolieExprise()}`)
                }
                res.end(JSON.stringify(result))
            })
            return
        }
        
        //处理user路由
        let userData = handleUserRouter(req,res)
        if(userData) {
            userData.then(result => {
                res.end(JSON.stringify(result))
            })
            return
        }

        //处理error
        res.writeHead(404,{"Content-type":"text/plain"})
        res.write('404 NOT FOUNT\n')
        res.end()
    })
}
//设置cookie过期时间
//res.setHeader('Set-Cookie',`username=${result[0].username}; path=/; httpOnly; expires=${setCoolieExprise()}`)
const setCoolieExprise = () => {
    let nowTime = new Date()
    nowTime.setTime(nowTime.getTime() + (24*60*60*1000))
    return nowTime.toUTCString()
}
module.exports = requestDetail