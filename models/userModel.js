const mongoose=require('mongoose')

const userShema=mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        required:true,
        default:3 

        // admin - 1
        // vender - 2
        // user - 3
    },
    // comfirmPassword:{
    //     type:String,
    //     required:true
    // }
 })
 const users=mongoose.model('users', userShema);
 module.exports=users;

