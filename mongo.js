const mongoose = require('mongoose')


const url =
  `mongodb+srv://vainoFL:@cluster0.iujwvpx.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log("Phonebook:")
        result.forEach(person => {
          console.log(person.name, person.number)         
        })
        mongoose.connection.close()
      })
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

if (process.argv.length == 5) {
    person.save().then(result => {
        console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
      })
}