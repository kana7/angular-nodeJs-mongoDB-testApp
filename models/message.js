var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('../models/user');

var schema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

// Mongoose middleware that listen to remove request to a message
schema.post('remove', function(message) {
    // find user from the message user
    User.findById(message.user, function (err, user) {
        // remove message from messages array
        user.messages.pull(message._id);
        // save changes
        user.save();
    });
});

module.exports = mongoose.model('Message', schema);