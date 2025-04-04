require('dotenv').config({ path: './.env.local' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongoDB')

const PORT = process.env.SERVER_PORT;

const app = express();
app.use(express.json())
app.use(cors());

app.use('/api', require('./routes'))

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})