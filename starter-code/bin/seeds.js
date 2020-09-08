const mongoose = require('mongoose')
const Celebrity = require('../models/Celebrity')

mongoose.connect('mongodb://localhost/celebrity', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const celebrities = 
[
    {
        name: "Carlos Acosta",
        occupation: "Ballet Dancer",
        catchPhrase: "I didn't get where I am through divine intervention"
    },
    {
        name: "Salma Hayek",
        occupation: "Actress",
        catchPhrase: "What is important is to believe in something so strongly that you're never discouraged."
    },
    {
        name: "Hauschka",
        occupation: "Musician",
        catchPhrase: "I would rather concentrate on work that gives people meaning"
    }
]

Celebrity.create(celebrities)
.then(coolPeople => {
  console.log(`Success! Added ${coolPeople.length} celibrities to the database`);
  mongoose.connection.close()
})
.catch(err => {
  console.log(err);
})