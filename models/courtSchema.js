const mongoose=require('mongoose')

const courtSchema=mongoose.Schema({
    CourtName:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
        unique:true

    },
    address:{
        type:String,
        required:true,
        // unique:true
    },
    type:{
        type:String,
        required:true
    },
    courtPic:{
        type:String,
        required:true
    },
    timeStamp:{
        type:Date,
        default:new Date()
    }
   
 })
 const court=mongoose.model('courts', courtSchema)
 module.exports=court;

