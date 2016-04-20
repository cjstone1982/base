var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId=Schema.Types.ObjectId

module.exports = {
    User: {
        username:     { type: String, unique: true },
        email:        { type: String, unique: true, required: false },
        password:     { type: String },
        createAt:     { type: Date, default: Date.now },
        profile:{
            name:     { type: String },
            nickname: { type: String },  
            age:      { type: String },  
            sex:      { type: String },
            face:     { type: String },
            city:     { type: String },
            intro:    { type: String },
        },
        stats:{
            votes:    { type: Number },
            favs:     { type: Number },
        },
    },
    Post: {
        title:        { type: String },
        content:      { type: String },
        stats:{
            votes:    { type: Number },
            favs:     { type: Number },
        },
        createAt:     { type: Date, default: Date.now },
        author:       { type: ObjectId , ref: 'user'},
    },
    Collection:{ 
        title:        { type: String },
        intro:        { type: String },
        face:         { type: String },
        createAt:     { type: Date, default: Date.now },
        tags:         { type: Array },
        adminer:      { type: Array },
        stats:{
            up:       { type: Number },
            follow:   { type: Number },
            articles: { type: Number },
        },
        followed:     { type: Boolean },
        iscontribute: { type: Boolean },         
        ischeck:      { type: Boolean },
        author:       { type:ObjectId, ref: 'User'},
        contain:     [{ type:ObjectId, ref: 'Post'}],
    },
    Relation:{
        _id:          { type: ObjectId, ref: 'User'},
        followUser:  [{ type: ObjectId, ref: 'User'}],
        followZT:    [{ type: ObjectId, ref: 'Collection'}],
        followBM:    [{ type: ObjectId, ref: 'Post'}],
        followUP:    [{ type: ObjectId, ref: 'Post'}],
        followWD:    [{ type: ObjectId, ref: 'Question'}],
        followCM:    [{ type: ObjectId, ref: 'Comment'}],
        followAN:    [{ type: ObjectId, ref: 'Answer'}],
    }
}
