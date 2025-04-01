require('dotenv').config({ path: './.env.local' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongoDB')

const FRONT_URI = process.env.CLIENT_URI
const PORT = process.env.SERVER_PORT;

const app = express();
app.use(express.json())
app.use(cors({  
    origin: FRONT_URI,  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos  
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos  
    credentials: true // Si estás usando cookies, sesión o autorización básica  
}));

app.options('*', cors());

app.use('/api', require('./routes'))

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})