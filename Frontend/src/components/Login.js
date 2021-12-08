import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import pic2 from '../pic2.jpg'



const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    let navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        console.log(json)

        if (json.success) {
            //Save the auth token and redirect 
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert("Log in successfully !", 'success')

        } else {
            props.showAlert("Invalid Credentials", 'danger')

        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });

    }
    const sign = {
        color: "white",
        backgroundColor: '#00008B',
        backgroundImage: 'linear-gradient(160deg, #0093E9 0 %, #80D0C7 100 %)',
        padding: '10px',
        borderRadius: '3px'
    };
    const signborder = {
        padding:'20px',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
    }

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-md-5 ">
                    <div style={signborder}>
                        <div className="text-center my-2">
                            <h4 type='submit' style={sign}> Sign in</h4>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-5">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>

                            <div className="my-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                            </div>
                            <div className="d-grid gap-2 mt-5">
                                <button type="submit" className="btn btn-outline-primary my-1">Sign in</button>
                                <button type="submit" className="btn btn-outline-dark my-1 ">Sign up</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-7">
                    <img src={pic2} alt="" srcset="" className='img-fluid' />
                </div>

            </div>
        </div>
    )
}

export default Login;

