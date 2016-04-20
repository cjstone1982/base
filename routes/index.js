var express = require('express')
var router = express.Router()
var db=require('../db/db')
var rest=require('./rest')
var page=require('./page')
var admin=require('./admin')
var account=require('./account')

//账户account
router.post('/register', account.register)
router.post('/login', account.login)
router.post('/profile', account.profile)
router.post('/login_out', account.loginOut)

//前台
//渲染页面page
router.get('/', page.home)

//增删改查rest
router.route('/post')
	.get(rest.find)
	.post(rest.insert)
	.put(rest.update)
	.delete(rest.delete)

// GET（SELECT）：从服务器取出资源（一项或多项）。
// POST（CREATE）：在服务器新建一个资源。
// PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
// PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
// DELETE（DELETE）：从服务器删除资源。

//后台
//渲染页面
router.get('/admin', admin.home)

module.exports = router

