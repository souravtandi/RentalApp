import React, { useEffect, useState } from 'react'
import { API_URL } from '../config'
import axios from 'axios';
import { Link } from 'react-router-dom';


function MyTenants() {

  const [tenants, setTenants] = useState([])

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  };

  const getAllTenants = async () => {
    const tenantsData = await axios.get(`${API_URL}/myTenants`, CONFIG_OBJ)
    setTenants(tenantsData.data.allTenants)
  }

  useEffect(() => {
    getAllTenants()
  }, [])

  return (
    <div className='container my-3'>
      <h3 className='text-center my-3 shadow' style={{ color: "F62459" }}>My Tenants</h3>
      <div>
        {tenants.map((tenant) => {
          return (<div className="card mb-2">
            <h5 class="card-header">{tenant.user.fname} {tenant.user.lname}</h5>
            <div className="card-body">
              <div key={tenant.user._id}>
                <p><b>Email:</b> {tenant.user.email}</p>
                <p><b>Phone:</b> {tenant.user.phone}</p>
                <p><b>Adddress:</b></p>
              </div>
              <hr />
              <div key={tenant.property._id}>
                <h5 className="card-title">Property Details</h5>
                <p className="card-text"><b>Type:</b> {tenant.property.title}</p>
                <p className="card-text"><b>Address:</b> {tenant.property.description}</p>
                <a href="#" className="btn btn-primary">View rental details</a>
              </div>
            </div>
          </div>)
        })
        }
      </div>
    </div>
  )
}

export default MyTenants