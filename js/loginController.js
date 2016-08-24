angular.module('controllers').controller('LoginController', function($http, $scope, $location, MyService) {

     $scope.init = function() {
        console.info('entro');
        var mapOptions = {
            center: new google.maps.LatLng(37.774807, -3.795573),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_div"),
            mapOptions);
    }

            $scope.functionAjax = function () {
            console.info('entro');
            $http({
                method: 'POST',
                url: 'api/controller/conection/probandkkk',
                //url: Routing.generate('packet_new_trip', true),
                params: {
                    countryFrom:  25
                }
            }).then(function (response) {
                //$scope.actions = response.data;
                console.info(response);
            }, function (errResponse) {
                console.error('Error while fetching notes');
            });
        };

});