const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('Give password as an argument')
    process.exit(1)
}
const password = process.argv[2]

const uri = `mongodb+srv://musomi003:${password}@cluster0.8cvdxho.mongodb.net/Phone?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(uri)
    .then(() => console.log('Mongoose connected successfully'))
    .catch(err => console.log('Failed to connect',err))


    const personSchema = new mongoose.Schema({
        name: String,
        number: Number
    })
    const Person = mongoose.model('Person', personSchema)


const app = () => {
    const name = process.argv[3]
    const number = process.argv[4]
   
    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log('new person saved')
    }) 
    Person.find({})
        .then(persons => {
            persons.forEach(person => {
                console.log('Database: ',person)
            })
            mongoose.connection.close()
        }) 
}

app()


          
        
