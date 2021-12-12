const express = require('express')
const { body, validationResult } = require('express-validator');
const NotesSchema = require('../models/Notes');
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');

//ROUTER 1: Get all the notes using get "api/notes/getuser"
//fetchuser is a middleware
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await  NotesSchema.find({ user: req.user.id })
        res.json(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE Add a note using POST "api/notes/addnote" 

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 character').isLength({ min: 5 }),],
    
    async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new NotesSchema({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()
        res.json(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 3 : update an existing note using put "/api/notes/updatenotes"

router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //Update an existing note using
        const updateNote = {};
        if (title) { updateNote.title = title }
        if (description) { updateNote.description = description }
        if (tag) { updateNote.tag = tag }

        //Find the note to be updated and update it
        let note = await NotesSchema.findById(req.params.id);
        if (!note) {
            return res.status(400).send("Not Found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed !")
        }

        note = await NotesSchema.findByIdAndUpdate(req.params.id, { $set: updateNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error");
    }
})


//Route :4 Delete an existing Note using DELETE "/api/notes/deletenote"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //find a note to be deleted
        let note = await NotesSchema.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not Found");
        }
        //Allow deletion only if user own his note
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed");
        }
        note = await NotesSchema.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted successfully",note:note });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router