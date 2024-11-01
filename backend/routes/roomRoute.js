const express=require('express');
const router=express.Router();
const Room=require('../models/rooms')
router.get("/getallrooms",async(req,res)=>{
    try{
        const rooms= await Room.find({});
        return res.send(rooms);
    }
    catch(error){
        return res.send(error);
    }
})

router.post("/getroombyid",async(req,res)=>{
    const roomid=req.body.roomid
    try {
        const room=await Room.findOne({_id:roomid});
        res.send(room);
    } catch (error) {
        console.log(error);   
    }
})

router.post("/addroom", async(req, res) => {
    const { room , 
       rentperday, maxcount ,description ,phonenumber ,type ,image1 ,image2 ,image3} = req.body
  
       const newroom = new Room({
            name : room,
            rentperday, 
            maxcount , description , phonenumber , type , imageurls:[image1 , image2 ,image3] , currentbookings:[]
       })
       try {
            await newroom.save()
            res.send('New Room Added Successfully')
       } catch (error) {
            return res.status(400).json({ error });
       }
  });

module.exports=router;
