angular.module('PortfolioCtrl', []).controller('PortfolioController', function($http, Page, $location) {
  var vm = this;

  Page.setTitle('Portfolio');  
  vm.title = 'Portfolio';

  $http.get('/api/portfolio')
    .success(function (res) {
      vm.list = res;
    });
});
