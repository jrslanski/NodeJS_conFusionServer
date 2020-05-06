var express = require('express');
//var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Users = require('../models/users');
var passport = require('passport');


const userRouter = express.Router();
userRouter.use(bodyParser.json());

/* GET users listing. */
userRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

userRouter.post('/signup', (req, res, next) => {
    Users.register(new Users({username: req.body.username}), 
    req.body.password, (err, user) => {
      if(err){
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      }
      else{
          passport.authenticate('local')(req,res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Registration Succesful'}); 
          });

      }
    });
});

userRouter.post('/login', passport.authenticate('local'), (req, res, next) => {
  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, status: 'You are succesfully loggin'}); 

});

userRouter.get('/logout', (req, res, next) =>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }else{
    var err = new Error('You are no logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = userRouter;
