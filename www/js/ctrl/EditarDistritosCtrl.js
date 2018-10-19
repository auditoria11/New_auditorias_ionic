angular.module("auditoriaApp")
.controller("EditarDistritosCtrl", function($scope, ConexionServ, $filter, $ionicPopup, $stateParams, $state) {

	// Traemos distritos
		consulta = "SELECT rowid,* from distritos WHERE rowid = ?";
		ConexionServ.query(consulta, [$stateParams.distritoId]).then(function(result) {
				$scope.distrito = result[0];
				console.log('eeeeee', $scope.crear_asociacion);
		}, function(tx) {
				console.log("Error no es posbile traer distritos", tx);
		});
 

     

     $scope.traerDatos = function() {
	// Traemos DISTRITOS
			consulta = "SELECT d.rowid, d.*, p.nombres as pastor_nombres, p.apellidos as pastor_apellidos, " +
					"p.nombres as pastor_nombres, p.apellidos as pastor_apellidos, " +
					"t.nombres as tesorero_nombres, t.apellidos as tesorero_apellidos " +
				"FROM distritos d " +
				"LEFT JOIN usuarios t ON t.tipo='Tesorero' and t.rowid=d.tesorero_id " +
				"LEFT JOIN usuarios p ON p.tipo='Pastor' and p.rowid=d.pastor_id ";

			ConexionServ.query(consulta, []).then(function(result) {
				$scope.distritos = result;
				console.log('result', result);
			}, function(tx) {
				console.log("Error no es posbile traer distritos", tx);
			});


			consulta = "SELECT rowid, nombres, apellidos from usuarios WHERE tipo ='Pastor' ";
			   ConexionServ.query(consulta, []).then(function(result) {
				    $scope.usuarios = result;
				}, function(tx) {
					console.log("Error no es posbile traer usuarios", tx);
			});


	}; 
	 $scope.traerDatos();

	



		$scope.ActualizarDistrito = function(distrito) {



			if (distrito.nombre == undefined || distrito.nombre =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al editar Distrito ',
			     template: 'Es necesario que complete el campo Nombre'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }

		 if (distrito.alias == undefined || distrito.alias =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al editar Distrito ',
			     template: 'Es necesario que complete el campo Alias'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }
    	if (distrito.codigo == undefined || distrito.codigo =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al editar Distrito ',
			     template: 'Es necesario que complete el campo codigo'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }
		 if (distrito.zona == undefined || distrito.zona =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al editar Distrito ',
			     template: 'Es necesario que complete el campo zona'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 }

		if (distrito.pastor == undefined || distrito.pastor =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al editar Distrito ',
			     template: 'Es necesario que complete el campo pastor'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }

		consulta = "UPDATE distritos SET nombre=?, alias=?, codigo=?, zona=?, pastor_id=?, tesorero_id=? WHERE rowid=? ";
			ConexionServ.query(consulta, [distrito.nombre, distrito.alias, distrito.codigo, distrito.zona, distrito.pastor, distrito.tesorero, distrito.rowid]).then( function(result) {
		 
			$scope.traerDatos(); 	console.log("distrito Actualizado", result);

							
		
			$state.go('tab.distritos')


		var alertPopup = $ionicPopup.alert({
		     title: 'distrito Actualizado',
		     template: 'Se ha actualizado correctamente el distrito que editó'
		   });

		   alertPopup.then(function() {
		     console.log('Thank you for not eating my delicious ice cream cone');
		   });


			
		},function(tx) {
			
		});
    };



    $scope.CancelarActualizarDistritos = function(){
    	$state.go('tab.distritos')
    }



})