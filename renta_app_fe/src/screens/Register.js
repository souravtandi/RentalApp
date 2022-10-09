import axios from 'axios'
import React, { useState } from 'react'
import { API_URL } from '../config'

function Register() {

  const [ fname, setFname ] = useState()
  const [ lname, setLname ] = useState()
  const [ email, setEmail ] = useState()
  const [ password, setPassword ] = useState()
  const [ phone, setPhone ] = useState()

  const [ msg, setMsg ] = useState()

  const registerUser = (event) => {
    event.preventDefault();
    const request = { fname, lname, email, password, phone };

    axios.post(`${API_URL}/register`, request)
    .then((data)=> {
      if(data){
        setMsg("Register successfully")
      }
    })
    .catch((err)=>{
      setMsg("Register Failed")
    })
  }

  return (
    <div className='container'>
      <h4>{msg}</h4>
            <h3 className='text-center mt-4'>Register Here</h3>
            <form onSubmit={(event) => registerUser(event)} className='w-50 mx-auto'>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input onChange={(event) => setFname(event.target.value)} type="text" className="form-control" id="firstName" />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input onChange={(event) => setLname(event.target.value)}  type="text" className="form-control" id="lastName" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={(event) => setEmail(event.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={(event) => setPassword(event.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone no.</label>
                    <input onChange={(event) => setPhone(event.target.value)} type="text" className="form-control" id="phone" />
                </div>
                <div className='d-grid mt-3'>
                    <button type="submit" className="btn btn-success">Register</button>
                </div>
            </form>
        </div>
  )
}

export default Register