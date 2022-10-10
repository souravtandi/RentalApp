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
      {properties.map((property) => {
        return (<div className="card w-50 container mb-2" style={{ backgroundColor: "#ffe6e6" }} key={property._id}>
          <div className='container'>
            <div className="card-body">
              <h5 className="card-title">{property.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{property.description}</h6>
              <p className="card-text">₹ {property.price}</p>
              <Link to="/propertyDetails" className="btn btn-primary">Details</Link>
            </div>
          </div>
        </div>)
      })

      }
    </div>
  )
}

export default AllProperties