angular.module("myapp.services", [])

.factory("myappService", ["$rootScope", "$http", function ($rootScope, $http) {
        var myappService = {};

        //starts and stops the application waiting indicator
        myappService.wait = function (show) {
            if (show)
                $(".spinner").show();
            else
                $(".spinner").hide();
        };
		
        return myappService;
}])

.factory('getLocalStorage', function () {
                    var employeeList = {};  
                    return {  
                        list: employeeList,  
                        updatealarmdata: function (alarmdataArr) {  
                            if (window.localStorage && alarmdataArr) {  
                                //Local Storage to add Data  
                                localStorage.setItem("alarmdata", angular.toJson(alarmdataArr));  
                            }  
                            employeeList = alarmdataArr;  
      
                        },  
                        getalarmdata: function () {  
                            //Get data from Local Storage  
                            employeeList = angular.fromJson(localStorage.getItem("alarmdata"));  
                            return employeeList ? employeeList : [];  
                        }  
                    };  
      
});  

