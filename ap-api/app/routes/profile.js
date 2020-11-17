var express = require('express');
var router = express.Router();
const db = require("../lib/db");


//ROUTES

//get single todo
router.get("/me", async (req,res)=>{
    try{
        console.log(req.user);
        const profile = { 
                email: req.user.email,
                name:  req.user.name
            };
        res.json(profile);
    }catch(err){
        console.error(err.message);
    }
});

module.exports = router;