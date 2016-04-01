'use strict';

angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ['$scope', '$document', function ($scope, $document) {
    $scope.code = '';
    $scope.item = null;
    $scope.accounts = [];
    $scope.model = {
      midPrice: null,
      margin: null,
      amounts: null,
      selectedAccount: null
    };

    var requestUserInfo = function () {
      var accs = kiwoom.getLoginInfo('ACCNO').split(';');
      for (var i in accs) {
        var acc = accs[i];
        if (acc.length == 10) {
          $scope.accounts.push(acc);
        }
      }
      $scope.model.selectedAccount = $scope.accounts[0];
    };


    var errorHandler = function (err) {
      switch (err) {
        case 0:
          console.log('정상처리');
          break;
        case -100:
          console.log('사용자정보교환에 실패하였습니다. 잠시후 다시 시작하여 주십시오.');
          break;
        case -101:
          console.log('서버 접속 실패');
          break;
        case -102:
          console.log('버전처리가 실패하였습니다');
          break;
        case -200:
          console.log('시세조회 과부하');
          break;
        case -201:
          console.log('REQUEST_INPUT_st Failed');
          break;
        case -202:
          console.log('요청 전문 작성 실패');
          break;
        case -300:
          console.log('주문 입력값 오류');
          break;
        case -301:
          console.log('계좌비밀번호를 입력하십시오.');
          break;
        case -302:
          console.log('타인계좌는 사용할 수 없습니다.');
          break;
        case -303:
          console.log('주문가격이 20억원을 초과합니다.');
          break;
        case -304:
          console.log('주문가격은 50억원을 초과할 수 없습니다.');
          break;
        case -305:
          console.log('주문수량이 총발행주수의 1%를 초과합니다.');
          break;
        case -306:
          console.log('주문수량은 총발행주수의 3%를 초과할 수 없습니다.');
          break;
        default:
          console.log('unknown error : ' + err);
          break;
      }
    };

    $scope.search = function () {
      kiwoom.setInputValue("종목코드", $scope.code);
      kiwoom.commRqData("주식기본정보", "opt10001", 0, "0001");
    };

    $scope.order = function () {
      var err = kiwoom.sendOrder('RQ_1', '0101', $scope.model.selectedAccount, 1, $scope.code,
        $scope.model.amounts, $scope.model.midPrice, '00', '');
      console.log($scope.model);
      errorHandler(err);
    };

    $document.on('receiveTrData.kiwoom', function (e) {
      var data = e.detail;
      var len = kiwoom.getRepeatCnt(data.trCode, data.rQName);

      switch (data.trCode) {
        case "opt10001":
          var current = kiwoom.plusGetTrData(data.trCode, data.rQName, 0, "현재가");
          var p = '';
          if (current.indexOf('+') != -1) {
            p = '+';
          } else if (current.indexOf('-') != -1) {
            p = '-';
          }
          current = Math.abs(parseInt(current, 10));
          $scope.item = {
            name: kiwoom.plusGetTrData(data.trCode, data.rQName, 0, "종목명"),
            current: current,
            sign: p
          };
          $scope.model.midPrice = current;
          break;
        default:
          console.log('unknown tr code' + data.trCode);
          break;
      }
      $scope.$apply();
    });

    $document.on('receiveMsg.kiwoom', function (e) {
      console.info('receiveMsg.kiwoom');
      console.info(e);
    });

    $document.on('receiveRealData.kiwoom', function(e){
      var data = e.detail;
      if (data.realType == '주식체결' || data.realType == '종목프로그램매매') {

      } else {
        console.info("실시간데이터", {
          "jongmokCode": data.jongmokCode,
          "realType": data.realType,
          "realData": data.realData
        });
        console.log(kiwoom.plusGetRealData(data.jongmokCode, data.realType, 10));
      }
    });

    $document.on('receiveChejanData.kiwoom', function(e){
      console.info('receiveChejanData.kiwoom');
      console.info(e);
    });

    $document.on('receiveCondition.kiwoom', function(e){
      console.info('receiveCondition.kiwoom');
      console.info(e);
    });

    $document.on('receiveTrCondition.kiwoom', function(e){
      console.info('receiveTrCondition.kiwoom');
      console.info(e);
    });

    requestUserInfo();
  }]);