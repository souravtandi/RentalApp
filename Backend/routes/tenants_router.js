const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const PropertiesModel = mongoose.model("PropertiesModel");
const TenantsModel = mongoose.model("TenantsModel");
const { authMiddleware, authRole } = require('../middlewere/protected_routes');


router.get('/myTenants', authMiddleware, async (req, res) => {
    const user = req.dbUser;
    let tenantList = new Array()
    //console.log(user)
    const myProps = await PropertiesModel.find({ user: { $in: user._id } });
    
    for(let i=0; i<myProps.length; i++){
        const tenantData = await TenantsModel.find({ property: { $in: myProps[i]._id } })
        .populate("user", "_id fname lname email phone profileImgName")
        .populate("property");
        if(tenantData[0] != null)
            tenantList.push(tenantData[0])
    }
    
    return res.json({ allTenants: tenantList })
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