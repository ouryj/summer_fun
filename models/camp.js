 let mongoose = require('mongoose');
 //camp model 
 let campSchema = new mongoose.Schema({
    place: String,
    image: String,
    funtype: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})
let Camp = mongoose.model("Camp", campSchema);
module.exports = Camp;