import React, { useEffect, useState } from 'react'
import { API_URL } from '../config'
import axios from 'axios';
import { Link } from 'react-router-dom'

function Profile() {

  const [fname, setFname] = useState()
  const [lname, setLname] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [profileImg, setProfileImg] = useState()
  const [userId, setUserId] = useState()
  const [loading, setLoading] = useState(false);

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  };

  const getProfile = async (userId) => {
    const profileData = await axios.get(`${API_URL}/user/profile/${userId}`, CONFIG_OBJ)
    setFname(profileData.data.user.fname)
    setLname(profileData.data.user.lname)
    setEmail(profileData.data.user.email)
    setPhone(profileData.data.user.phone)
    setProfileImg(profileData.data.user.profileImgName)
    setLoading(false);
  }

  useEffect(() => {
    setUserId(localStorage.getItem("id"))
    getProfile(localStorage.getItem("id"))
    setLoading(true);
  }, [])


  return (
    <div>
      {loading ? <div className='text-center mt-5'>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> : ''}
      <div>
        <div className="container py-5">

          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img src={`${API_URL}/files/${profileImg}`} alt="avatar"
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
                  <Link to={`/user/profile/${userId}`} className="btn btn-warning text-uppercase">
                    <i className="fa-solid fa-pen-to-square me-1"></i>Edit
                  </Link>
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