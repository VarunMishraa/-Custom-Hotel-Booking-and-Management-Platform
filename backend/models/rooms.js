const mongoose=require('mongoose');

const roomSchema= new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    maxcount : {
        type:Number,
        required:true
    },
    phonenumber : {
        type : Number,
        required : true
    },
    type:{
        type:String,
        requrie:true,
    },
    rentperday : {
        type:Number,
        required:true
    },
    imageurls: [],
    currentbookings:[],

    description : {
        type : String,
        required:true
    }
},{timestamps:true})

const Room=mongoose.model('Room',roomSchema);
module.exports=Room;