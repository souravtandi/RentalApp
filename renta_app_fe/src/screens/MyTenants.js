import React, { useEffect, useState } from 'react'
import { API_URL } from '../config'
import axios from 'axios';
import Swal from 'sweetalert2';


function MyTenants() {

    const [tenants, setTenants] = useState([])

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    };

    const getAllTenants = async ()=>{
        return axios.get(`${API_URL}/myTenants`, CONFIG_OBJ)
    }

    useEffect(()=>{
        getAllTenants()
    }, [])

    return (
        <div className='container my-3'>
            <h3>My Tenants List</h3>
            <div class="card">
                <img src="..." class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
            </div>
        </div>
    )
}

export default MyTenants