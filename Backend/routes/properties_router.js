const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const PropertiesModel = mongoose.model("PropertiesModel");

router.post('/addProperties', (request, response) => {
    const {title, description, price, userId} = request.body

    if(!title) {
        return response.status(400).json({ error: "title field is empty!" });
    }
    if(!description) {
        return response.status(400).json({ error: "description field is empty!"});
    }
    if(!price) {
        return response.status(400).json({ error: "price field is empty!"});
    }
    if(!userId) {
        return response.status(400).json({ error: "userId field is empty!"});
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
    .then((propertyFound) => {
        return res.json({ savedProperties: propertyFound })
    })
    .catch((err) => {
        return res.status(400).json({ err: "Property was not found!" })
     })
})

router.get('/viewAllProperties/:userId', (req, res) => {
    PropertiesModel.find({ user: { $in:  req.params.userId } })
    //.populate("user", "_id fname lname email phone")
    .then((propertyFound) => {
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

module.exports = router;
