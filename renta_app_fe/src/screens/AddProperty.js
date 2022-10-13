import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../config'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

function AddProperty() {

    const {propertyId} = useParams()
    const [ title, setTitle ] = useState()
    const [ description, setDescription ] = useState()
    const [ price, setPrice  ] = useState()

    const [ msg, setMsg ] = useState()
    const navigate = useNavigate()

    const CONFIG_OBJ = {
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
      }
  };


    const getPropertyById = async (propertyId) => {
      const property = await axios.get(`${API_URL}/viewProperties/${propertyId}`)
      setTitle(property.data.property.title)
      setDescription(property.data.property.description)
      setPrice(property.data.property.price)
    }
    useEffect(()=>{
      getPropertyById(propertyId)
    }, []);

    const addProperty = (event) => {
        event.preventDefault();
        const request = { title, description, price, userId: localStorage.getItem("id") };
        let url = `${API_URL}/addProperties`;
        let msg = 'Property added successfully...';
        if(propertyId){
          url = `${API_URL}/editProperty/${propertyId}`;
          msg = 'Property modified successfully...';
          axios.put(url, request, CONFIG_OBJ)
          .then((data)=> {
              if(data){
                Swal.fire({
                  icon: 'info',
                  title: msg,
                  text: 'We will email you once Refresh is completed!',
                });
                navigate("/properties")
              }
            })
            .catch((err)=>{
              setMsg("Property not added")
            })
          }
          else{
          axios.post(url, request, CONFIG_OBJ)
          .then((data)=> {
              if(data){
                Swal.fire({
                  icon: 'info',
                  title: msg,
                  text: 'We will email you once Refresh is completed!',
                });
                navigate("/properties")
              }
            })
            .catch((err)=>{
              setMsg("Property not added")
            })
          }
        }

  return (
    <div className='container pb-3' style={{backgroundColor: "#ffe6e6"}}>
        <h4>{msg}</h4>
            <h3 className='text-center mt-4'>{ propertyId ? "Edit" : "Add"} Property</h3>
            <form onSubmit={(event) => addProperty(event)} className='w-50 mx-auto'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input onChange={(event) => setTitle(event.target.value)} value={title} type="text" className="form-control" id="title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input onChange={(event) => setDescription(event.target.value)} value={description} type="text" className="form-control" id="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input onChange={(event) => setPrice(event.target.value)} value={price} type="number" className="form-control" id="price" />
                </div>
                <div className='d-grid mt-3'>
                    <button type="submit" className="btn btn-success">{ propertyId ? "Update" : "Add"}</button>
                </div>
            </form>
        </div>
  )
}

export default AddProperty