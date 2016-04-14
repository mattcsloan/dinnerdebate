angular.module('MealsCtrl', []).controller('MealsController', function(Page, MealsResource, $scope) {
  var vm = this;

  Page.setTitle('Weekly Meals');   
  vm.title = 'Weekly Meal Suggestions';

  vm.day = moment();

  calendarSetUp();

  function getProperImageSize(imageUrl, imageWidth, imageHeight) {
    if(imageUrl.indexOf('image/upload') > -1) {
      var imagePath = imageUrl.split('image/upload');
      imagePath = imagePath[0] + 'image/upload/a_exif,c_fill,h_' + imageHeight + ',w_' + imageWidth + imagePath[1];
      return imagePath;
    }
  }

  $scope.formattedDate = function(date) {
    return moment(date).format('ddd MMMM DD, YYYY');
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
    while (!done) {
      $scope.weeks.push({
        days: _buildWeek(date.clone(), month),
        isCurrentWeek: date.week() === moment().week()
      });
      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
  }

  function _buildWeek(date, month) {
    var days = [];
    for (var i = 0; i < 7; i++) {

      // get meal data for each day of the week
      var dailyMeal = getMealData(date);

      days.push({
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        month: date.month(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date,
        data: dailyMeal
      });
      date = date.clone();
      date.add(1, "d");
    }
    return days;
  }

  function getMealData(date) {
    MealsResource.getByDate(moment(date).format('MMDDYYYY'))
      .success(function (res) { 
        return res;
      });
  }

});