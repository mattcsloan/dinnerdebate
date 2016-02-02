// modules =================================================
var express        = require('express');
var stormpath      = require('express-stormpath')
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');
var multer         = require('multer');

// configuration ===========================================
    
// config files
var db = require('./src/server/config/db');

// set our port
var port = process.env.PORT || 5000; 


// connect to our mongoDB database 
mongoose.connect(db.url); 

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// initialize stormpath middleware
app.use(stormpath.init(app, {
  // Optional configuration options.
  website: true,
  expand: {
    customData: true,
    groups: true
  },
  web: {
    login: {
      enabled: true,
      nextUri: "/dashboard"
    },
    register: {
      autoLogin: true,
      nextUri: '/dashboard'    // Where to send the user to, if auto login is enabled
    },
    logout: {
      enabled: true,
      nextUri: '/'
    }
  },
  debug: 'info, error'
}));

// app.use(multer({
//   dest: __dirname + '/dist/uploads/'
// }));

multer({ dest: 'uploads/' })

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/dist')); 

app.set('views', __dirname + '/src/server/views');
app.set('view engine', 'jade');

// routes ==================================================
require('./src/server/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080 once stormpath has initialized
// Once Stormpath has initialized itself, start your web server!
app.on('stormpath.ready', function () {
  var server = app.listen(port, function() {
    console.log('Running on port ' + port);
  });               
});

// expose app           
exports = module.exports = app;