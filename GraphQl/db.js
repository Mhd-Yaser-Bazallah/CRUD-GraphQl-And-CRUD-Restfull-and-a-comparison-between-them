const mongoose = require('mongoose');

const connectDB = async () => {
  const conn =   await mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Additional options...
  });
  console.log("MongoDB Connected");
};

module.exports = connectDB;
