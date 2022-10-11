import React, { useEffect, useState } from 'react'
import { API_URL } from '../config'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

function MyProperty() {

  const [properties, setProperties] = useState([])

  const [loading, setLoading] = useState(false);

  const deleteProperty = (propertyId)=>{

    Swal.fire({
      title: 'Do you want to delete the property?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      setLoading(true)
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.delete(`${API_URL}/deletepost/${propertyId}`)
        .then((data)=>{
          setLoading(false)
          getAllPropertiesForUser(localStorage.getItem("id"))//to get the remaining properties
          Swal.fire(data.data, '', 'success')
        })
        .catch((err)=> {
          setLoading(false)
          Swal.fire(err, '', 'success')
        })
        
      } else if (result.isDenied) {
        setLoading(false)
        Swal.fire('Property not deleted', '', 'info')
      }
    })

  }

  const getAllPropertiesForUser = async (userId) => {
    const propertiesData = await axios.get(`${API_URL}/viewAllProperties/${userId}`)
    setProperties(propertiesData.data.allProperties)
    console.log({ properties })
    setLoading(false);
  }

  useEffect(() => {
    const userId = localStorage.getItem("id")
    getAllPropertiesForUser(userId)
    setLoading(true);
  }, [])

  return (
    <div className='container w-60'>
      <h3 className='text-center mt-4'>My Properties</h3>
      {loading ? <div className='text-center mt-5'>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> : ''}
      {properties.map((property) => {
        return (<div className="card mb-2" style={{ backgroundColor: "#ffe6e6" }} key={property._id}>
          <div className="card-body">
            <h5 className="card-title">{property.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{property.description}</h6>
            <p className="card-text">{property.price}</p>
            <Link to="/propertyDetails" className="btn btn-primary me-3">Details</Link>
            <button onClick={()=> deleteProperty(property._id)} className="btn btn-danger">Delete</button>
          </div>
        </div>)
      })
}
    </div>
  )
}

export default MyProperty