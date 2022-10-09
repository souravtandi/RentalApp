import React, { useState } from 'react'
import { API_URL } from '../config'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [msg, setMsg] = useState()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const Login = (event) => {
        event.preventDefault();

        const request = { email, password }

        axios.post(`${API_URL}` + "/login", request)
            .then((data) => {
                if(data){
                    setMsg("Login successfully!")
                    localStorage.setItem("token", data.data.result.token)
                    localStorage.setItem("id", data.data.result.id)
                    dispatch({type: "APISUCCESS", payload: data.data.result.user})
                    navigate("/")
                }
             })
            .catch((err) => {
                dispatch({type: "APIERROR"})
            })
    }

    return (
        <div className='container'>
            <h4>{msg}</h4>
            <h3 className='text-center mt-4'>Login Here</h3>
            <form onSubmit={(event) => Login(event)} className='w-50 mx-auto'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={(event) => setEmail(event.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={(event) => setPassword(event.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className='d-grid mt-3'>
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>

            </form>
        </div>
    )
}

export default Login