var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title: String,
    content: String,
    viewCounts: Number,       //浏览次数
    commentsCounts: Number,   //评论次数
    time: String,
    coverImg: String,         //封面图片
    author: String,
    tags: Array,
    isPublish: Boolean         //是否发布
});