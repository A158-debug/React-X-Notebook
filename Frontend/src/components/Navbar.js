import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    const navcolor = {
        backgroundColor: '#042743',
        
    }


let location = useLocation()
return (
    <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark " style={navcolor}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">i-Notebook</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex">
                        <Link className="btn btn-outline-light mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-outline-light mx-1" to="/signup" role="button">Signup</Link>
                    </form> : <button type='button' className="btn btn-outline-light" onClick={handleLogout}> Logout </button>}
                </div>
            </div>
        </nav>
    </div>
)
}
export default Navbar
