angular.module('MealsCtrl', []).controller('MealsController', function(Page, $scope) {
  var vm = this;

  Page.setTitle('Weekly Meals');   
  vm.title = 'Weekly Meal Suggestions';

  vm.day = moment();

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
        image: {
          main: {
            src: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
            categoryKey: null,
            key: "apricot-chicken",
            link: null
          },
          secondary: [{
            src: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
            categoryKey: "entrees",
            key: "apricot-chicken",
            link: null
          }, {
            src: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
            categoryKey: "entrees",
            key: "apricot-chicken",
            link: null
          }]
        },
        entree: {
          title: "Apricot Chicken",
          categoryKey: "entrees",
          key: "apricot-chicken"
        },
        appetizers: [{
          title: "broccoli",
          categoryKey: "entrees",
          key: "apricot-chicken"
        }, {
          title: "broccoli",
          categoryKey: null,
          key: null
        }],
        sides: [{
          title: "broccoli",
          categoryKey: null,
          key: null
        }, {
          title: "broccoli",
          categoryKey: null,
          key: null
        }],
        drinks: [{
          title: "Milk",
          categoryKey: null,
          key: null
        }],
        desserts: [{
          title: "Chocolate Chip Cookies",
          categoryKey: null,
          key: null
        }],
        prepTime: 35,
        cookTime: 25,
        mealUrl: "http://www.google.com",
        published: true
      },
      {
        image: {
          main: {
            src: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1454992240/96092/banana-bread.jpg",
            categoryKey: "entrees",
            key: "apricot-chicken",
            link: "http://www.google.com"
          },
          secondary: [{
            src: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
            categoryKey: "entrees",
            key: "apricot-chicken",
            link: null
          }, {
            src: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
            categoryKey: null,
            key: null,
            link: "http://www.thedinnerdebate.com"
          }]
        },
        entree: {
          title: "Banana Bread",
          categoryKey: "breads-and-muffins",
          key: "banana-bread"
        },
        appetizers: null,
        sides: [{
          title: "bananas",
          categoryKey: null,
          key: null
        }, {
          title: "walnuts",
          categoryKey: null,
          key: null
        }],
        drinks: [{
          title: "Chocolate Milk",
          categoryKey: null,
          key: null
        }],
        desserts: null,
        prepTime: 35,
        cookTime: 25,
        mealUrl: "http://www.google.com",
        published: true
      },
      {
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1454992240/96092/banana-bread.jpg",
        entree: {
          title: "Banana Bread",
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
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1454606793/89532/sweet-and-sour-pork-chops.jpg",
        entree: {
          title: "Sweet & Sour Chicken",
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
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1454605945/62774/green_chile_enchiladas.jpg",
        entree: {
          title: "Chicken Enchiladas",
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
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1454967882/37591/DSC_1030-won-tons.jpg",
        entree: {
          title: "Won Tons",
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
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1454993417/42196/DSC_1043-chicken-basil-calzone.jpg",
        entree: {
          title: "Chicken & Basil Calzones",
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
        image: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1456634651/78013/DSC_1284-black-white-chili-sm.jpg",
        entree: {
          title: "Black & White Chili",
          categoryKey: "soups",
          key: "black-and-white-chili-2"
        },
        appetizers: null,
        sides: null,
        drinks: null,
        desserts: null,
        prepTime: null,
        cookTime: null,
        mealUrl: null,
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
        image: {
          main: {
            src: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
            categoryKey: null,
            key: "apricot-chicken",
            link: null
          },
          secondary: [{
            src: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
            categoryKey: "entrees",
            key: "apricot-chicken",
            link: null
          }, {
            src: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
            categoryKey: "entrees",
            key: "apricot-chicken",
            link: null
          }]
        },
        entree: {
          title: "Some Chicken",
          categoryKey: "entrees",
          key: "apricot-chicken"
        },
        appetizers: [{
          title: "some",
          categoryKey: null,
          key: null
        }, {
          title: "chicken",
          categoryKey: null,
          key: null
        }],
        sides: [{
          title: "nom nom",
          categoryKey: null,
          key: null
        }, {
          title: "nom",
          categoryKey: null,
          key: null
        }],
        drinks: [{
          title: "Wine",
          categoryKey: null,
          key: null
        }],
        desserts: [{
          title: "Cake",
          categoryKey: null,
          key: null
        }],
        prepTime: 35,
        cookTime: 25,
        mealUrl: "http://www.februaryfood.com",
        published: true
      }
    ],
    [
      {
        image: {
          main: {
            src: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
            categoryKey: "entrees",
            key: "apricot-chicken",
            link: null
          },
          secondary: [{
            src: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
            categoryKey: "entrees",
            key: "apricot-chicken",
            link: null
          }, {
            src: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1455987881/29205/DSC_1168-apricot-chicken-sm.jpg",
            categoryKey: "entrees",
            key: "apricot-chicken",
            link: null
          }]
        },
        entree: {
          title: "March Meal",
          categoryKey: "entrees",
          key: "apricot-chicken"
        },
        appetizers: null,
        sides: [{
          title: "Broccoli",
          categoryKey: null,
          key: null
        }, {
          title: "Applesauce",
          categoryKey: null,
          key: null
        }],
        drinks: [{
          title: "Milk",
          categoryKey: null,
          key: null
        }],
        desserts: null,
        prepTime: 35,
        cookTime: 25,
        mealUrl: "http://www.marchfood.com",
        published: true
      },
      {
        image: {
          main: {
            src: "http://res.cloudinary.com/sloan/image/upload/a_exif,c_fill,h_200,w_300/v1454993417/42196/DSC_1043-chicken-basil-calzone.jpg",
            categoryKey: "entrees",
            key: "apricot-chicken",
            link: null
          },
          secondary: null
        },
        entree: {
          title: "Chicken & Basil Calzones",
          categoryKey: "entrees",
          key: "chicken-basil-calzones"
        },
        appetizers: null,
        sides: [{
          title: "House Salad",
          categoryKey: "entrees",
          key: "apricot-chicken"
        }],
        drinks: [{
          title: "Iced Tea",
          categoryKey: null,
          key: null
        }],
        desserts: null,
        prepTime: 35,
        cookTime: 25,
        mealUrl: "http://www.calzones.com",
        published: true
      },
    ]
  ];
});