let mongoose = require('mongoose');

//comment model
let commentSchema = new mongoose.Schema({
    body: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
    
    
});
let Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;