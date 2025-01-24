const mongoose = require('mongoose');

const postSchema = new mongoose.Schema ({

    title: {
        type: String,
        required: true,
    },
    content: {
        type:String,
        required: true,
    },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true, 
    },
    comments: [
        {user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        comment: {type: String, required: true},
        createdAt: {type: Date, default: Date.now},
        },
    ],
    likes: [
        {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    ] 
    

}, {timestamps: true}

);
const Post = mongoose.model('Post', postSchema);
module.exports = Post;