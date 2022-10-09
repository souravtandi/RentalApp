import React, { useEffect, useState } from 'react'
import { API_URL } from '../config'
import axios from 'axios';

function MyProperty() {

  const [properties, setProperties] = useState([])
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [price, setPrice] = useState()

  const getProperty = async (propertyId) => {
    const propertiesData = await axios.get(`${API_URL}/viewProperties/${propertyId}`)
    setTitle(propertiesData.data.savedProperties.title)
    setDescription(propertiesData.data.savedProperties.description)
    setPrice(propertiesData.data.savedProperties.price)
  }

  const getAllPropertiesForUser = async (userId) => {
    const propertiesData = await axios.get(`${API_URL}/viewAllProperties/${userId}`)
    setProperties(propertiesData.data.allProperties)
    console.log({properties})
  }

  useEffect(() => {
    const userId = localStorage.getItem("id")
    getAllPropertiesForUser(userId)
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

export default MyProperty