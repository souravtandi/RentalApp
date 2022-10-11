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
    <div>
      {loading ? <div className='text-center mt-5'>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> : ''}
      <h3 className='text-center mt-3' style={{ color: "F62459", backgroundColor: "#ffe6e6" }}>All Proprerties</h3>
      <h5 className='container text-primary'>Total properties: {properties.length}</h5>
      {properties.length > 0 ? properties.map((property) => {
        return (<div className="card w-50 container mb-2" key={property._id}>
          <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571460.jpg&fm=jpg" className="card-img-top w-10" alt="..."></img>
          <div className='container'>
            <div className="card-body">
              <h5 className="card-title">{property.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{property.description}</h6>
              <p className="card-text">₹ {property.price}</p>
              <Link to={`/propertyDetails/${property._id}`} className="btn btn-primary">Details</Link>
            </div>
          </div>
        </div>)
      }) : <h4 className='text-danger'>No properties found!!!</h4>

      }
    </div>
  )
}

export default AllProperties