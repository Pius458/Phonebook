const express = require('express')
let morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.json())


morgan.token('post', (request,response) => {
    if(request.method === 'POST'){
        return JSON.stringify(request.body)
    }
    return ''
})
const customFormat = ":post"

app.use(morgan('tiny'))
app.use(morgan(customFormat))

let persons = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.use(cors())
app.use(express.static('dist'))

/*const generatedId = (existingId) => {
    const id = Math.floor(Math.random() * 1000) + 1
    if(id === existingId) {
        return generatedId(existingId)  //recursive call
    }
    return id
}*/

app.get('/', (request,response) => {
    response.send('<h1>Hello world</>')
})

app.get('/info', (request,response) => {
    const DateDisplay = () => {
        const currentDate = new Date()
    
        const days = ['Sun','Mon', 'Tue' , 'Wed' , 'Thur' , 'Fri' , 'Sat']
        const months = ['Jan', 'Feb' , 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec']
        const day = days[currentDate.getDay()]
        const month = months[currentDate.getMonth()]
        const time = currentDate.toLocaleTimeString()
        const date = currentDate.getDate()
        const year = currentDate.getFullYear()
        return(
            `${day} ${month} ${date} ${year} ${time} UTC +3 (East African Time)`
        )
    }

    Person.find({}).then(person => {
        response.send(`Phonebook has info for ${person.length} people <br/> ${DateDisplay()}`)
    })
    
})

app.get('/api/persons', (request,response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/api/persons/:id', (request,response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
    
})

app.post('/api/persons', (request,response) => {

    const {name, number} = request.body
    if(!name || !number){
        return response.status(404).json({error : 'Fill everything'})
    }

   // const existingId = persons.map(p => p.id)
    //const id = generatedId(existingId)

    const person = new Person({
        name : name,
        number : number
    })
    const existingName = persons.some(p => p.name === name)
    const existingNumber = persons.some(p => p.number === number)

    const message =  existingName ? "Name already exist" : "Number is saved"

    if(existingName || existingNumber) {
        return response.status(404).json({
            error : `${message}`
        })
    }

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
    
})

app.put('/api/persons/:id', (request,response,next) => {
    const {name, number} = request.body

    const person = {
        name : name,
        number : number
    }

    Person.findByIdAndUpdate(request.params.id, person , {new: true})
           .then(updatedPerson => {
            response.json(updatedPerson)
           })
           .catch(error => next(error))
})

app.delete('/api/persons/:id', (request,response,next) => {
    Person.findByIdAndDelete(request.params.id)
          .then(person => {
            response.status(204).end()
          })
          .catch(error => next(error))
})

const errorHandler = (error,request,response,next) => {
    console.error(error.message)

    if(error.name === 'CastError') {
        return response.status(404).send('malformed id')
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`App running on Port ${PORT}`)
})