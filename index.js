require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')
const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')

app.use(cors())
app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use(notFound)
app.use(handleErrors)

//PORT config
const PORT = process.env.PORT
const server = app.listen(PORT)
console.log(`Server is running on port: ${PORT}.`)

module.exports = {app, server}