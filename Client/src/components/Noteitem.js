import React, { useContext } from 'react'
import NoteContext from '../Context/NotesUser/NoteContext';


 const Noteitem = (props) => {

    const context = useContext(NoteContext);

    const { deleteNote } = context;

    const { note, updateNote } = props;
    const box_shadow = {
        padding:'20px',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
    }
    return (
        <div className='col-md-4'>
            <div className='card my-3' style={box_shadow}>
                <div className='card-body'>
                    <div className='d-flex align-items-center'>
                    <h5 className='card-title' style={{ color: "#33006F"}}>{note.title}</h5>
                    </div>
                    <p className='card-text'>{note.description}</p>
                    <i className="far fa-trash-alt mx-2"  style = {{cursor:'pointer'}}onClick={() => { deleteNote(note._id) }}></i>
                    <i className="far fa-edit mx-2" style = {{cursor:'pointer'}} onClick={() => { updateNote(note) }}></i>
                </div>
            </div>
        </div>
    )
}
export default Noteitem