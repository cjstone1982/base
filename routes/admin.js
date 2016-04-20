exports.home = function(req, res, next) {
    res.render('admin/index', {
    	layout: 'admin',
    	title: '后台管理' 
    })
}


