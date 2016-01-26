
Parties1 = new Mongo.Collection("parties1");
//Status = new Mongo.Collection("status");
Parties = new Mongo.Collection("parties");
if (Meteor.isClient) {
    angular.module('socially', [
        'angular-meteor',
        'ui.router'
    ]);


  	//angular.module('socially', ['angular-meteor']);PoliceClient
    angular.module('socially').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('parties', {
                url: '/parties',
                templateUrl: 'parites-list.html'
            })
            .state('partyDetails', {
                url: '/parties/policeClient',
                templateUrl: 'policeClient.html'
            });

       // })
        $urlRouterProvider.otherwise("/parties");
    }
    )

  	angular.module('socially').controller('PoliceClient', ['$scope', '$meteor',
    function($scope, $meteor){

      $scope.parties = $meteor.collection(Parties);
      $scope.parties1 = $meteor.collection(Parties1);
      $scope.remove = function(party){
		$scope.parties.remove(party);
	  };
	  $scope.removeAll = function(){
		 $scope.parties.remove();
	  };


        $scope.status = function(){
            $scope.parties1.remove();
            var $inpvalue = $("#inpvalue");
            var status = $inpvalue.val() ==="true" ? false:true;
            console.log(status+"-------------------------");
            Parties1.insert({"status" : status,"disabled":false});
        }



    $scope.inputing = function(){
      console.log('123');
    }

    }]);

    angular.module('socially').controller('PartiesListCtrl', ['$scope', '$meteor',
        function($scope, $meteor){


            $scope.parties1 = $meteor.collection(Parties1);
            $scope.parties = $meteor.collection(Parties);
            $scope.remove = function(party){
                $scope.parties.remove(party);
            };

            $scope.removeAll = function(){
                $scope.parties.remove();
            };

            $scope.status = function(){
                $scope.parties1.remove();
                var $inpvalue = $("#inpvalue");
               var status= $inpvalue.val() ==="true" ? false:true;
                console.log(typeof(status)+"---------------------------");
                Parties1.insert({"status" : status,"disabled":true});
            }



            $scope.inputing = function(){
                console.log('123');
            }

        }]);
  	function onReady() {
	  angular.bootstrap(document, ['socially'], {
	    strictDi: true
	  });
	}

	if (Meteor.isCordova)
	  angular.element(document).on("deviceready", onReady);
	else
	  angular.element(document).ready(onReady);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
      if (Parties1.find().count() === 0) {

          var parties1 = [
              {
                  'status':true,
                  'disabled':true
              }
          ];

          for (var i = 0; i < parties1.length; i++)
              Parties1.insert(parties1[i]);

      }

    if (Parties.find().count() === 0) {

      var parties = [
        {
          'type':'小型车辆',
          'number':'黑MR2345',
          'count':'5',
          'points':'2',
          'telnumber':'13324565432',
          'status':'正在操作',
        }
      ];

      for (var i = 0; i < parties.length; i++)
        Parties.insert(parties[i]);

    }
   });
}