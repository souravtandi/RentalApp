import axios from 'axios'
import React, { useState } from 'react'
import { API_URL } from '../config'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

function Register() {

  const [ fname, setFname ] = useState()
  const [ lname, setLname ] = useState()
  const [ email, setEmail ] = useState()
  const [ password, setPassword ] = useState()
  const [ phone, setPhone ] = useState()

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()


  const registerUser = (event) => {
    event.preventDefault();
    const request = { fname, lname, email, password, phone };
    setLoading(true);

    axios.post(`${API_URL}/register`, request)
    .then((data)=> {
      if(data){
        setLoading(false);
        Swal.fire({
          icon: 'info',
          title: 'Register successfully...',
          text: 'We will email you once Refresh is completed!',
        });
        navigate("/login")
      }
    })
    .catch((err)=>{
      setLoading(false);
      Swal.fire({
        icon: 'info',
        title: 'Registration failed !!!',
        text: 'Please Register again!',
      });
    })
  }

  return (
    <div className='container' style={{backgroundColor: "#ffe6e6"}}>
      {loading ? <div className='text-center mt-5'>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> : ''}
            <h3 className='text-center pt-3 mt-2'>Register Here</h3>
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