import axios from 'axios'
import React, { useState } from 'react'
import { API_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

function AddProperty() {

    const [ title, setTitle ] = useState()
    const [ description, setDescription ] = useState()
    const [ price, setPrice  ] = useState()

    const [ msg, setMsg ] = useState()
    const navigate = useNavigate()

    const addProperty = (event) => {
        event.preventDefault();
        const request = { title, description, price, userId: localStorage.getItem("id") };
        axios.post(`${API_URL}/addProperties`, request)
        .then((data)=> {
            if(data){
              Swal.fire({
                icon: 'info',
                title: 'Property added successfully...',
                text: 'We will email you once Refresh is completed!',
              });
              navigate("/properties")
            }
          })
          .catch((err)=>{
            setMsg("Property not added")
          })
        }


  return (
    <div className='container pb-3' style={{backgroundColor: "#ffe6e6"}}>
        <h4>{msg}</h4>
            <h3 className='text-center mt-4'>Add Property</h3>
            <form onSubmit={(event) => addProperty(event)} className='w-50 mx-auto'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input onChange={(event) => setTitle(event.target.value)} type="text" className="form-control" id="title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input onChange={(event) => setDescription(event.target.value)}  type="text" className="form-control" id="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input onChange={(event) => setPrice(event.target.value)}  type="number" className="form-control" id="price" />
                </div>
                <div className='d-grid mt-3'>
                    <button type="submit" className="btn btn-success">Add</button>
                </div>
            </form>
        </div>
  )
}

export default AddProperty