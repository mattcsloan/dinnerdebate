var app = angular.module('app', [
  'ui.router',
  'ngAnimate', 
  'appRoutes', 
  'stormpath',
  'stormpath.templates',
  'app.factories', 
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