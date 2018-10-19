angular.module("auditoriaApp")
.controller("asociacionesCtrl", function($scope, ConexionServ, $filter, $ionicPopup) {

 $scope.crear_asociacion = {};
 

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

	$scope.Insertar_asociaciones = function(crear_asociacion) {
		console.log(crear_asociacion);

		if (crear_asociacion.nombre == undefined || crear_asociacion.nombre =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al crear Asociación ',
			     template: 'Es necesario que complete el campo nombre'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }

		 if (crear_asociacion.alias == undefined || crear_asociacion.alias =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al crear Asociación ',
			     template: 'Es necesario que complete el campo Alias'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }
		 if (crear_asociacion.codigo == undefined || crear_asociacion.codigo =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al crear Asociación ',
			     template: 'Es necesario que complete el campo codigo'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }

		if (crear_asociacion.union == undefined || crear_asociacion.union =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al crear Asociación ',
			     template: 'Es necesario que complete el campo union'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }
		consulta = "INSERT INTO asociaciones(nombre, alias, codigo, union_id) VALUES(?,?,?,?)";

		ConexionServ.query(consulta, [ crear_asociacion.nombre, crear_asociacion.alias, crear_asociacion.codigo, crear_asociacion.union ]).then( function(result) {
			$scope.traerDatos();

			$scope.showAlert = function() {
			   var alertPopup = $ionicPopup.alert({
			     title: 'Asocación creada creada',
			     template: 'se ha creado una nueva union co'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });
			};

			
		}, function(tx) {
			console.log("Error no es posbile traer asociaciones", tx);
		});
    };


    $scope.VerCrearAsociacion = function(){
    	$scope.VermostrandoCrearAsociacion = true;

    };

      $scope.CancelarCrearAsociacion = function(){
    	$scope.VermostrandoCrearAsociacion = false;

    };



   
   $scope.EliminarAsociacion = function(asociacion) {
	   var confirmPopup = $ionicPopup.confirm({
         title: 'Eliminar asociación' ,
         template: '¿Esta seguro de Eliminar esa asociación?'
      });

	  

      confirmPopup.then(function(res) {
         if(res) 
		if (res == true) {
			consulta = "DELETE FROM asociaciones WHERE rowid=? ";

			ConexionServ.query(consulta, [asociacion.rowid]).then(function(result) {
				console.log("asociacion  eliminida", result);
				$scope.asociaciones = $filter("filter")($scope.asociaciones, {rowid: "!" + asociacion.rowid});
				$scope.focusOnValorNew = true;
			},function(tx) {
				console.log(
				"No se pudo Eliminar La asociacion que quiere eliminar ",
				tx
				);
			});
      	}

      });
	};


	

    




})