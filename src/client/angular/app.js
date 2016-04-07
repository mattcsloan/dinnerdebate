var app = angular.module('app', [
  'ui.router',
  'ngAnimate', 
  'smoothScroll', 
  'appRoutes', 
  'stormpath',
  'stormpath.templates',
  'ngFileUpload',
  'app.directives',
  'angularUtils.directives.dirPagination',
  'app.factories',
  'app.filters',
  'MainCtrl', 
  'LoginCtrl', 
  'RegisterCtrl', 
  'HomeCtrl', 
  'DashboardCtrl', 
  'MealsCtrl', 
  'MealsAdminCtrl', 
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