db = require('../db/db')
var Post = db.model("Post")

exports.insert = function(req, res) {
    var data={
        title:req.body.title
    }
    Post.create(data, function(err) {
        if (err) return res.send('写入失败')
        console.log("写入成功")
        Post.find({}, function(err, result) {
            if (err) console.log("查询失败")
            res.send(result)
        })
    })
}

exports.delete = function(req, res) {
    Post.findOneAndRemove({'_id':req.body.id},function(err,result){
        if(err) return res.send('err')
        console.log(result);
        res.send('删除成功'+req.body.id)
    })
}

exports.update = function(req, res) {
    Post.findByIdAndUpdate(req.body.id,{ 
        $set:{'title': req.body.id },
        $inc:{'stats.votes':1}
    },
    function(err){
        if(err) return res.send('err')
        res.send({success:'修改成功'})
    })
}

exports.get = function(req, res) {
    res.send('get')
}

exports.find = function(req, res) {
    res.send('find')
}
