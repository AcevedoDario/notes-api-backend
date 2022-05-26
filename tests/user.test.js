const mongoose = require('mongoose')
const { server } = require('../index.js')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { api, getUsers } = require('./helpers')

describe('creating a new user', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('pswd', 10)
        const user = new User({ username:'userRoot', name:'test', passwordHash })

        await user.save()
    })

    test('works as expected creating a fresh username', async() => {
        const usersAtStart = await getUsers()
        const newUser = {
            username: 'userTest',
            name: 'test2',
            password: 't35t'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd =  await getUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper status code and message if username is already taken', async() => {
        const usersAtStart = await getUsers()

        console.log('getUsers obtenido\n')

        const newUser = {
            username: 'userRoot',
            name: 'duplicationTest',
            password: 'duplicated'
        }
        console.log('creado el newUser \n')
        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(409)
        .expect('Content-Type', /application\/json/)
        console.log('realizado la variable result\n')    
        expect(result.body.errors.username.message).toContain('expected `username` to be unique')

        const usersAtEnd = await getUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    
    afterAll(() => {
        mongoose.connection.close()
        server.close()
    })
})