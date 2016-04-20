db = require("../db/db.js")
var User = db.model("User")

exports.register = function(req, res) {
	var data={
		username: req.body.username,
        email:    req.body.email,
        password: req.body.password,
        createAt: new Date(),
	}
	User.create(data,function(err){
		if(err) return res.send('注册失败')
		res.send('注册成功')
	})
}

exports.login = function(req, res) {
	User.findOne({'email':req.body.email}).exec(function(err,user){
		if(!user){
			return res.send('没有这个用户')
		}
		if(req.body.email!=user.email){
			return res.send('请输入正确的邮箱')
		}
		if(req.body.password!=user.password){
			return res.send('密码错误')
		}else{
			req.session.user=user 
			// cookie session设置 //一周//设置cookie过期时间，就是每登陆一次，增加一周
			var cookieDate = 604800000 //1周
			req.session.cookie.expires = new Date(Date.now() + cookieDate)
			req.session.cookie.maxAge = cookieDate
	    	res.end('登录成功')
		}
	})
}

exports.loginOut=function(req,res){
	console.log('loginOut');
	req.session.user=null
	res.send('已登出')
}

exports.profile=function(req,res){
	var data={
		'profile.name':req.body.name,
		'profile.department':req.body.department,
		'profile.jobtitle':req.body.jobtitle
	}
	User.findOneAndUpdate({email:req.session.user.email},{$set:data}, function(err,result){
		if(err) return res.send('失败')
		res.send('设置成功'+result)
	})
}


