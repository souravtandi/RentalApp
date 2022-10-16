const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "tenant"
    },
    profileImgName: {
        type: String,
        required: true
    },
    properties: [{type: ObjectId, ref: "UserModel"}]
 });

 mongoose.model("UserModel", userSchema);