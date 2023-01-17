const { response } = require('express')

const express = require('express')
const app = express()

app.use(express.json())


let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
      },
      {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
      },
      {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
      },
      {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
      }
]

const generateId = () => {
    min = Math.ceil(10)
    max = Math.floor(120)
    return Math.floor(Math.random() * (max - min) + min)
}

app.get('/info', (req, res) => {
    const amount = persons.length
    const date = new Date()
    res.send(`<p>Phonebook has info for ${amount} people. </p><p> ${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    const check = persons.find(person1 => person1.name === body.name)
  
    if (check) {
        console.log("cannot add")
        return response.status(400).json({ 
            error: 'name must be unique' 
          })
    }
    persons = persons.concat(person)
  
    response.json(person)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})