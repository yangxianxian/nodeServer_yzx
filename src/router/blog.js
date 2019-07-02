const {successModul,errorModul} = require('../modul/resMoudul')
const {getList,getDetail,newBlog,updateData,delBlog} = require('../controller/blog')




const handleBlogRouter = ((req,res) => {
    const method = req.method
    
    //获取博客列表
    if(method == 'GET' && req.path == "/api/blog/list") {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getList(author,keyword)
        return getList(author,keyword).then(result => {
            return new successModul(result)
        })
        
    }

    //获取博客详情
    if(method == 'GET' && req.path == "/api/blog/detail") {
        const id = req.query.id || ''
        // const detailInfor = getDetail(id)
        return getDetail(id).then(result => {
            return new successModul(result[0])
        })
    }
    //新建博客
    if(method == 'POST' && req.path == "/api/blog/new") {
        return newBlog(req.body).then(result => {
            console.log(result)
            if(result.insertId > 0) {
                return new successModul('新建博客成功')
            }
        })
    }

    //更新博客
    if(method == 'POST' && req.path == "/api/blog/update") {
        const id = req.query.id || ''
        return updateData(id,req.body).then(result => {
            if(result.affectedRows > 0) {
                return new successModul('更新成功')
            }else {
                return new errorModul('更新失败')
            }
        })
    }

    //删除博客
    if(method == 'POST' && req.path == "/api/blog/del") {
        const id = req.query.id || ''
        return delBlog(id).then(result => {
            if(result.affectedRows > 0) {
                return new successModul('删除成功')
            }else {
                return new errorModul('删除失败')
            }
        })
        
    }
    
})

module.exports = handleBlogRouter