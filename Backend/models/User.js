const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique:true,
    },
    password:{
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
        // default :Date.now()   don;t put paranthesis here our run when we call them
    },

});
const UserSchema1 = mongoose.model('UserSchema',UserSchema);
UserSchema1.create()
module.exports = UserSchema1;
// 1st paramter is schema name and other is schema which you want to use