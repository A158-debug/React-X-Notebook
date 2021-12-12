const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,

    },
    tag: {
        type: String,
        default: "General"

    },
    date: {
        type: Date,
        default: Date.now
        // default :Date.now()   don;t put paranthesis here our run when we call them
    },

});

module.exports = mongoose.model('NotesSchema', NoteSchema);
// 1st paramter is schema name and other is schema which you want to use