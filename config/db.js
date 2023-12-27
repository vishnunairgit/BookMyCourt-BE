// const mongoose = require('mongoose')
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb://127.0.0.1:27017/BookMyCourt-FE', {
      useNewUrlParser: 'true'
    })
    console.log("mongoDb connected");
  }
  catch (error) {
    console.log(error);
  }
}
module.exports=connectDB

