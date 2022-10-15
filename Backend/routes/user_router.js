const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config')

const multer = require('multer')//for image upload
const Storage = multer.diskStorage({
    destination:'uploads',
    filename:(request, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage: Storage
}).single('testImage')

const isValidEmail = require ('../validators/email_validator')

const UserModel = mongoose.model("UserModel");

router.post("/login", (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        return res.status(400).json({ error: "One or more mandatory field is empty" });
    }

    UserModel.findOne({ email: email})
    .then((userInDb)=>{
        if(!userInDb){
            return response.status(400).json({ error: "Invalid credentials!"})
        }else{
           
            bcrypt.compare(password, userInDb.password)
            .then((validUser)=>{
                if(validUser){
                    const jwtToken = jwt.sign({_id: userInDb._id}, JWT_SECRET)
                    userInDb.password = undefined;
                    userInDb.properties = undefined;
                    const resultObject = {token: jwtToken, id: userInDb._id, user: userInDb}
                    return response.status(200).json({ result: resultObject})
                }
                else{
                    return response.status(400).json({ error: "Invalid credentials!"})
                }
                
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    })
    .catch((error) => {
        console.log(error);
    })

});

router.post('/register',upload, function(request, response){
    const { fname, lname, email, password, phone } = request.body;//object destructring feature of ES6
    if (!fname) {
        return response.status(400).json({ error: "first name field is empty" });
    }
    if (!lname) {
        return response.status(400).json({ error: "last name field is empty" });
    }
    if (!email) {
        return response.status(400).json({ error: "email field is empty" });
    }
    if (!isValidEmail(email)) {
        return response.status(400).json({ error: "invalid email format" });
    }
    if (!password) {
        return response.status(400).json({ error: "password field is empty" });
    }
    if (!phone) {
        return response.status(400).json({ error: "phone field is empty" });
    }

    bcrypt.hash(password, 16)
    .then((hashedPassword)=> {

        const userModel = new UserModel({
            fname,
            lname,
            email,
            password: hashedPassword,
            phone
        });
    
        userModel.save()
            .then((savedUser)=>{
                response.status(201).json({"savedUser": savedUser});
            })
            .catch(function(error){
                return response.status(500).json({ error: "error occured"});
            });
    })
    .catch((error) => {
        console.log(error);
    });

    
});

router.get('/user/profile/:userId', (req, res)=>{
    UserModel.findOne({ _id: req.params.userId })
    .select("-password")
    .then((userFound) => {
            return res.json({ user: userFound })
     })
     .catch((err) => {
        return res.status(400).json({ err: "User was not found!" })
     })
});

router.put('/user/profile/:userId', (req, res) => {
    UserModel.findByIdAndUpdate(req.params.userId, {
        fname : req.body.fname, lname: req.body.lname, phone: req.body.phone
    }, null, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            
            console.log("Original Doc : ",docs);
            return res.json({ user: docs })
        }
    }).select("-password")
})

router.put('/user/profile/passwordReset', (req, res) => {
    console.log(req.body)
    UserModel.findOneAndUpdate({$set:{email:req.body.email}}, {$set: {password: req.body.password}},
        {password: req.body.newPassword}, null, function (err, docs) {
            if(err){
                return res.status(400).json({ err: "Existing email and password is incorrecct" })
            }
            else{
                return res.json({ user: docs })
            }
        }
        )
})



module.exports = router;