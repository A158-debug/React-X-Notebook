import React, { useContext, useState } from 'react'

import noteContext from '../Context/NotesUser/noteContext'

export const AddNotes = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", });

    const handleSubmit = (e) => {
        e.preventDefault();addNote(note.title, note.description,note.tag)
        addNote(note.title,note.description,note.tag);
        setNote({title: "", description: ""})

    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name] :e.target.value})
    }

    return (
        <div className="container my-2">
            <h2>Add a Note</h2>
            <form>
                {/* For Titile */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id='title' name ='title' aria-describedby="emailHelp" onChange = {onChange}/>
                </div>

                {/* for Desciption */}
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control id='description" name="description"  onChange = {onChange} />
                </div>

                {/* for tag */}
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id ='tag' name = 'tag' onChange = {onChange} />
                </div>

                <button type="submit" className="btn btn-primary" onclick={handleSubmit}>Add note</button>
            </form>
        </div>
    )
}
