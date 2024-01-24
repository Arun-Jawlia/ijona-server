const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);


const MONGO_URL = process.env.MONGODB_URL

const Connection = mongoose.connect(MONGO_URL)

module.exports = { Connection };