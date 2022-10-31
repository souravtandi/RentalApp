const mongoose = require ('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const tenantsSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "UserModel"
    },
    property: {type: ObjectId, ref: "PropertiesModel"}
});

mongoose.model("TenantsModel",(tenantsSchema));