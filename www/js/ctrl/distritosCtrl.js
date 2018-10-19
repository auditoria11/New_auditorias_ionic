angular.module("auditoriaApp")
.controller("distritosCtrl", function($scope, ConexionServ, $filter, $ionicPopup) {


	$scope.distrito = {};
  

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


	$scope.VerCrearDistrito = function(){
		$scope.vercreandodistrito = true;

	};

	$scope.CancelarCrearDistrito = function(){
		$scope.vercreandodistrito = false;


	};

	$scope.Insertar_distritos = function(distrito) {

		 if (distrito.nombre == undefined || distrito.nombre =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al crear Distrito ',
			     template: 'Es necesario que complete el campo Nombre'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }

		 if (distrito.alias == undefined || distrito.alias =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al crear Distrito ',
			     template: 'Es necesario que complete el campo Alias'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }
    	if (distrito.codigo == undefined || distrito.codigo =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al crear Distrito ',
			     template: 'Es necesario que complete el campo codigo'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }
		 if (distrito.zona == undefined || distrito.zona =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al crear Distrito ',
			     template: 'Es necesario que complete el campo zona'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 }

		if (distrito.pastor == undefined || distrito.pastor =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al crear Distrito ',
			     template: 'Es necesario que complete el campo pastor'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }



		
		consulta = "INSERT INTO distritos(nombre, alias, codigo, zona, pastor_id, tesorero_id) VALUES(?,?,?,?,?,?)";

			ConexionServ.query(consulta, [distrito.nombre, distrito.alias, distrito.codigo, distrito.zona, distrito.pastor,  distrito.tesorero]).then(function(result) {
			$scope.traerDatos();

			$scope.showAlert = function() {
			   var alertPopup = $ionicPopup.alert({
			     title: 'Distrito creada creada',
			     template: 'se ha creado una nuevo distrito'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for eating my delicious ice cream cone');
			   });
			};

			
		}, function(tx) {
			console.log("Error no es posbile traer asociaciones", tx);
		});
    };





   $scope.EliminarDistrito = function(distrito) {
	   var confirmPopup = $ionicPopup.confirm({
         title: 'Eliminar Distrito' ,
         template: '¿Esta seguro de Eliminar ese Distrito?'
      });

	  

      confirmPopup.then(function(res) {
         if(res) 
		if (res == true) {
			consulta = "DELETE FROM distritos WHERE rowid=? ";

			ConexionServ.query(consulta, [distrito.rowid]).then(function(result) {
				console.log("distrito  eliminida", result);
				$scope.distritos = $filter("filter")($scope.distritos, {rowid: "!" + distrito.rowid});
				$scope.focusOnValorNew = true;
			},function(tx) {
				console.log(
				"No se pudo Eliminar el distrito que quiere eliminar ",
				tx
				);
			});
      	}

      });
	};




 




});