const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const PropertiesModel = mongoose.model("PropertiesModel");
const TenantsModel = mongoose.model("TenantsModel");
const { authMiddleware, authRole } = require('../middlewere/protected_routes');


router.get('/myTenants', authMiddleware, (req, res) => {
    const user = req.dbUser;
    let tenantList = []
    //console.log(user)
    PropertiesModel.find({ user: { $in: user._id } })
    .then((propertyFound) => {
        for(let i=0; i<propertyFound.length; i++){
            TenantsModel.find({ property: { $in: propertyFound[i]._id } })
            .populate("user", "_id fname lname email phone")
            .then((tenantFound) => {
                tenantList.push(tenantFound)
            })
            .catch((err) => {
                console.log(err)
            })

        }
        return res.json({ allTenants: tenantList })
    })
    .catch((err) => {
        return res.status(400).json({ err: "Property was not found!" })
    })
})

router.post('/addTenant', authMiddleware, (req, res) => {

    const { userId, propertyId } = req.body
                const tenantsModel = new TenantsModel({
                    user: userId,
                    property: propertyId
                })
                tenantsModel.save()
                    .then((savedTenant) => {
                        res.status(201).json({ "savedTenant": savedTenant })
                    })
                    .catch((error) => {
                        console.log(error)
                        return res.status(400).json({ error: "Tenant not added" })
                    })
            }
)



module.exports = router;