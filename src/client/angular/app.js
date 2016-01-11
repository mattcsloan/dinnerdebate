var app = angular.module('app', [
  'ui.router',
  'ngAnimate', 
  'appRoutes', 
  'stormpath',
  'stormpath.templates',
  'cloudinary',
  'app.factories',
  'app.filters',
  'MainCtrl', 
  'LoginCtrl', 
  'RegisterCtrl', 
  'HomeCtrl', 
  'DashboardCtrl', 
  'RecipesCtrl',
  'RecipesCreateCtrl',
  'RecipesEditCtrl',
  'RecipesViewCtrl'
]);

app.run(function($stormpath){
  $stormpath.uiRouter({
    loginState: 'login',
    defaultPostLoginState: 'dashboard'
  });
});

function configure(CloudinaryProvider) {
  CloudinaryProvider.configure({
    cloud_name: 'sloan',
    api_key: '322518488897182'
  });
}

angular
    .module('app')
    .config(['CloudinaryProvider', configure]);