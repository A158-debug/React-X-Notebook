const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: {
        required: true,
        type: String,
    },
    desciption: {
        required: true,
        type: String,

    },
    tag: {
        type: String,
        default: "General"

    },
    Date: {
        type: Date,
        default: Date.now
        // default :Date.now()   don;t put paranthesis here our run when we call them
    },

});

module.exports = mongoose.model('NotesSchema', NoteSchema);
// 1st paramter is schema name and other is schema which you want to use