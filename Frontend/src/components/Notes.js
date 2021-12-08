import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/NotesUser/NoteContext';
import Noteitem from './Noteitem';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const context = useContext(NoteContext);
    let navigate = useNavigate()
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        } else {
            navigate('/login')
        }
        //eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag
        })

    }
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click()

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const label = {
        color: '#1d1160',
        fontWeight: 'bold'
    }

    return (
        <>  
            <AddNotes />
            <button type="button" ref={ref} style={{ display: 'none' }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo model
            </button>

            <div className="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" style={{ color: "#33006F", fontWeight: 'bold' }}>Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                {/* For Titile */}
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label" style={label}>Title</label>
                                    <input type="text" className="form-control" id='etitle' name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required />
                                </div>

                                {/* for Desciption */}
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label" style={label}>Description</label>
                                    <textarea rows='5' type="text" className="form-control id='edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required ></textarea>
                                </div>

                                {/* for tag */}
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label" style={label}>Tag</label>
                                    <input type="text" className="form-control" id='etag' name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-outline-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <h2 style={{ color: "#FF0000", fontWeight: 'bold' }} className="my-2">YOUR NOTES </h2>
                <div className="container mx-2">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>

        </>
    )
}

export default Notes
