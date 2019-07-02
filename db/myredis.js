const myredis = require('redis');

const redisServer = myredis.createClient('6379','127.0.0.1');
redisServer.on('error',err => {
    console.log(err)
})

function set(key,value) {
    if(typeof value == 'object') {
        value = JSON.stringify(value)
    }
    redisServer.set(key,value,myredis.print)
}

function get(key) {
    return new Promise((resolve,reject) => {
        redisServer.get(key,(err,data) => {
            if(err) {
                reject(err)
                return
            }
            if(data == null) {
                resolve({})
                return
            }
            try {
                resolve(JSON.parse(data))
            } catch (error) {
                resolve(data)
            }
        })
    })
}

module.exports = {
    set,get
}