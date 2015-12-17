angular.module('PostsEditCtrl', []).controller('PostsEditController', function(Page, Post, $http, $location, postId) {
  var vm = this;

  Page.setTitle('Edit Post');   
  vm.title = 'Edit Post';
  vm.postId = postId;
  vm.updatePost = updatePost;
  vm.deletePost = deletePost;

  Post.getOne(postId)
    .success(function(data, status) {
      if(data.name === "CastError") {
        vm.postTitle = "error";
      } else {
        vm.postDetail = data;
        vm.postTitle = vm.postDetail.name;
        vm.postContent = vm.postDetail.content;
      }
    })
    .error(function(data, status) {
      alert("Error retreiving post");
    });

  function updatePost() {
    Post.update(postId, {
      name: vm.postTitle,
      content: vm.postContent
    });
    $location.url('/posts/view/' + postId);
  }

  function deletePost() {
    Post.delete(postId);
    $location.url('/posts');
  }

});