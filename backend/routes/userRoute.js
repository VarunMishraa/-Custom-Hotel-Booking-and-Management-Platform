const express = require("express");
const router = express.Router();
const User = require("../models/user")

router.post("/register", async(req, res) => {
  
    const {name , email , password} = req.body

    const newUser = new User({name , email , password})

    try {
        newUser.save()
        res.send('User Registered successfully')
    } catch (error) {
         return res.status(400).json({ message: error });
    }

});


router.post("/login", async(req, res) => {

    const {email , password} = req.body

    try {
        
        const user = await User.findOne({email:email , password:password})
            if(user){
                const temp={
                    name:user.name,
                    email: user.email,
                    isAdmin:user.isAdmin,
                    _id:user._id
                }
                res.send(temp);
            }
        else{
            return res.status(400).json({ message: 'User Login Failed' });
        }
    } catch (error) {
           return res.status(400).json({ message: 'Something went weong' });
    }
  
});
router.get("/getallusers", async (req, res) => {
    try {
        const users = await User.find({}).lean(); // Use .lean() to convert Mongoose documents to plain objects
        res.send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router