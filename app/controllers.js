(function () {
    "use strict";

    angular.module("myapp.controllers", [])


      .controller("appCtrl", function ($ionicPopup, getLocalStorage,ionicMaterialInk ,$scope,$http, $ionicModal, ionicTimePicker) {
	

	 var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
		
		$scope.currentAlarm.atime = selectedTime.getUTCHours()+':' + selectedTime.getUTCMinutes();
      }
    },
    inputTime: 21600,
    format: 24,
    step: 1,
    setLabel: 'Set'
  };
  
  $scope.openTimePicker = function() {
   ionicTimePicker.openTimePicker(ipObj1);
  }
	
	
	
	
		$scope.currentAlarm = {};
		//dummy data
		if(!window.localStorage['alarmdata']){
			var alarmdataArr = [{"aname":"Workout Alarm","atime":"05:50","astatus":true},{"aname":"Morning Alarm","atime":"04:00","astatus":true},{"aname":"Cat Food Time","atime":"10:00","astatus":true}];
			localStorage.setItem("alarmdata", angular.toJson(alarmdataArr));
		}
		
		$scope.alarmdata = getLocalStorage.getalarmdata();  
        $scope.count = $scope.alarmdata.length;    

			
			ionicMaterialInk.displayEffect();			
			
			$ionicModal.fromTemplateUrl('alarm.html', {
				scope: $scope
			  }).then(function(modal) {
				$scope.modalAlarm = modal;
			  });						
			
			$scope.closeModal = function() {
                $scope.modalAlarm.hide();
				$scope.currentAlarm.aname='';
				$scope.currentAlarm.atime='';
				$scope.alarmdata = getLocalStorage.getalarmdata();
            };
			
			var time = new Date();
			
			$scope.alertb = function() {
				 var time = new Date();
				 console.log(time.getHours()+":"+time.getMinutes());
				for(var i=0;i<$scope.count;i++){
					if(time.getHours()+":"+time.getMinutes() == $scope.alarmdata[i].atime && $scope.alarmdata[i].astatus == true){
						// console.log(time);
						// console.log("match");						
						// console.log($scope.alarmdata[i].atime);
						var alertPopup = $ionicPopup.alert({
							title: 'Alert!',
							template: $scope.alarmdata[i].aname
						});
						break;
					}
				 $scope.alerta();
				}
				
			}
			
			// console.log("dfhdfh"+time);
			$scope.alerta = function() {				
				 setTimeout($scope.alertb, 10000); //every 10sec
				 // console.log(time.getSeconds())
            };
			
			$scope.alerta();
			
			$scope.add = function() {
				$scope.editing = false;
                $scope.modalAlarm.show();				
            };
			
			$scope.edit = function(alrm) {
				$scope.editing = true;
				$scope.currentAlarm = alrm;
				console.log($scope.currentAlarm);
				$scope.modalAlarm.show();
			  };

			
			$scope.deleteData = function(alm) {               
				$scope.alarmdata.splice($scope.alarmdata.indexOf(alm), 1);  
                getLocalStorage.updatealarmdata($scope.alarmdata);  
                $scope.count = $scope.alarmdata.length;  
            };
			
			$scope.saveData = function() {
				if($scope.currentAlarm.aname === undefined  && $scope.currentAlarm.atime === undefined ) {
				  console.log('set error in inputs');
				}
				else {		
						if($scope.editing == true) {
						
						$scope.alarmdata[$scope.alarmdata.indexOf($scope.currentAlarm)] = $scope.currentAlarm;
						getLocalStorage.updatealarmdata($scope.alarmdata);
						window.location.reload();
						}
						else{
							
						$scope.alarmdata.push({ 'aname': $scope.currentAlarm.aname, 'atime': $scope.currentAlarm.atime, 'astatus': true});  
						getLocalStorage.updatealarmdata($scope.alarmdata); 			
						
						$scope.count = $scope.alarmdata.length; 
						
						$scope.currentAlarm.aname='';
						$scope.currentAlarm.atime='';
						}
						
				  setTimeout($scope.closeModal, 400);
				  
				  
				}
			  };
			  
			$scope.clicked = function(alrm) {
				console.log(alrm);
				$scope.alarmdata[$scope.alarmdata.indexOf(alrm)] = alrm;
				getLocalStorage.updatealarmdata($scope.alarmdata);
			}; 
			 			  
        })

        //homeCtrl provides the logic for the home screen
        .controller("homeCtrl", function (ionicMaterialInk) {			
			ionicMaterialInk.displayEffect();	
        })

        //errorCtrl managed the display of error messages bubbled up from other controllers, directives, myappService
        .controller("errorCtrl", function ($scope, myappService) {
            //public properties that define the error message and if an error is present
            $scope.error = "";
            $scope.activeError = false;

            //function to dismiss an active error
            $scope.dismissError = function () {
                $scope.activeError = false;
            };

            //broadcast event to catch an error and display it in the error section
            $scope.$on("error", function (evt, val) {
                //set the error message and mark activeError to true
                $scope.error = val;
                $scope.activeError = true;

                //stop any waiting indicators (including scroll refreshes)
                myappService.wait(false);
                $scope.$broadcast("scroll.refreshComplete");

                //manually apply given the way this might bubble up async
                $scope.$apply();
            });
        });
})();