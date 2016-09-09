var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    date: {type: Date},
    mainItem: Schema.Types.Mixed,
    items: {type : Array, default: []},
    prepTime: {type : Number, default: ''},
    cookTime: {type : Number, default: ''},
    mealUrl: {type : String, default: ''},
    published: {type : Boolean, default: false}
});

module.exports = mongoose.model('Meals', schema);