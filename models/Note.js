const { model, Schema} = require('mongoose')

//creating a new schema for the notes
const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

//editing the schema deleting the _id and the __v properties
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//creating a new model for the notes
const Note = model('Note', noteSchema)

module.exports = Note