angular.module('DashboardCtrl', []).controller('DashboardController', function(Page, $http, $rootScope, $timeout, Upload) {
  var vm = this;
  vm.uploadFile = uploadFile;
  vm.removeImage = removeImage;
  vm.addCustomData = addCustomData;
  vm.profileImage = $rootScope.user.customData.photoUrl;
  vm.fontSize = $rootScope.user.customData.fontSize;

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

  function addCustomData(item, value) {
    if(item == 'photo') {
      $http.post('/auth/user/' + item, {
        photoUrl: value
      });
    } else if(item == 'fontSize') {
      $http.post('/auth/user/' + item, {
          fontSize: value
        });
    }
  }

  function removeImage() {
    var publicId = vm.profileImage.split('image/upload/a_exif,c_fill,h_300,w_300/')[1];
    publicId = publicId.split('/');
    publicId = publicId[1] + '/' + publicId[2];
    publicId = publicId.replace(/\//g, "%2F");
    $http.delete('/api/upload?id=' + publicId);
    vm.profileImage = null;
    addCustomData('photo', '')
  }

  function uploadFile(file, errFiles) {
    if(vm.profileImage) {
      removeImage();
    }
    vm.f = file;
    vm.errFile = errFiles && errFiles[0];
    if (file) {
      file.upload = Upload.upload({
          url: '/api/upload',
          data: {file: file}
      });

      file.upload.then(function (response) {
          $timeout(function () {
            vm.profileImage = response.data.fileUrl;
            if(vm.profileImage.indexOf('image/upload') > -1) {
              var thumbUrl = vm.profileImage.split('image/upload');
              thumbUrl = thumbUrl[0] + 'image/upload/a_exif,c_fill,h_300,w_300' + thumbUrl[1]
              vm.profileImage = thumbUrl;
            }
            addCustomData('photo', vm.profileImage);
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