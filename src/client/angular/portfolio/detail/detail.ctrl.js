angular.module('PortfolioDetailCtrl', []).controller('PortfolioDetailController', function($http, Page, portfolioBase, portfolioTitle) {
  var vm = this;
  
  $http.get('/api/portfolio/' + portfolioBase + '/' + portfolioTitle)
    .success(function (res) {
      vm.portfolioDetail = res;
    });
  $http.get('/api/portfolio/preview/' + portfolioBase + '/' + portfolioTitle)
    .success(function (res) {
      vm.portfolioPreview = res;
      Page.setTitle(res.project);
    });
});
