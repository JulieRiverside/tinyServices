// db.js
const mongoose = require('mongoose')

async function connectDB(){
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Database connected')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB
