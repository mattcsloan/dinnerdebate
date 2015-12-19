var navigation = require('./data/navigation');
var stormpath = require('express-stormpath');
var Recipes = require('./models/recipes');

module.exports = function(app) {

    // server routes ===========================================================
    // api calls
    app.get('/api/navigation', function(req, res) {
        res.json(201, navigation.items);
    });

    // get all recipes
    app.get('/api/recipes', function(req, res) {
        // use mongoose to get all recipes in the database
        Recipes.find(function(err, recipes) {
            if (err) {
                res.send(err);
            }
            res.json(recipes); // return all recipes in JSON format
        });
    });

    // create recipe
    app.post('/api/recipes', stormpath.loginRequired, function(req, res) {
        var recipe = new Recipes({
            name: req.body.name,
            content: req.body.content
        });

        // use mongoose to add a new recipe in the database
        recipe.save(function(err, recipes) {
            if(err) {
                res.send(err);
            }
            res.json(201, recipes);
        });
    });

    // get individual recipe
    app.get('/api/recipes/:recipeId', function(req, res) {
        var recipeId = req.params.recipeId;
        Recipes.findById(recipeId, function(err, recipe) {
            if (err) {
                res.send(err);
            }
            res.json(recipe);
        });
    });

    // update individual recipe
    app.put('/api/recipes/:recipeId', stormpath.loginRequired, function(req, res) {
        var recipeId = req.params.recipeId;
        Recipes.findById(recipeId, function(err, recipe) {
            recipe.name = req.body.name;
            recipe.content = req.body.content;
            if (err) {
                res.send(err);
            }
            if (recipe) {
                recipe.save(function(err) {
                    if(err) {
                        res.send(err);
                    }
                    res.json(201, recipe);
                });
            }
        });
    });

    // delete individual recipe
    app.delete('/api/recipes/:recipeId', stormpath.loginRequired, function(req, res) {
        var recipeId = req.params.recipeId;
        Recipes.findById(recipeId, function (err, recipe) {
            if(err) {
                res.send(err);
            }
            if (recipe) {
                recipe.remove(function(err) {
                    if(err) {
                        res.send(err);
                    }
                    res.json();
                });
            }
        });
    });

    // authentication routes
    app.get('/auth/user', stormpath.loginRequired, function (req, res) {
      if (!req.user || req.user.status !== 'ENABLED') {
        return res.redirect('/login');
      }
      res.json(201, req.user);
    });


    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.render('index', function(err, html) {
            res.send(html);
        });
    });

};