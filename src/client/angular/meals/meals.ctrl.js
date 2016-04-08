angular.module('MealsCtrl', []).controller('MealsController', function(Page, MealsResource, $scope) {
  var vm = this;

  Page.setTitle('Weekly Meals');   
  vm.title = 'Weekly Meal Suggestions';

  vm.day = moment();

  MealsResource.getAll()
    .success(function (res) {
      vm.items = res;
      
      // for(i = 0; i < vm.items.length; i++) {
      //   for(j = 0; j < vm.items[i].length; j++) {
      //     if(vm.items[i][j].image.main.src) {
      //       var imageUrl = vm.items[i][j].image.main.src;
      //       var sizedImage = getProperImageSize(imageUrl, 300, 200);
      //       vm.items[i][j].image.main.src = sizedImage;
      //     }
      //   }
      // }
    });

  function getProperImageSize(imageUrl, imageWidth, imageHeight) {
    if(imageUrl.indexOf('image/upload') > -1) {
      var imagePath = imageUrl.split('image/upload');
      imagePath = imagePath[0] + 'image/upload/a_exif,c_fill,h_' + imageHeight + ',w_' + imageWidth + imagePath[1];
      return imagePath;
    }
  }

});