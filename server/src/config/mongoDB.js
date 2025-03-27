const mongoose = require('mongoose') //libreria para interactuar con la BD
// require('dotenv').config({ path: './.env.local' });

const dbURI = process.env.DB_URI //variable de entorno que contierne la URL de la BD
mongoose.connect(dbURI)

const dbConnection = mongoose.connection

dbConnection.on('connected', () => {
    console.log('MongoDB successfully connected')
})
dbConnection.on('error', () => {
    console.log('An error has ocurred while connecting MongoDB')
})

module.exports = mongoose