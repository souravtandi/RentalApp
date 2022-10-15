const mongoose = require ('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const propertiesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    propertyImgName: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        ref: "UserModel"
    }
});

mongoose.model("PropertiesModel",(propertiesSchema));