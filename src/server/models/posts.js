var mongoose = require('mongoose');

// define our model
module.exports = mongoose.model('Posts', {
    name : {type : String, default: ''},
    content : {type : String, default: ''},
});