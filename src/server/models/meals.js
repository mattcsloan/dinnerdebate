var mongoose = require('mongoose');

module.exports = mongoose.model('Meals', {
    date: {type: Date},
    image: {
        main: {
            src: {type : String, default: ''},
            categoryKey: {type : String, default: ''},
            key: {type : String, default: ''},
            link: {type : String, default: ''}
        },
        secondary: [{
            src: {type : String, default: ''},
            categoryKey: {type : String, default: ''},
            key: {type : String, default: ''},
            link: {type : String, default: ''}
        }]
    },
    entree: {
        title: {type : String, default: ''},
        categoryKey: {type : String, default: ''},
        key: {type : String, default: ''},
    },
    appetizers: [{
        title: {type : String, default: ''},
        categoryKey: {type : String, default: ''},
        key: {type : String, default: ''},
        link: {type : String, default: ''}
    }],
    sides: [{
        title: {type : String, default: ''},
        categoryKey: {type : String, default: ''},
        key: {type : String, default: ''},
        link: {type : String, default: ''}
    }],
    drinks: [{
        title: {type : String, default: ''},
        categoryKey: {type : String, default: ''},
        key: {type : String, default: ''},
        link: {type : String, default: ''}
    }],
    desserts: [{
        title: {type : String, default: ''},
        categoryKey: {type : String, default: ''},
        key: {type : String, default: ''},
        link: {type : String, default: ''}
    }],
    prepTime: {type : Number, default: ''},
    cookTime: {type : Number, default: ''},
    mealUrl: {type : Number, default: ''},
    published: {type : Boolean, default: false}
});