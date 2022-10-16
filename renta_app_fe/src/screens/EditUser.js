import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../config'
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom'

function EditUser() {

    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [phone, setPhone] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [image, setImage] = useState({ preview: '', data: '' })
    const [status, setStatus] = useState('')

    const { userId } = useParams()

    const handleImgChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    };

    const getUserByuserId = async (userId) => {
        const user = await axios.get(`${API_URL}/user/profile/${userId}`)
        setFname(user.data.user.fname)
        setLname(user.data.user.lname)
        setPhone(user.data.user.phone)
        let img = { preview: `http://localhost:5000/files/${user.data.user.profileImgName}`, data: '' }
        setImage(img)
    }
    useEffect(() => {
        getUserByuserId(userId)
    }, []);

    const editUser = (event) => {
        event.preventDefault();
        setLoading(true);
        let formData = new FormData()
        formData.append('file', image.data)
        axios.post('http://localhost:5000/uploadFile', formData)
        .then((data)=>{
            setStatus(data.statusText)
            const request = { fname, lname, phone, imgName: data.data.fileName };
            axios.put(`${API_URL}/user/profile/${userId}`, request, CONFIG_OBJ)
            .then((data) => {
                if (data) {
                    setLoading(false);
                    Swal.fire({
                        icon: 'info',
                        title: 'User edited Successfully',
                        text: 'We will email you once Refresh is completed!',
                    });
                    navigate('/userProfile')
                }
            })
            .catch((err) => {
                setLoading(false);
                Swal.fire({
                    icon: 'info',
                    title: 'User edited Successfully',
                    text: 'We will email you once Refresh is completed!',
                });
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className='container'>
            {loading ? <div className='text-center mt-5'>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> : ''}
            <h3 className='text-center pt-3 mt-2'>{userId ? "Edit User" : "Register User"}</h3>
            <form onSubmit={(event) => editUser(event)} className='w-50 mx-auto'>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input onChange={(event) => setFname(event.target.value)} value={fname} type="text" className="form-control" id="firstName" />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input onChange={(event) => setLname(event.target.value)} value={lname} type="text" className="form-control" id="lastName" />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone no.</label>
                    <input onChange={(event) => setPhone(event.target.value)} value={phone} type="text" className="form-control" id="phone" />
                </div>
                <div className="mb-3">
                    {image.preview && <img src={image.preview} width='100' height='100' />}
                    <hr></hr>
                    <input type='file' name='file' onChange={handleImgChange}></input>
                    {status && <h4>{status}</h4>}
                </div>
                <div className='d-grid mt-3'>
                    <button type="submit" className="btn btn-success">Save</button>
                </div>
            </form>
        </div>
    )
}

export default EditUser