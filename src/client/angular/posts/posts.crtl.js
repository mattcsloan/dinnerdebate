angular.module('PostsCtrl', []).controller('PostsController', function (Page, Post) {
  var vm = this;

  Page.setTitle('All Posts');   
  vm.title = 'All Posts';

  Post.getAll()
    .success(function(data, status) {
      vm.posts = data;
    })
    .error(function(data, status) {
      console.log("Error retreiving posts");
    });
});