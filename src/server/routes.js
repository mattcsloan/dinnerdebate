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
        // use mongoose to add a new recipe in the database
        // look for existing recipe with same name and category first
        Recipes.findOne({
            category: req.body.category, 
            key: req.body.name
        }, function(err, recipe) { 
            if (err) {
                res.send(err);
            }
            // check to see if response returned an already existing recipe
            if (recipe == null) {
                var recipe = new Recipes({
                    name: req.body.name,
                    key: req.body.key,
                    description: req.body.description,
                    category: req.body.category,
                    categoryKey: req.body.categoryKey,
                    date: req.body.date,
                    source: req.body.source,
                    sourceURL: req.body.sourceURL,
                    addedBy: req.body.addedBy,
                    prepTime: req.body.prepTime,
                    cookTime: req.body.cookTime,
                    ingredients: req.body.ingredients,
                    directions: req.body.directions,
                    pairings: req.body.pairings,
                    image: req.body.image,
                    servings: req.body.servings,
                    tags: req.body.tags,
                    featured: req.body.featured
                });
                recipe.save(function(err, recipes) {
                    if(err) {
                        res.send(err);
                    }
                    res.json(201, recipes);
                });
            } else {
                console.log('Recipe already exists.');
                res.send('Recipe already exists.');
            }
        });


    });

    // get individual recipe by id
    // app.get('/api/recipes/:recipeId', function(req, res) {
    //     var recipeId = req.params.recipeId;
    //     Recipes.findById(recipeId, function(err, recipe) {
    //         if (err) {
    //             res.send(err);
    //         }
    //         res.json(recipe);
    //     });
    // });

    // get individual recipe by name/category
    app.get('/api/recipes/:categoryKey/:recipeName', function(req, res) {
        var categoryKey = req.params.categoryKey;
        var recipeNameKey = req.params.recipeName;

        var categoryName = categoryKey.replace(/-/g, ' ');
        categoryName = categoryName.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        categoryName = categoryName.replace(' And ', ' and ');

        Recipes.findOne({
            category: categoryName, 
            key: recipeNameKey
        }, function(err, recipe) { 
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
            recipe.key = req.body.key;
            recipe.description = req.body.description;
            recipe.category = req.body.category;
            recipe.categoryKey = req.body.categoryKey;
            recipe.date = req.body.date;
            recipe.source = req.body.source;
            recipe.sourceURL = req.body.sourceURL;
            recipe.addedBy = req.body.addedBy;
            recipe.prepTime = req.body.prepTime;
            recipe.cookTime = req.body.cookTime;
            recipe.ingredients = req.body.ingredients;
            recipe.directions = req.body.directions;
            recipe.pairings = req.body.pairings;
            recipe.image = req.body.image;
            recipe.servings = req.body.servings;
            recipe.tags = req.body.tags;
            recipe.featured = req.body.featured;
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