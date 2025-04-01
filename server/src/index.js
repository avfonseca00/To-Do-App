require('dotenv').config({ path: './.env.local' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongoDB')

const FRONT_URI = process.env.CLIENT_URI

const app = express();
app.use(express.json())
app.use(cors({
    origin: FRONT_URI
}));

const PORT = process.env.SERVER_PORT;

app.use('/api', require('./routes'))

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})