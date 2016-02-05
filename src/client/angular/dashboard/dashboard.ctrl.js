angular.module('DashboardCtrl', []).controller('DashboardController', function(Page, $http, $rootScope, $timeout, Upload) {
  var vm = this;
  vm.uploadFile = uploadFile;
  vm.removeImage = removeImage;
  vm.addCustomData = addCustomData;
  vm.profileImage = $rootScope.user.customData.photoUrl;

  Page.setTitle('Dashboard');   
  vm.title = 'Dashboard';

  $http.get('/api/recipes/by/user')
    .success(function(data) {
      vm.userRecipes = data;
      checkRecipeOwnership();
    })
    .error(function() {
      console.log('error');
    });

  vm.user = $rootScope.user

  function checkRecipeOwnership() {
    vm.usersOwnRecipes = [];
    vm.userAddedRecipes = [];
    angular.forEach(vm.userRecipes, function(item) {
      //only add recipes that don't have an alternate source
      if(item.sourceURL == '' && item.source == '') {
        vm.usersOwnRecipes.push(item);
      } else{
        vm.userAddedRecipes.push(item);
      }
    });
  }

  function addCustomData(photoUrl) {
    $http.post('/auth/user/photo', {
      photoUrl: photoUrl
    });
  }

  function removeImage() {
    vm.profileImage = null;
    addCustomData('')
  }

  function uploadFile(file, errFiles) {
    vm.f = file;
    vm.errFile = errFiles && errFiles[0];
    if (file) {
      file.upload = Upload.upload({
          url: '/api/upload',
          data: {file: file}
      });

      file.upload.then(function (response) {
          $timeout(function () {
            vm.profileImage = response.data;
            if(vm.profileImage.indexOf('image/upload') > -1) {
              var thumbUrl = vm.profileImage.split('image/upload');
              thumbUrl = thumbUrl[0] + 'image/upload/w_280,h_280,c_fill' + thumbUrl[1]
              vm.profileImage = thumbUrl;
            }
            addCustomData(vm.profileImage);
          });
      }, function (response) {
          if (response.status > 0)
              vm.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    } 
  }


});