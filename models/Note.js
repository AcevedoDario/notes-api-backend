<<<<<<< HEAD
const { model, Schema} = require('mongoose')

//crear esquema
const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean
})

//editar el metodo toJSON para que no muestre el campo _id y __v
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//crear modelo
const Note = model('Note', noteSchema)

=======
const { model, Schema} = require('mongoose')

//crear esquema
const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean
})

//editar el metodo toJSON para que no muestre el campo _id y __v
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//crear modelo
const Note = model('Note', noteSchema)

>>>>>>> 6a857f777ab538a08b457819d6e8ccf19bd0570f
module.exports = Note