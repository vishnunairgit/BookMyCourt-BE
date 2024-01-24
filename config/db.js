// const mongoose = require('mongoose')
const mongoose =require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb+srv://infovishnunair:8XEkil9JEHL0q8Tu@cluster0.xidistl.mongodb.net/')
    console.log("mongoDb Bookmycourt connected");
  }
  catch (error) {
    console.log(error);
  }
}
module.exports=connectDB

