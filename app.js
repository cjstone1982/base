// 加载依赖库
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var bodyParser = require('body-parser')
var methodOverride = require('method-override');

// 加载路由控制
var routes = require('./routes/index')

// 创建项目实例
var app = express()

// 模板引擎
var exphbs=require('express-handlebars')
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//连接数据库
db = require('./db/db')
db.connect()

//缓存静态文件
var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html', 'css', 'png', 'gif', 'jpg', 'js', 'tpl'],
    index: false,
    maxAge: '604801000', //24小时*7
    redirect: true,
    // expires:'304805000',
    setHeaders: function(res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}
// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public'), options))
//http://www.expressjs.com.cn/guide/using-middleware.html#middleware.application

//启用gzip
var compression = require('compression');
app.use(compression());

//session服务端
app.use(session({
    secret: 'cjstone-dogs-1982',
    resave: false, //使每次请求都重写cookie
    saveUninitialized: false, //必须关闭才能使用缓存
    // key: 'stone-dogs', //cookie的名称 不设置就是id随机
    // cookie: {
    //     path: '/',
    //     httpOnly: true,
    //     secure: false, //https-enabled   必须要启用https
    //     maxAge: 2 * 604800000, //14天
    //     expires: new Date(Date.now() + 2 * 604800000)
    // },
    // store: new MongoStore({ //把session保存到数据库里 db:数据库名称
    //     host: settings.host,
    //     port: settings.dbport,
    //     db: settings.db
    // }),
}))

//自定义中间件
app.use(function (req, res, next) {
    // console.log('Time:', Date.now())
    next()
})
app.use('/user/:id', function (req, res, next) {
    // console.log('Request Type:', req.method)
    next()
})

// 定义icon图标
//app.use(favicon(__dirname + '/public/favicon.ico'))

// 定义日志和输出级别
app.use(logger('dev'))

// 定义数据解析器
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//添加PUT DELETE方法
app.use(methodOverride());

// 定义cookie解析器
app.use(cookieParser())

// 匹配路径和路由
app.use('/', routes)

//报错
app.use(function(req, res, next) {
    var err = new Error('这个页面可能已经被删除!')
    err.status = 404
    next(err)
})

app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        warn:'不好意思',
        message: '这个页面不见了，等等再访问吧',
    })
})

// 开发环境，500错误处理和错误堆栈跟踪
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500)
//     res.render('error', {
//       message: err.message,
//       error: err
//     })
//   })
// }

// 生产环境，500错误处理
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500)
//   res.render('error', {
//     message: err.message,
//     error: {}
//   })
// })


module.exports = app
