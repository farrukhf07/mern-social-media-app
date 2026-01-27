const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type: String,
        default:""
    },
    postCount:{
        type: Number,
        default: 0
    },
    following:[{
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
    }],
    followingCount:{
        type: Number,
        default: 0
    },
    followers:[{
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
    }],
    followersCount:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('user', UserSchema);