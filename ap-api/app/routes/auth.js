const express = require('express');
const router = express.Router();
const db = require("../lib/db");
const passport = require("passport");
const jwt = require('jsonwebtoken');


router.get('/login', passport.authenticate('login', {
    session: false,
  }), async (req,res)=>{
    //console.log(req.user);
    let user = {};
    user = await db.User.findOne({where: { email:req.user.profile.email }});
    if (!user){
      user = await db.User.create({
                  name:req.user.profile.name,
                  email:req.user.profile.email,
                  token:req.user.accessToken,
                  refresh_token:req.user.refreshToken,
                  groups:JSON.stringify(req.user.profile.groups)
              });
    }else{
      user.token =req.user.accessToken;
      user.refreshToken = req.user.refreshToken;
      await user.save();
    }
      
    const body = {
      _id: user.id,
      email: user.email,
      name: user.name
    }
    //console.log(body)
    //const token = jwt.sign({user:body}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
    //const refreshToken = jwt.sign({user:body}, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES });
    res.cookie('azureAccessToken', user.token);
    //res.cookie('jwt', token);
    //res.cookie('refreshJwt', refreshToken);

    res.redirect(process.env.LOGIN_REDIRECT);
});



router.get('/logout', async (req,res)=>{
  let user = {};
  user = await db.User.findOne({where: { token:req.cookies['azureAccessToken'] }});
  if (user){
    user.token = null;
    user.refreshToken = null;
    await user.save();
  }
  if (req.cookies){
      res.clearCookie('azureAccessToken');
      res.clearCookie('jwt');
      res.clearCookie('refreshJwt');
  }
  res.redirect(process.env.LOGIN_REDIRECT);
});

module.exports = router;

