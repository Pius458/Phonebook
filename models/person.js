require('dotenv').configDotenv({ path: '../../Phone/.env', override: false })
const mongoose = require('mongoose')

const uri = process.env.MONGODB_URL

mongoose.connect(uri)
  .then(() => console.log('Mongoose connected successfully'))
  .catch(err => console.log('Failed to connect',err))


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: Number
})
personSchema.set('toJSON', {
  transform: (document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})
module.exports = mongoose.model('Person', personSchema)

