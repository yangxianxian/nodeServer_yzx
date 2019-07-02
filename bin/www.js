const http = require('http')
const querystring = require('querystring');
const requestDetail = require('../app')

const server = http.createServer(requestDetail)

server.listen(8000)