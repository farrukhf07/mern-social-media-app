const mongoose = require('mongoose');
const {Schema} = mongoose;

const PostSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    caption:{
        type: String,
        default: ""
    },
    media:[
        {
            type: String // image video urls
        }
    ],
    like:[
        {
            userId: {
                type: String,
                ref: 'user'
            },
            username: {
                type: String
            },
            userpic: {
                type: String
            }
        }
    ],
    likesCount: {
        type: Number,
        default: 0
    },
    comments:[
        {
            userId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            username: {
                type: String
            },
            userpic: {
                type: String
            },
            text:{
                type: String,
                required: true
            },
            createdAt:{
                type: Date,
                default: Date.now
            }
        }
    ],
    commentCount: {
        type: Number,
        default: 0
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    isReported:{
        type: Boolean,
        default: false
    }
}
);

module.exports = mongoose.model('posts', PostSchema);