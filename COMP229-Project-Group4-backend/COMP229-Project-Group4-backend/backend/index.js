const express = require('express');
const cors = require('cors');

// modules for authentication
let session = require('express-session');
let passport = require('passport');

let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');
let DB = require('./db');

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('./db.js');
const routes = require('./routes/routes.js');
const routesUser = require('./routes/routesUser.js');



const app= express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:4200'}));

app.listen(3000,()=>console.log('Server started at port 3000'));



app.use(bodyParser.json());

//setup express session
app.use(session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false
  }));
  
  // initialize flash
  app.use(flash());
  
  // initialize passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  // passport user configuration
  
  // create a User Model Instance
//   let userModel = require('../models/user');
const userModel = require('./models/userPassport.js');
let User = userModel.User;
  // let User = routesUser.User;
  
  // implement a User Authentication Strategy
  passport.use(User.createStrategy());
  
  // serialize and deserialize the User info
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  
  let jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
  jwtOptions.secretOrKey = 'SomeSecret';
  
  let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        return done(null, user);
      })
      .catch(err => {
        return done(err, false);
      });
  });
  
  passport.use(strategy);



  const refreshTokenSecret = 'yourrefreshtokensecrethere';
  const refreshTokens = [];
app.use('/tournament',routes);
app.use('/user',routesUser);
app.post('/login', (req, res) => {
    console.log(res);
    // Read username and password from request body
    console.log(req.body)
    //const { username, password } = req.body['body'];
    const username = req.body['body'].username;
    const password = req.body['body'].password;

    // Filter user from the users array by username and password
    const users = req.body['userList'];
    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        // Generate an access token
        let token = jwt.sign({ data: user.username, expiresIn: "1h" }, jwtOptions.secretOrKey);
        const refreshToken = jwt.sign({ data: user.username, expiresIn: "1h" }, refreshTokenSecret);

        refreshTokens.push(refreshToken);
        res.json({ success: true, token: token ,user:user});
        // const accessToken = jwt.sign({ username: user.username,  role: user.role }, jwtOptions.secretOrKey);

        // res.json({
        //     accessToken
        // });
    } else {
        res.send('Username or password incorrect');
    }
});

app.get('/logout', (req, res) => {
    res.json({ success: true});
    // res.send("Logout successful");
});