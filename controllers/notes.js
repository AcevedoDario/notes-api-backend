const notesRouter = require('express').Router()
const Note = require('../models/Note')

notesRouter.get('/',(request, response) => {
    response.send('<h1>Bienvenido a mi API</h1>')
  })
  
  //Get all notes
  notesRouter.get('/api/notes', async(request, response) => {
    const notes = await Note.find({})
    response.json(notes)
  })
  
  //Get a specific note
  notesRouter.get('/:id', (request, response, next) => {
    const { id } = request.params
    
    Note.findById(id).then(note => {
      if (note) {
        return response.json(note)
      } else {
        response.status(404).end()
      }
    }).catch(err => {
      next(err)
    })
  })
  
  //Update a specific note
  notesRouter.put('/:id', (request, response, next) => {
    const { id } = request.params
    const note = request.body
  
    const newNoteInfo = {
      content: note.content,
      important: note.important
    }
  
    Note.findByIdAndUpdate(id, newNoteInfo, { new : true})
      .then(result =>{
        response.json(result)
      })
  })
  
  //Delete a note
  notesRouter.delete('/:id', (request, response, next) => {
    const { id } = request.params
  
    Note.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch(next)
  })

//Post a new note
notesRouter.post('/', async(request, response) => {
    const note = request.body
    //validar que el contenido no esté vacio
    if ( !note.content ) {
      return response.status(400).json({
        error: 'required "content" field is missing'
      })
    }
  
    const newNote = new Note({
      content: note.content,
      date: new Date(),
      important: note.important || false
    })
  
    try {
      const savedNote = await newNote.save()
      response.json(savedNote)
    } catch (error) {
      next(error)
    }
  })

module.exports = notesRouter