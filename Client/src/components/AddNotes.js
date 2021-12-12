import React, { useContext, useState } from 'react'

import NoteContext from '../Context/NotesUser/NoteContext'
import notes from '../notes.png'

const AddNotes = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", });

    const handleSubmit = (e) => {
        e.preventDefault(); addNote(note.title, note.description, note.tag)
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "" })

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const label = {
        color:'#1d1160',
        fontWeight:'bold'
    }



    return (
        <div className="container my-4">
            <h1 className='my-2' style={{ color: "#33006F", fontWeight:'bold' }}>ADD YOUR PERSONAL NOTES HERE <i class="fas fa-book-open"></i></h1>
            <div className="row">
                <div className="col-md-6">
                    <form className="mt-5">
                        {/* For Titile */}
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label" style={label}>Title</label>
                            <input type="text" className="form-control" id='title' name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} />
                        </div>

                        {/* for Desciption */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label" style={label}>Description</label>
                            <textarea type="text" rows='5' className="form-control id='description" name="description" value={note.description} onChange={onChange} ></textarea>
                        </div>

                        {/* for tag */}
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label" style={label}>Tag</label>
                            <input type="text" className="form-control" id='tag' name='tag' value={note.tag} onChange={onChange} />
                        </div>

                        <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-outline-primary" onClick={handleSubmit}>Add Note</button>
                    </form>
                </div>
                <div className="col-md-6">
                <img src={notes} alt="" srcset="" className='img-fluid' />
                </div>

            </div>
        </div>
    )
}

export default AddNotes
