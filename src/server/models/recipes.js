var mongoose = require('mongoose');

// define our model
module.exports = mongoose.model('Recipes', {
    name : {type : String, default: ''},
    content : {type : String, default: ''},
});