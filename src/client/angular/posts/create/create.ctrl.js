angular.module('PostsCreateCtrl', []).controller('PostsCreateController', function(Page, Post, $location) {
  var vm = this;

  Page.setTitle('Create New Post');   
  vm.title = 'Create New Post';

  vm.addPost = addPost;

  vm.postTitle;
  vm.postContent;

  function addPost() {
    Post.createNew( 
    { 
     name: vm.postTitle,
     content: vm.postContent
    })
    .success(function (res) {
      $location.url('/posts/view/' + res._id);
    });
  }

});