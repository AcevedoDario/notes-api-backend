const supertest = require('supertest')
const { app }= require('../index.js')
const User = require('../models/User')

const api = supertest(app)

const initialNotes = [
    {
        content: 'Nota de prueba 1',
        important: true,
        date: new Date()
    },
    {
        content: 'Nota de prueba 2',
        important: true,
        date: new Date()        
    },
    {
        content: 'Nota de prueba 3',
        important: true,
        date: new Date()
    }
]

const getAllContentFromNotes = async() => {
    const response = await api.get('/api/notes')
    return contents = {
        contents : response.body.map(note => note.content),
        response
    }
}

const getUsers = async() => {
    const usersDB = await User.find({})
    return usersDB.map(user => user.toJSON())
}

module.exports = {
    initialNotes, 
    api,
    getAllContentFromNotes,
    getUsers
}