const mongoose = require ('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const tenantsSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "UserModel"
    },
    property: {type: ObjectId, ref: "PropertiesModel"},
    startDate: {

    },
    advanceAmount: {

    },
    rentPaidDate: {

    },
    
    rentAmount: {

    },
    rentDueDate: {

    },
    rentPaidFor: {
        
    }
});

mongoose.model("TenantsModel",(tenantsSchema));