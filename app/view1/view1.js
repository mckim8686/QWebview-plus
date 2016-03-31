'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$document', function($scope, $document) {
  $scope.code = '';
  $scope.item = null;

  var requestUserInfo = function() {
    console.log('requestUserInfo');
    kiwoom.getLoginInfo('ACCNO');
  };

  $scope.search = function() {
    kiwoom.setInputValue("종목코드",$scope.code);
    kiwoom.commRqData("주식기본정보", "opt10001", 0, "0001");
  };

  $scope.order = function () {

  };

  $document.on('receiveTrData.kiwoom', function(e){
    var data = e.detail;
    var len = kiwoom.getRepeatCnt(data.trCode, data.rQName);
    console.info(data);

    switch(data.trCode) {
      case "opt10001":
        var current = kiwoom.plusGetTrData(data.trCode, data.rQName, 0, "현재가");
        var p = '';
        if(current.indexOf('+') != -1) {
          p = '+';
        } else if(current.indexOf('-') != -1) {
          p = '-';
        }
        current = Math.abs(parseInt(current,10));
        $scope.item = {
          name: kiwoom.plusGetTrData(data.trCode, data.rQName, 0, "종목명"),
          current: current,
          sign: p
        };
        break;
      default:
        console.log('unknown tr code');
        break;
    }
    $scope.$apply();
  });

  $document.on('receiveMsg', function(e){
    console.info(e);
  });

  requestUserInfo();
}]);