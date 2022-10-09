import React, { useEffect, useState } from 'react'
import { API_URL } from '../config'
import axios from 'axios';

function Profile() {

  const [ fname, setFname ] = useState()
  const [ email, setEmail ] = useState()
  const [ phone, setPhone ] = useState()

  const getProfile = async (userId) => {
    const profileData = await axios.get(`${API_URL}/user/profile/${userId}`)
    setFname(profileData.data.user.fname)
    setEmail(profileData.data.user.email)
    setPhone(profileData.data.user.phone)
  }

  useEffect(()=>{
    const userId = sessionStorage.getItem("id")
      getProfile(userId)
  }, [])


  return (
    <div className='container mt-5'>
      <div className="card w-50  mx-auto">
        <div className="card-body">
          <h5 className="card-title">User Profile</h5>
          <h6 className="card-subtitle mb-2 text-muted">Name: {fname}</h6>
          <a to="#" className="card-link">Email: {email}</a>
          <a to="#" className="card-link">Phone {phone}</a>
        </div>
      </div>
    </div>
  )
}

export default Profile