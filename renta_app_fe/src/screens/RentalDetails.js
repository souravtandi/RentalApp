import React, { useEffect, useState } from 'react'
import { API_URL } from '../config'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2';

function RentalDetails() {

  const { userId } = useParams()

  const [tenant, setTenant] = useState(null)
  const [property, setProperty] = useState(null)

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  };

  const getTenantDetail = async (userId) => {
    const output = await axios.get(`${API_URL}/myTenants/${userId}`, CONFIG_OBJ)
    .then(result => {
      return result;
    });
    setTenant(output.data.tenant);
    console.log(tenant)
  }

  useEffect(() => {
      getTenantDetail(userId);
  }, [])

  return (
    <div>
        <h3 className='text-center mt-2 shadow'>Rental Details</h3>
        <h4></h4>
    </div>
  )
}

export default RentalDetails