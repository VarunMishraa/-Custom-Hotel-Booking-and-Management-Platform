const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Booking = require("../models/booking");
const moment = require("moment");
const Room = require("../models/rooms");
const stripe = require('stripe')('sk_test_51OVHBpSG1MEKAMKNNe17ngUOk2PwnXhkMpz6eGRzyK5sY7dhPJujbk74nl81pFhjABQOt0MAVNat3haMlPswVaid00KzdoYz7v');
const { v4: uuidv4 } = require('uuid');

router.post('/bookroom', async (req, res) => {
  const { room, user, fromdate, todate, totalDays, totalAmount, token } = req.body;
  const id_pay=token.id;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency: "inr",
      receipt_email: token.email,
      automatic_payment_methods: {
        enabled: true,
      },   
      payment_method: 'pm_card_visa',
    });

    // Create a new booking in your database
    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid: user._id,
      totalDays: totalDays,
      fromdate: moment(fromdate, "DD-MM-YYYY").format("DD-MM-YYYY"),
      todate: moment(todate, "DD-MM-YYYY").format("DD-MM-YYYY"),
      totalAmount: totalAmount,
      transactionId: paymentIntent.id,  // Use the PaymentIntent ID as the transaction ID
    });

    // Save the new booking
    const booking = await newBooking.save();

    // Update the room's current bookings
    const roomtemp = await Room.findOne({ _id: room._id });

    if (roomtemp) {
      roomtemp.currentbookings.push({
        bookingid: booking._id,
        fromdate: moment(fromdate, "DD-MM-YYYY").format("DD-MM-YYYY"),
        todate: moment(todate, "DD-MM-YYYY").format("DD-MM-YYYY"),
        userid: user._id,
        status: booking.status,
      });
      await roomtemp.save();
      res.status(200).send("Payment and booking success");
    } else {
      res.status(404).send('Room not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/getuserbookings", async (req, res) => {
  const  userid  = req.body.userid;
  try {
    console.log(userid);
    const bookings = await Booking.find({ userid: userid });
    console.log(bookings);
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.post("/cancelmyroom", async (req, res) => {
  const {bookingid,roomid } = req.body;
  try {
    const bookingitem = await Booking.findOne({_id: bookingid}) 
    bookingitem.status='cancelled'
    await bookingitem.save();
    const room = await Room.findOne({_id:roomid})
    const bookings = room.currentbookings
    const temp=bookings.filter(booking=>booking.bookingid.toString()!==bookingid)
    console.log(temp);
    room.currentbookings=temp;
    await room.save()

    res.send('Booking deleted successfully')
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "something went wrong" });
  }
});
router.get("/getallbookings",async(req,res)=>{
  try {
    const bookings= await Booking.find({});
    res.send(bookings);
  } catch (error) {
    res.send(error);
  }
})
module.exports = router;