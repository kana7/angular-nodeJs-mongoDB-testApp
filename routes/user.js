var express = require("express");
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

// create a user in the database
router.post("/", function(req, res, next) {
  console.log(req.body);
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email
  });

  user.save(function(err, result){
    if(err) {
      return res.status(500).json({
        title: 'An error occured', 
        error: err
      });
    }
    res.status(201).json({
      message: 'User created',
      obj: result
    });
  });
});

// Login route procedure
router.post('/sigin', function(req, res, next){
  // fetch user from database
  User.findOne({email: req.body.email}, function(err, user){
    // basic unexpected error from server
    if(err){
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    // is the email exist for a user?
    if(!user){
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    // is the password correct?
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401)
        .json({
          title: "Login failed",
          error: { message: "Invalid login credentials" }
        });
    }
    // create the JWT token after veryfying all login credentials
    var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
    // send back to the front end the token and the user id.
    res.status(200).json({
      message: 'Successfully logged in',
      token: token,
      userId: user._id
    })
  });
});

module.exports = router;
