angular.module('MealsCtrl', []).controller('MealsController', function(Page, MealsResource, $scope, _) {
  var vm = this;

  Page.setTitle('Weekly Meals');   
  vm.title = 'Weekly Meal Suggestions';

  vm.day = moment.utc();
  vm.addItemToCalendar = addItemToCalendar;

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
    return date.hour(0).minute(0).second(0).millisecond(0);
  }

  function _buildMonth(start, month) {
    console.log('begin _buildMonth');
    $scope.weeks = [];
    var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
    var startDate = formattedDate(date, 'MMDDYYYY');
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
    endDate = formattedDate(endDate, 'MMDDYYYY');

    getMonthlyMeals(startDate, endDate); 
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

  function getMonthlyMeals(start, end) {
    MealsResource.getMonthlyMeals(start, end)
      .success(function (data) { 
        vm.monthlyMeals = data;
      });
  }

  function addItemToCalendar(individualDate) {
    if(vm.monthlyMeals) {
      return _.find(vm.monthlyMeals, function(o) { return o.date == individualDate; });
    }
  }
});