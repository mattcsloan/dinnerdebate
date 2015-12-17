angular.module('PostsViewCtrl', []).controller('PostsViewController', function(Page, Post, $http, postId) {
  var vm = this;

  Page.setTitle('View Post');   
  vm.title = 'View Post';
  vm.postId = postId;


  $http.get('/api/posts/' + postId)
    .success(function (res) {
      vm.postDetail = res;
    });
});