angular.module("auditoriaApp")
.controller("EditarUnionesCtrl", function($scope, ConexionServ, $filter, $ionicPopup, $stateParams, $state) {

 

      $scope.actuali_union = {};

     $scope.traerDatos = function() {
	// Traemos Uniones
		consulta = "SELECT rowid, nombre, alias, codigo from uniones";
		ConexionServ.query(consulta, []).then(function(result) {
			$scope.uniones = result;
		}, function(tx) {
				console.log("Error no es posbile traer Uniones", tx);
		});




	}; 




	// Traemos Uniones
		consulta = "SELECT rowid,* from uniones WHERE rowid = ?";
		ConexionServ.query(consulta, [$stateParams.unionId]).then(function(result) {
				$scope.actuali_union = result[0];
				
		}, function(tx) {
				console.log("Error no es posbile traer Uniones", tx);
		});



		


		 $scope.ActualizarUniones = function(actuali_union) {



		 	 if (actuali_union.nombre == undefined || actuali_union.nombre =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al Editar unión ',
			     template: 'Es necesario que complete el campo Nombre'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;
	 	

			 }


			  if (actuali_union.alias == undefined || actuali_union.alias =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al Editar unión ',
			     template: 'Es necesario que complete el campo Alias'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;
	 	

			 }


			 if (actuali_union.codigo == undefined || actuali_union.codigo =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al Editar unión ',
			     template: 'Es necesario que complete el campo código'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;
	 	

			 }


		consulta = "UPDATE  uniones SET nombre=?, alias=?, codigo=?  WHERE rowid=? "; 
		ConexionServ.query(consulta, [ actuali_union.nombre, actuali_union.alias, actuali_union.codigo, actuali_union.rowid ]).then( function(result) {
		   
	     



	      $scope.traerDatos(); 


 			console.log("Union Actualizada", result);


						
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