import './App.css';
import NoteState  from './Context/NotesUser/NoteState'
import  Navbar  from './components/Navbar';
import  Home  from './components/Home';
import  Login  from './components/Login';
import  Signup  from './components/Signup';
import  About  from './components/About';
import  Alert  from './components/Alert';
import {useState} from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000)
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar alerts={alert} />
          <Alert  />
          <div className='container my-3'>
            <Routes>
              <Route path="/" element = {<Home showAlert = {showAlert} />}/>
              <Route path="/about" element = {<About showAlert = {showAlert} />}/>
              <Route path="/login" element = {<Login showAlert = {showAlert} /> }/> 
              <Route path="/signup" element = {<Signup  showAlert = {showAlert}/>}/>  
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

