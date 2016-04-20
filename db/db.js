var mongoose=require('mongoose')
var models=require('./models.js')
var settings=require('../settings')
var Schema=mongoose.Schema

for( var name in models ){
	mongoose.model( name , new Schema( models[ name ] ))
}

exports.model = function(name) {
    return mongoose.model( name )
}

exports.connect = function() {
    // return mongoose.connect("mongodb://localhost:27017/myTestDB")
    return mongoose.connect('mongodb://'+settings.host+':'+settings.dbport+'/'+settings.dbname+'')
}
