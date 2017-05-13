var express = require("express");
var bodyParser = require("body-parser");
var app = express(app);
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var port = process.env.PORT || 8080;

var MongoClient = require("mongodb").MongoClient;
var mongoose = require("mongoose");
var location = require("./models/locations");



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/myDatabase');
mongoose.Promise = global.Promise;
// poll.remove({}, function(){}); 
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true })); 
passport.use(new Strategy({
  consumerKey: "WiSZ4CeoyA5tRR8cIMlhmZK4T",
  consumerSecret: "Mk33FlpyIv3ZQqeQSIOAFyrgG7Tq3KAtxDeqAY78yUns1JCk7f",
  callbackURL: 'https://dynamicweb-namhoang18595.c9users.io/login/twitter/return'
},
                          function(token, tokenSecret, profile, cb) {
  // In this example, the user's Twitter profile is supplied as the user
  // record.  In a production-quality application, the Twitter profile should
  // be associated with a user record in the application's database, which
  // allows for account linking and authentication with other identity
  // providers.
  return cb(null, profile);
}));
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
// app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
app.get('/',function(req,res){
  // // console.log(req.user);
  res.render('home', { user: req.user });
});

app.get('/home',function(req,res){
    res.render('home',{user :req.user});
})

app.listen(port,function(err){
    if(err) console.error(err);
    console.log("Server start with port: " + port);
})