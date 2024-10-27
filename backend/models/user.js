const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {type: String , require},
    email : {type: String , require},
    password : {type: String , require},
    isAdmin : {type: Boolean , require , default: false},
} , {
    timestamps : true,
})
const User=mongoose.model('User' , userSchema);
module.exports = User;