// db.js
const mongoose = require('mongoose');
const url = "mongodb+srv://Varun:varun@cluster0.3raxtkr.mongodb.net/RoomDB";

mongoose.connect(url);

mongoose.connection.on('error', () => {
    console.log("Database Not Connected ");
});

mongoose.connection.on('open', () => {
    console.log("Database connected successfully");
});

module.exports = mongoose;
