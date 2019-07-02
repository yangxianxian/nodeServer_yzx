const {sqlQuery} = require('../../db/mysql')

const getList = ((author,keyword) => {
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql += `and author='${author}' `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime;`
    return sqlQuery(sql)
})

const getDetail = ((id) => {
    if(id) {
        let sql = `select * from blogs where id='${id}'`
        return sqlQuery(sql)
    }
})

const newBlog = ((postData) => {
    if(postData) {
        let {title,content,author} = postData
        let createTime = Date.now()
        let sql = `insert into blogs(title,content,createtime,author) values ('${title}','${content}',${createTime},'${author}');`
        console.log(333333,sql,22222)
        return sqlQuery(sql)
    }
})

const updateData = ((id,postData) => {
    if(id && postData) {
        let {title,content} = postData
        let sql = `update blogs set title='${title}',content='${content}' where id='${id}'`
        return sqlQuery(sql)
    }
})

const delBlog = ((id) => {
    if(id) {
        let sql = `delete from blogs where id = ${id}`
        return sqlQuery(sql)
    }
})

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateData,
    delBlog
}