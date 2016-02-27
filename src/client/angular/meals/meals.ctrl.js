angular.module('MealsCtrl', []).controller('MealsController', function(Page, $scope) {
  var vm = this;

  Page.setTitle('Weekly Meals');   
  vm.title = 'Weekly Meal Suggestions';

  vm.day = moment();

  // vm.modalShown = false;
  // $scope.toggleModal = function(meal) {
  //   $scope.mealDescription = meal;
  //   vm.modalShown = !vm.modalShown;
  // };

  vm.items = [
    [
      {
        entree: "Mac & Cheese",
        published: true
      },
      {
        entree: "Steak",
        published: true
      },
      {
        entree: "Potatoes",
        published: true
      },
      {
        entree: "Quesadilla",
        published: true
      }
    ],
    [
      {
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
        entree: {
          title: "Apricot Chicken",
          categoryKey: "entrees",
          key: "apricot-chicken"
        },
        appetizers: ["broccoli", "applesauce"],
        sides: ["broccoli", "applesauce"],
        drinks: ["Milk"],
        desserts: ["Chocolate Chip Cookies"],
        prepTime: 35,
        cookTime: 25,
        mealUrl: "http://www.google.com",
        published: true
      },
      {
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
        entree: {
          title: "Apricot Chicken",
          categoryKey: "entrees",
          key: "apricot-chicken"
        },
        appetizers: ["broccoli", "applesauce"],
        sides: ["broccoli", "applesauce"],
        drinks: ["Milk"],
        desserts: ["Chocolate Chip Cookies"],
        prepTime: 35,
        cookTime: 25,
        mealUrl: "http://www.google.com",
        published: true
      },
      {
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
        entree: {
          title: "Apricot Chicken",
          categoryKey: "entrees",
          key: "apricot-chicken"
        },
        appetizers: ["broccoli", "applesauce"],
        sides: ["broccoli", "applesauce"],
        drinks: ["Milk"],
        desserts: ["Chocolate Chip Cookies"],
        prepTime: 35,
        cookTime: 25,
        mealUrl: "http://www.google.com",
        published: true
      },
      {
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
        entree: {
          title: "Apricot Chicken",
          categoryKey: "entrees",
          key: "apricot-chicken"
        },
        appetizers: ["broccoli", "applesauce"],
        sides: ["broccoli", "applesauce"],
        drinks: ["Milk"],
        desserts: ["Chocolate Chip Cookies"],
        prepTime: 35,
        cookTime: 25,
        mealUrl: "http://www.google.com",
        published: true
      },
      {
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
        entree: {
          title: "Apricot Chicken",
          categoryKey: "entrees",
          key: "apricot-chicken"
        },
        appetizers: ["broccoli", "applesauce"],
        sides: ["broccoli", "applesauce"],
        drinks: ["Milk"],
        desserts: ["Chocolate Chip Cookies"],
        prepTime: 35,
        cookTime: 25,
        mealUrl: "http://www.google.com",
        published: true
      },
      {
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
        entree: {
          title: "Apricot Chicken",
          categoryKey: "entrees",
          key: "apricot-chicken"
        },
        appetizers: ["broccoli", "applesauce"],
        sides: ["broccoli", "applesauce"],
        drinks: ["Milk"],
        desserts: ["Chocolate Chip Cookies"],
        prepTime: 35,
        cookTime: 25,
        mealUrl: "http://www.google.com",
        published: true
      },
      {
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
        entree: {
          title: "Apricot Chicken",
          categoryKey: "entrees",
          key: "apricot-chicken"
        },
        appetizers: ["broccoli", "applesauce"],
        sides: ["broccoli", "applesauce"],
        drinks: ["Milk"],
        desserts: ["Chocolate Chip Cookies"],
        prepTime: 35,
        cookTime: 25,
        mealUrl: "http://www.google.com",
        published: true
      },
      {
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
        entree: {
          title: "Apricot Chicken",
          categoryKey: "entrees",
          key: "apricot-chicken"
        },
        appetizers: ["broccoli", "applesauce"],
        sides: ["broccoli", "applesauce"],
        drinks: ["Milk"],
        desserts: ["Chocolate Chip Cookies"],
        prepTime: 35,
        cookTime: 25,
        mealUrl: "http://www.google.com",
        published: true
      },
      {
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1454038102/10302/chocolate-chip-cookies.jpg",
        entree: {
          title: "Chocolate Chip Cookies",
          categoryKey: "appetizers",
          key: "testing-now"
        },
        appetizers: ["broccoli", "applesauce"],
        sides: ["cake", "ice cream"],
        drinks: ["Milk"],
        desserts: ["Chocolate Chip Cookies"],
        prepTime: 35,
        cookTime: 25,
        mealUrl: "http://www.chocolate.com",
        published: true
      },
      {
        image: null,
        entree: {
          title: null,
          categoryKey: null,
          key: null
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
        published: false
      },
      {
        image: null,
        entree: {
          title: null,
          categoryKey: null,
          key: null
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
        published: false
      },
      {
        image: null,
        entree: {
          title: null,
          categoryKey: null,
          key: null
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
        published: false
      },
      {
        image: null,
        entree: {
          title: null,
          categoryKey: null,
          key: null
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
        published: false
      },
      {
        image: null,
        entree: {
          title: null,
          categoryKey: null,
          key: null
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
        published: false
      },
      {
        image: null,
        entree: {
          title: null,
          categoryKey: null,
          key: null
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
        published: false
      },
      {
        image: null,
        entree: {
          title: null,
          categoryKey: null,
          key: null
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
        published: false
      },
      {
        image: null,
        entree: {
          title: null,
          categoryKey: null,
          key: null
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
        published: false
      },
      {
        image: null,
        entree: {
          title: null,
          categoryKey: null,
          key: null
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
        published: false
      },
      {
        image: null,
        entree: {
          title: null,
          categoryKey: null,
          key: null
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
        published: false
      },
      {
        image: null,
        entree: {
          title: null,
          categoryKey: null,
          key: null
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
        published: false
      },
      {
        image: null,
        entree: {
          title: null,
          categoryKey: null,
          key: null
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
        published: false
      },
      {
        image: null,
        entree: {
          title: null,
          categoryKey: null,
          key: null
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
        published: false
      },
      {
        image: null,
        entree: {
          title: null,
          categoryKey: null,
          key: null
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
        published: false
      },
      {
        image: null,
        entree: {
          title: null,
          categoryKey: null,
          key: null
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
        published: false
      },
      {
        image: null,
        entree: {
          title: null,
          categoryKey: null,
          key: null
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
        published: false
      },
      {
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
        entree: {
          title: "Apricot Chicken",
          categoryKey: "entrees",
          key: "apricot-chicken"
        },
        appetizers: ["broccoli", "applesauce"],
        sides: ["broccoli", "applesauce"],
        drinks: ["Milk"],
        desserts: ["Chocolate Chip Cookies"],
        prepTime: 35,
        cookTime: 25,
        mealUrl: "http://www.google.com",
        published: true
      },
      {
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
        entree: {
          title: "Apricot Chicken",
          categoryKey: "entrees",
          key: "apricot-chicken"
        },
        appetizers: ["broccoli", "applesauce"],
        sides: ["broccoli", "applesauce"],
        drinks: ["Milk"],
        desserts: ["Chocolate Chip Cookies"],
        prepTime: 35,
        cookTime: 25,
        mealUrl: "http://www.google.com",
        published: true
      },
      {
        image: null,
        entree: {
          title: null,
          categoryKey: null,
          key: null
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
        published: false
      },
      {
        image: null,
        entree: {
          title: null,
          categoryKey: null,
          key: null
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
        published: false
      },
    ],
    [
      {
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1452576656/banana-bread.jpg",
        entree: "Chocolate Test Cookies",
        categoryKey: "cookies",
        key: "chocolate-test-cookies",
        published: true
      },
      {
        entree: "Bacon",
        published: true
      },
      {
        entree: "Sausage",
        published: true
      },
      {
        entree: "Pancakes",
        published: true
      }
    ]
  ];

});