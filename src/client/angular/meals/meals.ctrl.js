angular.module('MealsCtrl', []).controller('MealsController', function(Page, MealsResource, $scope, $location, _) {
  var vm = this;

  Page.setTitle('Weekly Meals');   
  vm.title = 'Weekly Meal Suggestions';
  vm.day = moment.utc();
  vm.qsMessage = $location.search('message');
  vm.getMealInfo = getMealInfo;
  vm.dismiss = dismiss;

  console.log(vm.qsMessage);

  function dismiss() {
    vm.querystring.message = '';
    $location.search('message', null);
  }

  calendarSetUp();

  function getProperImageSize(imageUrl, imageWidth, imageHeight) {
    if(imageUrl.indexOf('image/upload') > -1) {
      var imagePath = imageUrl.split('image/upload');
      imagePath = imagePath[0] + 'image/upload/a_exif,c_fill,h_' + imageHeight + ',w_' + imageWidth + imagePath[1];
      return imagePath;
    }
  }

  function calendarSetUp() {
    $scope.selected = _removeTime($scope.selected || moment());
    $scope.month = $scope.selected.clone();

    var start = $scope.selected.clone();
    start.date(1);
    _removeTime(start.day(0));

    _buildMonth(start, $scope.month);

    $scope.select = function(day) {
      $scope.selected = day.date;  
    };

    $scope.toggleDescription = function(item, date) {
      $scope.mealDescription = item;
      $scope.mealDate = moment(date).format('MMMM D, YYYY');
      getDailyImages(item);
    };

    $scope.next = function() {
      var next = $scope.month.clone();
      _removeTime(next.month(next.month()+1).date(1));
      $scope.month.month($scope.month.month()+1);
      _buildMonth(next, $scope.month);
    };

    $scope.previous = function() {
      var previous = $scope.month.clone();
      _removeTime(previous.month(previous.month()-1).date(1));
      $scope.month.month($scope.month.month()-1);
      _buildMonth(previous, $scope.month);
    };
  }

  function _removeTime(date) {
    return date.day(0).hour(0).minute(0).second(0).millisecond(0);
  }

  function _buildMonth(start, month) {
    $scope.weeks = [];
    var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
    var startDate = formattedDate(date, 'MMDDYYYY');
    var startCount = moment(date);
    while (!done) {
      $scope.weeks.push({
        days: _buildWeek(date.clone(), month),
        isCurrentWeek: date.week() === moment().week()
      });
      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
    var endDate = moment(date).subtract(1, "days");
    var count = endDate.diff(startCount, 'days') + 1;
    endDate = formattedDate(endDate, 'MMDDYYYY');

    getMonthlyMeals(startDate, endDate, count); 
  }

  function _buildWeek(date, month) {
    var days = [];
    for (var i = 0; i < 7; i++) {

      var isoDate = formattedDate(date);

      days.push({
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        month: date.month(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date,
        isoDate: isoDate
      });
      date = date.clone();
      date.add(1, "d");
    }
    return days;
  }

  function formattedDate(date, format) {
    var formattedDate = _removeTime(moment(moment.utc(date)));
    if(format) {
      formattedDate = formattedDate.format(format);
    } else {
      formattedDate = moment(formattedDate).toISOString();
    }
    return formattedDate;
  }

  function getMonthlyMeals(start, end, count) {
    MealsResource.getMonthlyMeals(start, end)
      .success(function (data) { 
        vm.monthlyMeals = data;
        assembleMealCollection(data, start, end, count);
      });
  }

  function assembleMealCollection(data, start, end, count) {
    vm.mealsCollection = [];
    for(i=0;i<count;i++) {
      //get date to test in proper ISO format
      var currentDate = formattedDate(moment(start, "MMDDYYYY").add(i, "days"));

      //check if data has an object with a date that matches currentDate
      var entry = _.find(data, function(o) { 
        // console.log('o.date: ' + o.date);
        // console.log('currentDate: ' + currentDate);
        // console.log(o.date == currentDate);
        return o.date == currentDate; 
      });

      if(entry) {
        if(entry.mainItem.image && entry.mainItem.image.url) {
          var sizedImage = getProperImageSize(entry.mainItem.image.url, 300, 200);
          entry.mainItem.image.url = sizedImage;
        }
        vm.mealsCollection.push(entry);
      } else {
        //no item exists in data for this date
        vm.mealsCollection.push({});
      }
    }
    // console.log(vm.mealsCollection);
  }

  function getMealInfo(date, itemToPull) {
    var dateToCheck = formattedDate(date);
    console.log("dateToCheck: " + dateToCheck);
    var entry = _.find(vm.monthlyMeals, function(o) { 
      console.log("o.date: " + o.date);
      return o.date == dateToCheck; 
    });


    if(entry) {
      switch(itemToPull) {
        case "mealName":
          return entry.mainItem.name;
          break;
        case "mealImage":
          return entry.mainItem.image.url;
        case "mealUrl":
          return entry.mealUrl;
          break;
      }
      
    }
  }

  function getDailyImages(data) {
    vm.dailyImages = [];
    if(data.mainItem.image.url) {
      var mainImage = getProperImageSize(data.mainItem.image.url, 300, 200);
      vm.mainImage = {
        url: mainImage,
        key: data.mainItem.key,
        categoryKey: data.mainItem.categoryKey
      }
    }

    var sections = data.items;
    for(i=0; i<sections.length; i++) {
      if(sections[i].items) {
        var section = sections[i].items;
        for(j=0; j<section.length; j++) {
          var item = section[j];
          if(item.image && item.image.url) {
            var sizedImage = getProperImageSize(item.image.url, 300, 200);
            if(sizedImage !== mainImage) {
              var imageObj = {
                url: sizedImage,
                key: item.key,
                categoryKey: item.categoryKey
              };
              vm.dailyImages.push(imageObj);
            }
          }
        }
      }
    }
  }

});