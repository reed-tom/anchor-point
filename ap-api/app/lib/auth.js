const jwt = require('jsonwebtoken');
const passport = require("passport");
const jwtStrategy = require('passport-jwt');
const OAuth2Strategy = require('passport-oauth2');


const auth = {};

auth.tokenToProfile = async (req, accessToken, refreshToken, params, profile, done) => {
    const idToken = params['id_token'];

    profile = jwt.decode(idToken);
    const at = jwt.decode(accessToken);
    const rt = jwt.decode(refreshToken);
    //console.log(profile,at,rt);
    const user = {profile, accessToken, refreshToken};
    done(null, user);
};
  


//verify jwt
auth.jwtStrategy = new jwtStrategy.Strategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: (request) => {
        let token = null;
        if (request && request.cookies) token = request.cookies.jwt;
        console.log(token);
        return token;
    },
    }, async (token, done)=>{
            try{
                return done(null, token.user);
            }catch(error){
                return done(error);
            }
    });

auth.oauth2Strategy = new OAuth2Strategy({
    state: false,
    authorizationURL: process.env.AUTHORIZATION_URL,
    tokenURL: process.env.TOKEN_URL,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URI,
    passReqToCallback: true,
    scope: process.env.OAUTH_SCOPES.split(' ')
  }, auth.tokenToProfile);


module.exports = auth;