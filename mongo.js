<<<<<<< HEAD
const mongoose = require('mongoose')

const {MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV} = process.env

//datos de conexión
const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

//conexión a la base de datos
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log('connected to database')
  }).catch(err => {
    console.error(err)
  })




//guardar en la base de datos
// note.save()
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   })
//   .catch(err => {
//     console.error(err)
//     mongoose.connection.close()
=======
const mongoose = require('mongoose')

//datos de conexión
const connectionString = process.env.MONGO_DB_URI

//conexión a la base de datos
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log('connected to database')
  }).catch(err => {
    console.error(err)
  })




//guardar en la base de datos
// note.save()
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   })
//   .catch(err => {
//     console.error(err)
//     mongoose.connection.close()
>>>>>>> 6a857f777ab538a08b457819d6e8ccf19bd0570f
//   })