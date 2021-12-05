import './App.css';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
// import { Login } from './components/Login';
// import { Signup } from './components/Signup';
import { About } from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
