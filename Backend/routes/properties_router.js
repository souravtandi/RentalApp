const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const PropertiesModel = mongoose.model("PropertiesModel");

router.post('/addProperties', (request, response) => {
    const {title, description, price, userId} = request.body

    if(!title || !description || !price) {
        return response.status(400).json({ error: "title field is empty!" });
    }

    const propertiesModel = new PropertiesModel({
        title,
        description,
        price,
        user: userId
    })
    propertiesModel.save()
        .then((savedProperties) => {
            response.status(201).json({ "savedProperties": savedProperties })
        })
        .catch((error)=> {
            return response.status(400).json({ error: "error occured"})
        })
})

router.get('/viewProperties/:propertyId', (req, res) => {
    PropertiesModel.findOne({_id: req.params.propertyId})
    .populate("user", "_id fname lname email phone")
    .then((propertyFound) => {
        return res.json({ property: propertyFound })
    })
    .catch((err) => {
        return res.status(400).json({ err: "Property was not found!" })
     })
})

router.get('/viewAllProperties/:userId', (req, res) => {
    PropertiesModel.find({ user: { $in:  req.params.userId } })
    //.populate("user", "_id fname lname email phone")
    .then((propertyFound) => {
        console.log(propertyFound)
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

router.put('/viewProperties/:propertyId', (req, res) => {
    PropertiesModel.findByIdAndUpdate(req.params.propertyId, {
        title: req.body.title, description: req.body.description, price: req.body.price
    }, {new: true}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            
            console.log("Original Doc : ", docs);
            return res.json({ savedProperties: docs })
        }
    })
})

router.delete('/deletepost/:propertyId', async (req, res) => {
   const result = await PropertiesModel.findByIdAndDelete(req.params.propertyId)
   if(result){
    res.send("deleted successfully")
   }
   else{
    res.status(404).send("cannot find property with id "+ req.params.propertyId)
   }
})

module.exports = router;
