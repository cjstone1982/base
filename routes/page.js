db = require('../db/db')
var Post = db.model("Post")

exports.home = function(req, res, next) {
	Post.find({},function(err,posts){
		res.render('templates/index', { 
    		title: '首页',
    		posts:posts,
    		user:req.session.user,
    	})
	})
}

