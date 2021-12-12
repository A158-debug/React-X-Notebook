import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import pic3 from '../pic3.png'

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const json = await response.json();
        console.log(json)

        if (json.success) {
            //Save the auth token and redirect 
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert("Account created succcessfully", 'success')

        } else {
            props.showAlert("Invalid Credentials", 'danger')
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const sign = {
        color: "white",
        backgroundColor: '#FF003F',
        backgroundImage: 'linear-gradient(160deg, #0093E9 0 %, #80D0C7 100 %)',
        padding: '10px',
        borderRadius: '3px'
    }
    const signborder = {
        padding: '20px',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
       
    }
  
    return (
        <div className="container-fluid" >
            <div className="row">
                <div className="col-md-5">
                    <div style={signborder}>
                        <div className="text-center my-2">
                            <h4 type='submit' style={sign}> Join us Today !</h4>
                            <p>Enter your email and password to register</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" onChange={onChange} name="password" id="password" />
                            </div>
                            <div className="d-grid gap-2 mt-5">
                                <button type="submit" className="btn btn-outline-danger">Sign up</button>
                            </div>

                        </form>
                    </div>
                </div>
                <div className="col-md-7">
                    <img src={pic3} alt="" srcset="" className='img-fluid' />
                </div>
            </div>
        </div>
    )
}

export default Signup
