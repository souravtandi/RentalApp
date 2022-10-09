import React, { useEffect, useState } from 'react'
import { API_URL } from '../config'
import axios from 'axios';

function AllProperties() {

  const [properties, setProperties] = useState([])

  const getAllProperties = async () => {
    const propertiesData = await axios.get(`${API_URL}/viewAllProperties`)
    setProperties(propertiesData.data.allProperties)
    console.log({properties})
  }

  useEffect(() => {
    getAllProperties()
  }, [])

  return (
    <div>
      { properties.map((property) => {
        return (<div className="card" key={property._id}>
        <div className="card-body">
          <h5 className="card-title">{property.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{property.description}</h6>
          <p className="card-text">{property.price}</p>
          <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a>
        </div>
      </div>)
      })
      
}
    </div>
  )
}

export default AllProperties