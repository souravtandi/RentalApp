import React, { useEffect, useState } from 'react'
import { API_URL } from '../config'
import axios from 'axios';
import { Link } from 'react-router-dom'

function AllProperties() {

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false);

  const getAllProperties = async () => {

    const propertiesData = await axios.get(`${API_URL}/viewAllProperties`)
    setProperties(propertiesData.data.allProperties)
    //console.log({properties})
    setLoading(false);
  }

  useEffect(() => {
    getAllProperties()
    setLoading(true);
  }, [])

  return (
    <div className='container'>
      <h3 className='text-center mt-4' style={{ color: "F62459", backgroundColor: "#ffe6e6" }}>All Properties</h3>
      <div className='row'>
      {loading ? <div className='text-center mt-5'>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> : ''}
      <h5 className='text-primary'>All Properties: {properties.length}</h5>
      {properties.length > 0 ? properties.map((property) => {
        return (<div className="col-lg-4 col-md-4 col-sm-12 mb-2" key={property._id}>
          <div className='card'>
          <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571460.jpg&fm=jpg" className="card-img-top w-10" alt="..."></img>
          <div className="card-body">
            <h5 className="card-title">{property.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{property.description}</h6>
            <p className="card-text">{property.price}</p>
            <div className='d-flex justify-content-end'>
            <Link to={`/propertyDetails/${property._id}`} class="btn btn-outline-primary"><i className="fa-solid fa-circle-info me-2"></i>View Details</Link>
            </div>
          </div>
          </div>
        </div>)
      }) : <h4 className='text-danger'>No properties found!!!</h4>
}
    </div>
    </div>
  )
}

export default AllProperties