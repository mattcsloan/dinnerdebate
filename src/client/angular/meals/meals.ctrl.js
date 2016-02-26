angular.module('MealsCtrl', []).controller('MealsController', function(Page) {
  var vm = this;

  Page.setTitle('Weekly Meals');   
  vm.title = 'Weekly Meal Suggestions';

  vm.day = moment();

  vm.items = [
    [
      {
        entree: "Mac & Cheese"
      },
      {
        entree: "Steak"
      },
      {
        entree: "Potatoes"
      },
      {
        entree: "Quesadilla"
      }
    ],
    [
      {
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
        entree: "Apricot Chicken",
        categoryKey: "entrees",
        key: "apricot-chicken"
      },
      {
        entree: "Yogurt"
      },
      {
        entree: "Cheese"
      },
      {
        entree: "Bread"
      }
    ],
    [
      {
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1452576656/banana-bread.jpg",
        entree: "Chocolate Test Cookies",
        categoryKey: "cookies",
        key: "chocolate-test-cookies"
      },
      {
        entree: "Bacon"
      },
      {
        entree: "Sausage"
      },
      {
        entree: "Pancakes"
      }
    ]
  ];

});