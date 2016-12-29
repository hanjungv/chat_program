var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
    userName: String,
    message: {type:String, default:"hello"},
    published_date:{type:Date, default:Date.now}
})

module.exports = mongoose.model('chat',chatSchema);
