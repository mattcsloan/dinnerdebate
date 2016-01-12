var mongoose = require('mongoose');

// define our model
module.exports = mongoose.model('Recipes', {
    name : {type : String, default: ''},
    key : {type : String, default: ''},
    description : {type : String, default: ''},
    category : {type : String, default: ''},
    categoryKey : {type : String, default: ''},
    date : {type : Date},
    source : {type : String, default: ''},
    sourceURL : {type : String, default: ''},
    addedBy : {
        username : {type : String },
        fullName : {type : String }
    },
    prepTime : {type : Number, default: ''},
    cookTime : {type : Number, default: ''},
    ingredients : {type : Array, default: []},
    directions : {type : String, default: ''},
    pairings : {type : Array, default: []},
    image : {type : String, default: ''},
    servings : {type : String, default: ''},
    tags : {type : Array, default: []},
    featured : {type : Boolean, default: false}
});