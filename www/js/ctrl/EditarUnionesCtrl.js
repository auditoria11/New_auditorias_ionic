angular.module("auditoriaApp")
.controller("EditarUnionesCtrl", function($scope, ConexionServ, $filter, $ionicPopup, $stateParams, $state) {

 

     

     $scope.traerDatos = function() {
	// Traemos Uniones
		consulta = "SELECT rowid, nombre, alias, codigo, division_id from uniones";
		ConexionServ.query(consulta, []).then(function(result) {
			$scope.uniones = result;
		}, function(tx) {
				console.log("Error no es posbile traer Uniones", tx);
		});

	}; 

	// Traemos Uniones
		consulta = "SELECT rowid,* from uniones WHERE rowid = ?";
		ConexionServ.query(consulta, [$stateParams.unionId]).then(function(result) {
				$scope.creatar_union = result[0];
				
		}, function(tx) {
				console.log("Error no es posbile traer Uniones", tx);
		});



		 $scope.ActualizarUniones = function(actuali_union) {
		consulta = "UPDATE  uniones SET nombre=?, alias=?, codigo=?  WHERE rowid=? "; 
		ConexionServ.query(consulta, [ actuali_union.nombre, actuali_union.alias, actuali_union.codigo, actuali_union.rowid ]).then( function(result) {
		 
 			console.log("Union Actualizada", result);

 			$scope.traerDatos(); 

						
		$state.go('tab.uniones');


		var alertPopup = $ionicPopup.alert({
		     title: 'Union Actualizada',
		     template: 'Se ha actualizado correctamente la union que editó'
		   });

		   alertPopup.then(function() {
		     console.log('Thank you for not eating my delicious ice cream cone');
		   });


			
		},function(tx) {
			
		});
    };



    $scope.CancelarActualizarUniones = function(){
    	$state.go('tab.uniones')
    }



})