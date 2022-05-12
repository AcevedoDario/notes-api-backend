<<<<<<< HEAD
module.exports = (error, request, response, next) => {
    console.error(error)

    if (error.name === 'CastError'){
        response.status(400).send({ error: 'id used is malformed' })
    } else {
        response.status(500).end()
    }
=======
module.exports = (error, request, response, next) => {
    console.error(error)

    if (error.name === 'CastError'){
        response.status(400).send({ error: 'id used is malformed' })
    } else {
        response.status(500).end()
    }
>>>>>>> 6a857f777ab538a08b457819d6e8ccf19bd0570f
}