const mongoose = require('mongoose');

const courtSchedulesSchema=new mongoose.Schema({
    date:{
        type:Date,
        required:true,
    },
    slot:{
        type:Object,
        required:true,

    },
    cost:{
        type:Number,
        required:true,
        // unique:true
    },
    cancellation:{
        type:Array,
    },
    bookedBy:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    paymentOrder:{
        type:Array,
    },
    courtId:{
        type:mongoose.Types.ObjectId,
        ref:'courts'
        // required:true
    },
 })
 const courtSchedules=mongoose.model('courtSchedules',courtSchedulesSchema)
 module.exports=courtSchedules;

