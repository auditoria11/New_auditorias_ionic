angular.module("auditoriaApp")
.controller("EditarAsociacionesCtrl", function($scope, ConexionServ, $filter, $ionicPopup, $stateParams, $state) {




	$scope.actuali_asociation = {};

	// Traemos asociaciones
		consulta = "SELECT rowid,* from asociaciones WHERE rowid = ?";
		ConexionServ.query(consulta, [$stateParams.asociacionId]).then(function(result) {
				$scope.actuali_asociation = result[0];
				console.log('eeeeee', $scope.crear_asociacion);
		}, function(tx) {
				console.log("Error no es posbile traer asociaciones", tx);
		});
 

     

     $scope.traerDatos = function() {
	// Traemos asociaciones
		consulta = "SELECT aso.rowid, aso.*, un.nombre as nombre_union, un.alias as alias_union  from asociaciones aso INNER JOIN uniones un ON aso.union_id = un.rowid ";

			ConexionServ.query(consulta, []).then(function(result) {
				$scope.asociaciones = result;
				console.log(result);
			}, function(tx) {
				console.log("Error no es posbile traer asociaciones", tx);
			});


			consulta = "SELECT rowid, nombre, alias, codigo, division_id from uniones";
			   ConexionServ.query(consulta, []).then(function(result) {
				    $scope.uniones = result;
				}, function(tx) {
					console.log("Error no es posbile traer Uniones", tx);
			});

	}; 
	 $scope.traerDatos();

	



		$scope.ActualizarAsociaciones = function(actuali_asociation) {

			 if (actuali_asociation.nombre == undefined || actuali_asociation.nombre =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al editar Asociación ',
			     template: 'Es necesario que complete el campo Nombre'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

 			 }


		 if (actuali_asociation.alias == undefined || actuali_asociation.alias =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al editar Asociación ',
			     template: 'Es necesario que complete el campo Alias'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }
		 if (actuali_asociation.codigo == undefined || actuali_asociation.codigo =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al editar Asociación ',
			     template: 'Es necesario que complete el campo codigo'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }

		if (actuali_asociation.union == undefined || actuali_asociation.union =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al editar Asociación ',
			     template: 'Es necesario que complete el campo union'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }




		consulta = "UPDATE  asociaciones SET nombre=?, alias=?, codigo=?, union_id=?  WHERE rowid=? ";
		ConexionServ.query(consulta, [ actuali_asociation.nombre, actuali_asociation.alias, actuali_asociation.codigo, actuali_asociation.union, actuali_asociation.rowid]).then( function(result) {
		 
			$scope.traerDatos(); 	console.log("Union Actualizada", result);

							
		
			$state.go('tab.asociaciones')


		var alertPopup = $ionicPopup.alert({
		     title: 'asociación Actualizada',
		     template: 'Se ha actualizado correctamente la asociación que editó'
		   });

		   alertPopup.then(function() {
		     console.log('Thank you for not eating my delicious ice cream cone');
		   });


			
		},function(tx) {
			
		});
    };



    $scope.CancelarActualizarAsociaciones = function(){
    	$state.go('tab.asociaciones')
    }



})