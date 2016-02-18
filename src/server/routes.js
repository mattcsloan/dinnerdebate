var navigation = require('./data/navigation');
var stormpath = require('express-stormpath');
var Recipes = require('./models/recipes');
var cloudinary = require('cloudinary');
var multer = require('multer');
var upload = multer({ dest: './uploads'});

module.exports = function(app) {

    // server routes ===========================================================
    // api calls
    app.get('/api/navigation', function(req, res) {
        res.status(201).json(navigation.items);
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

    // get all recipes by page
    app.get('/api/recipes/by/page/:pageNum/:numItems', function(req, res) {
        // use mongoose to get all recipes in the database
        Recipes.find( { "addedBy.username": req.user.username }, function(err, recipes) {
            if (err) {
                res.send(err);
            }
            res.json(recipes); // return all recipes in JSON format
        });
    });

    // get n number of recipes
    app.get('/api/recipes/first/:numItems/:sort', function(req, res) {
        var numItems = req.params.numItems;
        var sort = req.params.sort;
        // use mongoose to get all recipes in the database
        Recipes
            .find()
            .limit(numItems)
            .sort(sort)
            .exec(function(err, recipes) {
                if (err) {
                    res.send(err);
                }
                res.json(recipes);
            });
    });

    // get all recipes by user
    app.get('/api/recipes/by/user', function(req, res) {
        // use mongoose to get all recipes in the database
        Recipes.find( { "addedBy.username": req.user.username }, function(err, recipes) {
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
                    hints: req.body.hints,
                    pairings: req.body.pairings,
                    image: req.body.image,
                    servings: req.body.servings,
                    tags: req.body.tags,
                    featured: req.body.featured,
                    relatedItems: req.body.relatedItems
                });
                recipe.save(function(err, recipes) {
                    if(err) {
                        res.send(err);
                    }
                    res.status(201).json(recipes);
                });
            } else {
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
    app.put('/api/recipes/:categoryKey/:key/:recipeId', stormpath.loginRequired, function(req, res) {
        if(req.user.username == req.body.addedBy.username || req.user.groups.items[0].name == 'Admin') {
            Recipes.findOne({
                category: req.body.category, 
                key: req.body.name
            }, function(err, recipeReturned) { 
                if (err) {
                    res.send(err);
                }
                // check to see if response returned an already existing recipe
                var categoryKey = req.params.categoryKey;
                var key = req.params.key;
                if (recipeReturned == null || (recipeReturned.key == key && recipeReturned.categoryKey == categoryKey)) {
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
                        recipe.hints = req.body.hints;
                        recipe.pairings = req.body.pairings;
                        recipe.image = req.body.image;
                        recipe.servings = req.body.servings;
                        recipe.tags = req.body.tags;
                        recipe.featured = req.body.featured;
                        recipe.relatedItems = req.body.relatedItems;
                        if (err) {
                            res.send(err);
                        }
                        if (recipe) {
                            recipe.save(function(err) {
                                if(err) {
                                    res.send(err);
                                }
                                res.status(201).json(recipe);
                            });
                        }
                    });
                } else {
                    res.send('Recipe already exists.');
                }
            });
        }
        else {
            res.send('You do not have access to update this recipe.');
        }
    });

    // delete individual recipe
    app.delete('/api/recipes/:recipeId', stormpath.loginRequired, function(req, res) {

        var recipeId = req.params.recipeId;
        Recipes.findById(recipeId, function (err, recipe) {
            if(err) {
                res.send(err);
            }
            if (recipe) {
                if(req.user.username == recipe.addedBy.username || req.user.groups.items[0].name == 'Admin') {
                    recipe.remove(function(err) {
                        if(err) {
                            res.send(err);
                        }
                        res.json();
                    });
                } else {
                    res.send('You do not have access to delete this recipe.');
                }
            }
        });
    });

    //upload image to cloudinary cdn
    app.post('/api/upload', upload.single('file'), function(req,res,next){
      if(req.file) {
        var fileName = req.file.originalname.split('.');
        var randomNumber = Math.floor((Math.random() * 100000) + 1);
        fileName = fileName[0];



        cloudinary.uploader.upload(req.file.path, function(result, error) {
            if(result.url) {
                res.status(200).json({
                    fileUrl: result.url,
                    fileWidth: result.width,
                    fileHeight: result.height
                });
            } else {
                res.json(error);
            }
        }, { 
            public_id: randomNumber + '/' + fileName,
            overwrite: false,
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
            eager: [
                { width: 1000, angle: 'exif' }, 
                { width: 300, height: 200, crop: "fill", angle: 'exif' }, 
                { width: 300, height: 300, crop: "fill", angle: 'exif' } 
            ]
        });
      } else {
        console.log('no file specified');
        res.json(200);
      }

    });

    // authentication routes
    app.get('/auth/user', function (req, res) {
      if (!req.user || req.user.status !== 'ENABLED') {
        return res.redirect('/login');
      }
      res.status(201).json(req.user);
    });

    //update user profiles (stormpath)
    app.post('/auth/user/photo', stormpath.loginRequired, function(req, res, next) {
      var photoUrl = req.body.photoUrl;
      req.user.customData.photoUrl = photoUrl;
      req.user.customData.save(function(err) {
        if (err) {
          next(err);  // this will throw an error if something breaks when you try to save your changes
        } else {
          res.send('success!');
        }
      });
    });

    app.post('/auth/user/fontSize', stormpath.loginRequired, function(req, res, next) {
      var fontSize = req.body.fontSize;
      req.user.customData.fontSize = fontSize;
      req.user.customData.save(function(err) {
        if (err) {
          next(err);  // this will throw an error if something breaks when you try to save your changes
        } else {
          res.send('success!');
        }
      });
    });

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.render('index', function(err, html) {
            res.send(html);
        });
    });

};