import React, { useEffect, useState } from 'react'
import { API_URL } from '../config'
import axios from 'axios';
import { useParams } from 'react-router-dom'

function PropertyDetails() {

  const [property, setProperty] = useState({})

  const { propertyId } = useParams()
  console.log(`propertyId ${propertyId}`)

  const getPropertyDetails = async () => {
    const result = await axios.get(`${API_URL}/viewProperties/${propertyId}`)
    setProperty(result.data.property)
  }

  useEffect(() => {
    getPropertyDetails()
  }, [])
  return (
    <div className='container'>
      <h3>Property Details</h3>
      <div className="card" style={{width: "18rem"}}>
        <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571460.jpg&fm=jpg" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Title: {property.title}</h5>
          <p className="card-text">Description: {property.description}</p>
          <p className="card-text">Price: {property.price}</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>

  )
}

export default PropertyDetails