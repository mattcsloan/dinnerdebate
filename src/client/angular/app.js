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
  'PostsCtrl',
  'PostsCreateCtrl',
  'PostsEditCtrl',
  'PostsViewCtrl',
  'PortfolioCtrl',
  'PortfolioDetailCtrl'
]);

app.run(function($stormpath){
  $stormpath.uiRouter({
    loginState: 'login',
    defaultPostLoginState: 'dashboard'
  });
});