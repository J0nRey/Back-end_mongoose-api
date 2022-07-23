const express = require('express')
const mongoose = require('mongoose')
const Koder = require('./koderModel')

const server = express()
server.use(express.json()) // para recibir JSON's, para que exista el request.body se nesesita usar el middleware express.json()

const DB_USER = 'jonathan'
const DB_PASSWORD = 'kodemia123'
const DB_HOST = 'kodemia-once.gxa7e.mongodb.net'
const DB_NAME = 'kodemia'
const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

server.get('/koders', async (request, response) => {

// 1.
    const gender = request.query.gender
    const age = request.query.age
    const isMinAge = new Boolean(request.query.is_min_age)
    
    const filters = {}
    if (gender) filters.gender = gender
    if (age) {
        if (isMinAge.valueOf()){
            filters.age = {$gte: age}
        }else{
         filters.age = age   
        }
}
      const allKoders = await Koder.find(filters)
// 1. const allKoders = await Koder.find({})

    response.json({
        message: 'all koders',
        success: true,
        data: {
            koders: allKoders
        }   
    })
})

// 2.

server.post('/koders', async (request, response) => {
    // Deconstrucción or Destructuring
    //const { name, lastName, age, gender } = request.body

    // if(!name || !lastName || !age || !gender) {
    //     response.status(400)
    //     response.json({
    //         success: false,
    //         message: 'name, lastName, age and gender are required'
    //     })
    //     return
    // }

// Manejo de errores con TRY-CATCH


try {
    const { name, lastName, age, gender } = request.body //para que exista el request.body se nesesita usar el middleware express.json()

    await Koder.create({ name, lastName, age, gender})

    response.json({
        success: true,
        message: 'koder created'
    })

} catch (error) {
    response.status(400)
    response.json({
        success: false,
        message: error.message
    })
}

    // await Koder.create({ name, lastName, age, gender})

    // response.json({
    //     success: true,
    //     message: 'koder created'
    // })
})

/***********************************************/
 mongoose.connect(url)
 .then( (connection) => {

    // aqui ya estamos conectados a la DB
     console.log('DB Connected :D : ', connection)
     server.listen(8080, () => {
        console.log( 'Server is listening' )
    })
 })
 .catch( (error) => {
     console.error('Error D: :', error)
 } )

 /* Practica 5:

1. GET /koders
    -gender

2. POST /koders
    -name
    -lastName
    -age
    -gender
*/