(function () {
    "use strict";

    angular.module("myapp", ["ionic", "ionic-material", "ionic-timepicker", "myapp.controllers", "myapp.services"])
	.run(function ($ionicPlatform,$ionicLoading) {
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
			//
        })
		
		.config(function (ionicTimePickerProvider) {
    var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
    ionicTimePickerProvider.configTimePicker(timePickerObj);
  })
        
		.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $logProvider) {
            
			
			$logProvider.debugEnabled(false);
			
            $stateProvider
                .state("app", {
                    url: "/app",
                    abstract: true,
                    templateUrl: "app/templates/view-menu.html",
                    controller: "appCtrl"
                })
                .state("app.home", {
                    url: "/home",
                    templateUrl: "app/templates/view-home.html",
                    controller: "homeCtrl"
                })
                ;

				
            $urlRouterProvider.otherwise("/app/home");
        });
})();
