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
//   })