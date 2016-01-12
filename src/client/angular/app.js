var app = angular.module('app', [
  'ui.router',
  'ngAnimate', 
  'appRoutes', 
  'stormpath',
  'stormpath.templates',
  'ngFileUpload',
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