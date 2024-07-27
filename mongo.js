const mongoose = require('mongoose')

const uri = 'mongodb+srv://piusmusomi:dCppHYqrnlj0a8XK@cluster0.8cvdxho.mongodb.net/Phone?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(uri)
    .then(() => console.log('Mongoose connected successfully'))
    .catch(err => console.log('Failed to connect',err))


    const personSchema = new mongoose.Schema({
        name: String,
        number: Number
    })
    const Person = mongoose.model('Person', personSchema)


const app = () => {
   
    Person.find({})
        .then(persons => {
            persons.forEach(person => {
                console.log('Database: ',person)
            })
            mongoose.connection.close()
        }) 
}

app()


          
        
