const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: String,
    name: String,
    passwordHash: String,
    notes: [{
        type: Schema.Type.ObjectId,
        ref: 'Note'
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = model('User', UserSchema)
module.exports = User