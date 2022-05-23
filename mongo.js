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