var app=angular.module("shippingstation",[]);
app.controller("shippingcontroller",['$scope','$http', function($scope, $http){

// Fetch data from url every one second

  $http({
    method: 'GET',
    url: 'http://127.0.0.1:8080/url.txt'
  }).then(function successCallback(response) {

    $scope.urlobj = response.data;

  }, function errorCallback(response) {

    alert("Error. Try Again!");

  })


 setInterval(function(){
  $http({
      method: 'GET',
      url: $scope.urlobj.url +'/api/orders/loaded'

    }).then(function successCallback(response) {

      $scope.loaded = response.data;

    }, function errorCallback(response) {

      alert("Error. Try Again!");

    })
},10000);

setInterval(function(){

 $http({
     method: 'GET',
     url: $scope.urlobj.url+'/api/orders/cancelled'

   }).then(function successCallback(response) {

     $scope.cancelled = response.data;

   }, function errorCallback(response) {

     alert("Error. Try Again!");

   })
},10000);



// Function to control bot one
        $scope.botone = function(){
          $http({
              method: 'GET',
              url: 'http://29041a89.ngrok.io/bot1'

            }).then(function successCallback(response) {



            }, function errorCallback(response) {

              alert("Error. Try Again!");

            });


        };

// Function to control bot two

        $scope.bottwo = function(){
          $http({
              method: 'GET',
              url: 'http://29041a89.ngrok.io/bot2'

            }).then(function successCallback(response) {




            }, function errorCallback(response) {

              alert("Error. Try Again!");

            });


        };

// Function to put bots on maintenance

        $scope.maintenenceOn = function(){
          $http({
              method: 'GET',
              url: 'http://29041a89.ngrok.io/maintenance'

            }).then(function successCallback(response) {




            }, function errorCallback(response) {

              alert("Error. Try Again!");

            });


        };


        // Function to put bots out of maintenance

                $scope.maintenenceOff = function(){
                  $http({
                      method: 'GET',
                      url: 'http://29041a89.ngrok.io/maintenance'

                    }).then(function successCallback(response) {




                    }, function errorCallback(response) {

                      alert("Error. Try Again!");

                    });


                };


//Function to fulfill order on button click

        $scope.fulfillOrder = function(id){


          $http({
              method: 'GET',
              url: $scope.urlobj.url+'/api/markOrderFilled/'+id

            }).then(function successCallback(response) {

            }, function errorCallback(response) {

              alert("Error. Try Again");
            });

        }


}]);

// filter to group orders by ID

app.filter("groupBy",["$parse","$filter",function($parse,$filter){
  return function(array,groupByField){
    var result	= [];
            var prev_item = null;
            var groupKey = false;
            var filteredData = $filter('orderBy')(array,groupByField);
            for(var i=0;i<filteredData.length;i++){
              groupKey = false;
              if(prev_item !== null){
                if(prev_item[groupByField] !== filteredData[i][groupByField]){
                  groupKey = true;
                }
              } else {
                groupKey = true;
              }
              if(groupKey){
                filteredData[i]['group_by_key'] =true;
              } else {
                filteredData[i]['group_by_key'] =false;
              }
              result.push(filteredData[i]);
              prev_item = filteredData[i];
            }
            return result;
  }
}]);
