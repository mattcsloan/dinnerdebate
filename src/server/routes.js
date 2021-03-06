var navigation = require('./data/navigation');
var meals = require('./data/meals');
var mealsDev = require('./data/meals-dev');
var stormpath = require('express-stormpath');
var Recipes = require('./models/recipes');
var Meals = require('./models/meals');
var cloudinary = require('cloudinary');
var multer = require('multer');
var upload = multer({ dest: './uploads'});

module.exports = function(app) {

    // server routes ===========================================================
    // api calls
    app.get('/api/navigation', function(req, res) {
        res.status(201).json(navigation.items);
    });

    // get all meals
    app.get('/api/meals', function(req, res) {
        // use mongoose to get all recipes in the database
        Meals.find(function(err, meals) {
            if (err) {
                res.send(err);
            }
            res.json(meals); // return all meals in JSON format
        });
    });

    // create meal
    app.post('/api/meals', stormpath.loginRequired, function(req, res) {
        // use mongoose to add a new meal in the database
        var meal = new Meals({
            date: req.body.date,
            mainItem: req.body.mainItem,
            items: req.body.items,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            mealUrl: req.body.mealUrl,
            published: req.body.published
        });
        meal.save(function(err, meals) {
            if(err) {
                res.send(err);
            }
            res.status(201).json(meals);
        });
    });

    //get today's meal
    // app.get('/api/meals/today', function(req, res) {
    //     var d = new Date();
    //     var month = d.getMonth();
    //     var date = d.getDate() - 1;

    //     res.status(201).json(meals.items[month][date]);
    // });

    //get all meals - dev environment
    // app.get('/api/meals/dev', function(req, res) {
    //     res.status(201).json(mealsDev.items);
    // });

    //get meal by date
    app.get('/api/meals/on/:mealDate', function(req, res) {
        var mealDate = req.params.mealDate;
        var month = mealDate.substr(0, 2);
        var day = mealDate.substr(2, 2);
        var year = mealDate.substr(4, 4);
        var timeStamp = year + '-' + month + '-' + day + "T00:00:00.000Z";

        Meals.findOne({
            date: timeStamp
        }, function(err, meal) { 
            if (err) {
                res.send(err);
            }
            if(meal) {
                res.status(201).json(meal);
            } else {
                res.status(201).send("Meal does not exist.");
            }
        });
    });

    //get meals within date range
    app.get('/api/meals/from/:beginDate/to/:endDate', function(req, res) {
        var beginDate = req.params.beginDate;
        var beginMonth = beginDate.substr(0, 2);
        var beginDay = beginDate.substr(2, 2);
        var beginYear = beginDate.substr(4, 4);
        var beginTimeStamp = beginYear + '-' + beginMonth + '-' + beginDay + "T00:00:00.000Z";
        var endDate = req.params.endDate;
        var endMonth = endDate.substr(0, 2);
        var endDay = endDate.substr(2, 2);
        var endYear = endDate.substr(4, 4);
        var endTimeStamp = endYear + '-' + endMonth + '-' + endDay + "T00:00:00.000Z";

        Meals.find({
            date: {$gte: beginTimeStamp, $lte: endTimeStamp}
        }, function(err, meal) { 
            if (err) {
                res.send(err);
            }
            res.status(201).json(meal);
        });
    });

    // update individual meal
    app.put('/api/meals/:mealDate', stormpath.loginRequired, function(req, res) {
        var mealDate = req.params.mealDate;
        var month = mealDate.substr(0, 2);
        var day = mealDate.substr(2, 2);
        var year = mealDate.substr(4, 4);
        var timeStamp = year + '-' + month + '-' + day + "T00:00:00.000Z";

        if(req.user.groups.items[0].name == 'Admin') {
            Meals.findOne({
                date: timeStamp
            }, function(err, meal) { 
                if (err) {
                    res.send(err);
                } else {
                    meal.date = req.body.date;
                    meal.mainItem = req.body.mainItem;
                    meal.items = req.body.items;
                    meal.prepTime = req.body.prepTime;
                    meal.cookTime = req.body.cookTime;
                    meal.mealUrl = req.body.mealUrl;
                    meal.published = req.body.published;

                    meal.save(function(err, meal) {
                        if(err) {
                            res.send(err);
                        }
                        res.status(201).json(meal);
                    });
                }
            });
        }
        else {
            res.send('You do not have access to update this recipe.');
        }
    });

    // delete meal
    app.delete('/api/meals/:mealDate', stormpath.loginRequired, function(req, res) {
        var mealDate = req.params.mealDate;
        var month = mealDate.substr(0, 2);
        var day = mealDate.substr(2, 2);
        var year = mealDate.substr(4, 4);
        var timeStamp = year + '-' + month + '-' + day + "T00:00:00.000Z";

        Meals.findOne({
            date: timeStamp
        }, function(err, meal) { 
            if (err || !meal) {
                res.send('Meal does not exist.');
            }
            if(meal) {
                if(req.user.groups.items[0].name == 'Admin') {
                    meal.remove(function(err) {
                        if(err) {
                            res.send(err);
                        }
                        res.json();
                    });
                }
            }
        });
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

    // get a random individual recipe
    app.get('/api/recipes/random', function(req, res) {
        Recipes.count().exec(function(err, count){
            var randomNum = Math.floor(Math.random() * count);
            Recipes.findOne().skip(randomNum).exec(
                function (err, result) {
                    res.json(result);
                }
            );
        });
    }); 

    // get a random individual recipe (only if it has an image)
    app.get('/api/recipes/random/image/', function(req, res) {
        Recipes.count().exec(function(err, count){
            var randomNum = Math.floor(Math.random() * count);
            Recipes.findOne().where('image').ne(null).skip(randomNum).exec(
                function (err, result) {
                    res.json(result);
                }
            );
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

    //remove image from cloudinary cdn library (to conserve space)
    app.delete('/api/upload', stormpath.loginRequired, function(req, res) {
        var public_id = req.query.id;
        public_id = public_id.split('.')[0];
        cloudinary.api.delete_resources([public_id],
            function(result){
                res.status(201).json('deleted image: ' + public_id);
            }
        );
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