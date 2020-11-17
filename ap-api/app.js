require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');

// include custom libraries
const db = require("./app/lib/db");
const auth = require("./app/lib/auth");

//include routes
const indexRouter = require("./app/routes/index");
const authRouter = require('./app/routes/auth');
const todoRoutes = require('./app/routes/todo');
const profileRoutes = require('./app/routes/profile');

db.initializeDatabase(()=>{});
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(cors({credentials:true, origin:'http://localhost:3000'}))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept,");
  next();
});


// Initialize passport
app.use(passport.initialize());
// serialize and deserialize user
passport.serializeUser(function(user, done) {
  done (null, user.profile.oid);
});
passport.deserializeUser(async function(id, done) {
  try{
    const user = await db.User.findOne({where:{id:id}});
    done(null, user);
  }catch(error) {
    done(error, null)
  }
 
  
});
//add auth 
passport.use('login', auth.oauth2Strategy);
passport.use('auth', auth.jwtStrategy);
passport.use('bearer', new BearerStrategy(
  async function(token, done) {
    try{
      const user = await db.User.findOne({where:{token:token}});
      if (!user) return done(null, false);
      done(null, user);
    }catch(err){
      return done(err); 
    }
  }
));



app.use(function(req, res, next) {
  if (req.user) {
    res.locals.user = req.user.profile;
  }
  next();
});


// define routes
app.use("/", indexRouter);
app.use('/auth/', authRouter);
app.use('/todos/', todoRoutes);
app.use('/profile/',passport.authenticate('bearer', { session: false }), profileRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({error:err.message, status:500});
});

module.exports = app;
