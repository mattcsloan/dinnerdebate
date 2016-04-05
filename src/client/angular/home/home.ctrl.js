angular.module('HomeCtrl', []).controller('HomeController', function(Page, Recipe, MealsResource) {
  var vm = this;

  Page.setTitle('Home');   
  vm.title = 'Home';
  // vm.viewLogin = false;
  // vm.toggleLogin = toggleLogin;
  
  // function toggleLogin() {
  //   if(vm.viewLogin) {
  //     vm.viewLogin = false;
  //   } else {
  //     vm.viewLogin = true;
  //   }
  // }

  // get hero image path

  // TODO: Hook up to actual daily meal
  MealsResource.getToday()
    .success(function (res) {
      vm.todaysRecipe = res;
      if(res.image.main.src) {
        var todaysRecipe = res.image.main.src;
        getProperImageSize(todaysRecipe, 752, 500, 'hero');
      }
    });

  Recipe.getRandomWithImage()
    .success(function(data, status) {
      if(data) {
        vm.randomRecipe = data;
        if(data.image.url && data.image.url !== null) {
          getProperImageSize(data.image.url, 624, 416, 'random');
        }
        if(typeof data.image === 'string') {
          getProperImageSize(data.image, 624, 416, 'random');
        }
      }
    })
    .error(function(data, status) {
      console.log(status + ': ' + data);
    });

  function getProperImageSize(imageUrl, imageWidth, imageHeight, variableName) {
    if(imageUrl.indexOf('image/upload') > -1) {
      var imagePath = imageUrl.split('image/upload');
      imagePath = imagePath[0] + 'image/upload/a_exif,c_fill,h_' + imageHeight + ',w_' + imageWidth + imagePath[1];
      if(variableName == 'hero') {
        vm.heroImage = imagePath;
      } else if(variableName == 'random') {
        vm.randomRecipeImage = imagePath;
      }
    }
  }
});