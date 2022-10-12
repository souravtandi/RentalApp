import React, { useEffect, useState } from 'react'
import { API_URL } from '../config'
import axios from 'axios';

function Profile() {

  const [fname, setFname] = useState()
  const [lname, setLname] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()

  const [loading, setLoading] = useState(false);

  const getProfile = async (userId) => {
    const profileData = await axios.get(`${API_URL}/user/profile/${userId}`)
    setFname(profileData.data.user.fname)
    setLname(profileData.data.user.lname)
    setEmail(profileData.data.user.email)
    setPhone(profileData.data.user.phone)
    setLoading(false);
  }

  useEffect(() => {
    const userId = localStorage.getItem("id")
    getProfile(userId)
    setLoading(true);
  }, [])


  return (
    <div>
      {loading ? <div className='text-center mt-5'>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> : ''}
      <div style={{ backgroundColor: "#ffe6e6" }}>
        <div className="container py-5">

          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                    className="rounded-circle img-fluid" style={{ width: "150px" }} />
                  <h5 className="my-3">{fname} {lname}</h5>
                  <p className="text-muted mb-1">Full Stack Developer</p>
                  <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                  <div className="d-flex justify-content-center mb-2">
                    <button type="button" className="btn btn-outline-primary ms-1">Contact</button>
                    <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{fname} {lname}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{phone}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">Bay Area, San Francisco, CA</p>
                    </div>
                  </div>
                  <hr />
                    <div className="col-sm-9">
                      <button className="btn btn-primary">Edit Profile</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile