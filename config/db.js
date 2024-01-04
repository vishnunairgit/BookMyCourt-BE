// const mongoose = require('mongoose')
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb+srv://infovishnunair:g6g5PdW3AA2j0xmy@cluster0.xidistl.mongodb.net/')
    console.log("mongoDb connected");
  }
  catch (error) {
    console.log(error);
  }
}
module.exports=connectDB

