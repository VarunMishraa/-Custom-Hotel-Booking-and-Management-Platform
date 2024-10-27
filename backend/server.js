const express=require('express');
const app=express();
const mongoose=require('./db')
const Room=require('./models/rooms')
const roomsRoute=require('./routes/roomRoute')
const port=process.env.PORT || 5000;
const userRoute=require('./routes/userRoute');
const bookingRoute=require('./routes/bookingRoutes')
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/rooms",roomsRoute);
app.use("/api/users",userRoute);
app.use("/api/bookings",bookingRoute);


app.listen(port, function(){
    console.log("Server runs on " +port);
})

