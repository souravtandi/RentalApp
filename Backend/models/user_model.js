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
    profilePicUrl: {
        type: String,
        default: "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png"
    },
    userAdhar: {
        type: String,
        required: true
    },
    properties: [{type: ObjectId, ref: "UserModel"}]
 });

 mongoose.model("UserModel", userSchema);