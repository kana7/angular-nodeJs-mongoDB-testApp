var express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken');

var Message = require("../models/message");
var User = require("../models/user");

router.get("/", function(req, res, next) {
  Message.find().exec(function(err, messages) {
    if (err) {
      return res.status(500).json({
        title: "an error accured",
        error: err
      });
    }
    res.status(200).json({
      message: 'Success',
      obj: messages
    });
  });
});

// allow only authenticate user with the token to use the next routes
router.use('/', function(req, res, next) {
  jwt.verify(req.query.token, 'secret', function(err, decoded){
    if(err){
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      });
    }
    next();
  });
});

router.post("/", function(req, res, next) {

  const decoded = jwt.decode(req.query.token);
  // fetch authenticate user with jwt token from DB
  User.findById(decoded.user._id, function(err, user) {
    // basic error when fetching data from DB
    if (err) {
      return res.status(500).json({
        title: 'An error occcured',
        error: err
      });
    }

    var message = new Message({
      content: req.body.content,
      user: user._id
    });
    
    message.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: "an error accured",
          error: err
        });
      }
      //add message to the user's messages array.
      user.messages.push(result);
      // save modifications (new message added) to the user in DB
      user.save();

      res.status(201).json({
        message: "Saved message",
        obj: result
      });
    });

  });
});

router.patch('/:id', function (req, res, next) {

  Message.findById(req.params.id, function(err, message){
    if (err){
      return res.status(500).json({
        title: "an error accured",
        error: err
      });
    }
    if(!message){
      return res.status(500).json({
        title: 'No Message Found!',
        error: {message: 'Message not found'}
      });
    }
    
    message.content = req.body.content;

    message.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: "an error accured",
          error: err
        });
      }
      res.status(201).json({
        message: "Saved message",
        obj: result
      });
    });
  });
});

router.delete('/:id', function(req, res, next) {
  Message.findById(req.params.id, function(err, message){
    if (err){
      return res.status(500).json({
        title: "an error accured",
        error: err
      });
    }
    if(!message){
      return res.status(500).json({
        title: 'No Message Found!',
        error: {message: 'Message not found'}
      });
    }
    
    message.content = req.body.content;

    message.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: "an error accured",
          error: err
        });
      }
      res.status(201).json({
        message: "message deleted",
        obj: result
      });
    });
  })
});

module.exports = router;
