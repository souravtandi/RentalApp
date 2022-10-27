const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const PropertiesModel = mongoose.model("PropertiesModel");

const {authMiddleware, authRole} = require('../middlewere/protected_routes');

router.post('/addProperties', authMiddleware, authRole('owner'), (request, response) => {
    const {title, description, price, propertyImgName, userId, address } = request.body

        if(!title || !description || !price) {
            return response.status(400).json({ error: "title field is empty!" });
        }

        const propertiesModel = new PropertiesModel({
            title,
            description,
            price,
            propertyImgName,
            user: userId,
            address: address
        })
        propertiesModel.save()
            .then((savedProperties) => {
                response.status(201).json({ "savedProperties": savedProperties })
            })
            .catch((error)=> {
                console.log(error)
                return response.status(400).json({ error: "error occured"})
            })
})

router.get('/viewProperties/:propertyId', (req, res) => {
    PropertiesModel.findOne({_id: req.params.propertyId})
    .populate("user", "_id fname lname email phone")
    .populate("address")
    .then((propertyFound) => {
        return res.json({ property: propertyFound })
    })
    .catch((err) => {
        return res.status(400).json({ err: "Property was not found!" })
     })
})

router.get('/viewAllProperties/:userId', authMiddleware, (req, res) => {
    PropertiesModel.find({ user: { $in:  req.params.userId }})
    //.populate("user", "_id fname lname email phone")
    .then((propertyFound) => {
        //console.log(propertyFound)
        return res.json({ allProperties: propertyFound })
    })
    .catch((err) => {
        return res.status(400).json({ err: "Property was not found!" })
     })
})

router.get('/viewAllProperties', (req, res) => {
    PropertiesModel.find()
    //.populate("user", "_id fname lname email phone")
    .then((propertyFound) => {
        return res.json({ allProperties: propertyFound })
    })
    .catch((err) => {
        return res.status(400).json({ err: "Property was not found!" })
     })
})

router.put('/editProperty/:propertyId', authMiddleware, authRole('owner'), (req, res) => {
    PropertiesModel.findByIdAndUpdate(req.params.propertyId, {
        title: req.body.title, description: req.body.description, price: req.body.price, propertyImgName: req.body.imgName
    }, {new: true}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            
            //console.log("Original Doc : ", docs);
            return res.json({ savedProperties: docs })
        }
    })
})

router.delete('/deletepost/:propertyId', authMiddleware, async (req, res) => {
   const result = await PropertiesModel.findByIdAndDelete(req.params.propertyId)
   if(result){
    res.send("deleted successfully")
   }
   else{
    res.status(404).send("cannot find property with id "+ req.params.propertyId)
   }
})

module.exports = router;
