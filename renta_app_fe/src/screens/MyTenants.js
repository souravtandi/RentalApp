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
            <h3>My Tenants List</h3>
            <div>
                {tenants.map((tenant) => {
                    return (<div className="row mb-3">
                    <div className="col-sm-6">
                      <div className="card" key={tenant.user._id}>
                        <div className="card-body">
                          <h5 className="card-title">Name: {tenant.user.fname} {tenant.user.lname}</h5>
                          <p className="card-text">Email: {tenant.user.email}</p>
                          <p className="card-text">Phone: {tenant.user.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6" key={tenant.property._id}>
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Title: {tenant.property.title}</h5>
                          <p className="card-text">Address: {tenant.property.description}</p>
                          <a href="#" className="btn btn-primary">View rental details</a>
                        </div>
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