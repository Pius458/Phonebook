const express = require('express')
const app = express()

app.use(express.json())


const persons = [
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
    response.send(`Phonebook has info for ${persons.length} people <br/> ${DateDisplay()}`)
})

app.get('/api/persons', (request,response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request,response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    
    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
    
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`App running on Port ${PORT}`)
})