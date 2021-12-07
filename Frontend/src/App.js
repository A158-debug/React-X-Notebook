import './App.css';
import NoteState  from './Context/NotesUser/NoteState'
import  Navbar  from './components/Navbar';
import  Home  from './components/Home';
import  Login  from './components/Login';
import  Signup  from './components/Signup';
import  About  from './components/About';
import  Alert  from './components/Alert';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
    My name is Abhishek Kumar
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="create and save your personal notes" />
          <div className='container my-3'>
            <Routes>
              <Route path="/" ><Home /></Route>
              <Route path="/about" ><About /></Route> 
              <Route path="/login"><Login /></Route>  
              <Route path="/signup"><Signup /></Route>  
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
