const express = require('express')
const cors = require('cors')


const app = express()

app.use(cors())
app.use(express.json())

let notes = [
    {
      "id": 1,
      "content": "HTML is easy",
      "date": "2019-05-30T17:30:31.098Z",
      "important": true
    },
    {
      "id": 2,
      "content": "Browser can execute only JavaScript",
      "date": "2019-05-30T18:39:34.091Z",
      "important": false
    },
    {
      "id": 3,
      "content": "GET and POST are the most important methods of HTTP protocol",
      "date": "2019-05-30T19:20:14.298Z",
      "important": true
    }
  ]

//Get all notes
app.get('/',(request, response) => {
  response.send('<h1>Hola Elias :-)</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

//Get a specific note
app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  if (note){
    res.json(note)
  }else{
    res.status(404).end()
  }
})

//remove a note
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

//post a new note
app.post('/api/notes', (request, response) => {
  const note = request.body
  //validar que el contenido no esté vacio
  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }
  //Get the last ID to add another new one
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  //Saving notes with the new one
  notes = [...notes, newNote]
  //Return a 201 status code and the new note
  response.status(201).json(newNote)
})


const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server is running on port: ${PORT}.`)