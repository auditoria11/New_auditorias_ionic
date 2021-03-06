angular.module("auditoriaApp")
.controller("iglesiasCtrl", function($scope, ConexionServ, $filter, $ionicPopup) {

   $scope.crear_iglesia = {}

     $scope.traerDatos = function() {
	// Traemos IGLESIAS
			consulta = "SELECT i.rowid, i.nombre, i.alias, i.codigo, i.distrito_id, i.zona, d.nombre as distrito_nombre, d.alias as distrito_alias, i.tesorero_id, i.secretario_id, " +
					"t.nombres as tesorero_nombres, t.apellidos as tesorero_apellidos, i.tipo, " + 
					"i.tipo_propiedad, i.anombre_propiedad, i.fecha_propiedad, i.fecha_fin, " + 
					"i.tipo_propiedad2, i.anombre_propiedad2, i.fecha_propiedad2, i.fecha_fin2, " + 
					"i.tipo_propiedad3, i.anombre_propiedad3, i.fecha_propiedad3, i.fecha_fin3 " + 
				"FROM iglesias i " +
				"LEFT JOIN distritos d ON d.rowid=i.distrito_id " +
				"LEFT JOIN usuarios t ON t.tipo='Tesorero' and t.rowid=i.tesorero_id ";

			ConexionServ.query(consulta, []).then(function(result) {
				$scope.iglesias = result;
				console.log('result', result);
			}, function(tx) {
				console.log("Error no es posbile traer Iglesias", tx);
			});


			consulta = "SELECT rowid, nombres, apellidos from usuarios WHERE tipo ='Tesorero' ";
			   ConexionServ.query(consulta, []).then(function(result) {
				    $scope.usuarios = result;
				}, function(tx) {
					console.log("Error no es posbile traer usuarios", tx);
			});


			consulta = "SELECT rowid, nombre, alias from distritos ";
			   ConexionServ.query(consulta, []).then(function(result) {
				    $scope.distritos = result;
				}, function(tx) {
					console.log("Error no es posbile traer distritos", tx);
			});



	};

	$scope.traerDatos();



  $scope.InsertarIglesias = function(iglesia) {
		
 		if (iglesia.nombre == undefined || iglesia.nombre =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al crear Iglesia ',
			     template: 'Es necesario que complete el campo nombre'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }

		 if (iglesia.alias == undefined || iglesia.alias =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al crear Iglesia ',
			     template: 'Es necesario que complete el campo alias'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }


		 	  if (iglesia.codigo == undefined || iglesia.codgio =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al crear Iglesia ',
			     template: 'Es necesario que complete el campo codigo'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }

		 if (iglesia.distrito == undefined || iglesia.distrito =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al crear Iglesia ',
			     template: 'Es necesario que complete el campo distrito'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }

		 if (iglesia.zona == undefined || iglesia.zona =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al crear Iglesia ',
			     template: 'Es necesario que complete el campo zona'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }

		 if (iglesia.tesorero == undefined || iglesia.tesorero =='' ) {
		 	

			   var alertPopup = $ionicPopup.alert({
			     title: 'Error al crear Iglesia ',
			     template: 'Es necesario que complete el campo tesorero'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });

		 	return;

		 	 }

		consulta = "INSERT INTO iglesias(nombre, alias, codigo, distrito_id, zona, tesorero_id) VALUES(?,?,?,?,?,?)";

			ConexionServ.query(consulta, [iglesia.nombre, iglesia.alias, iglesia.codigo, iglesia.distrito, iglesia.zona, iglesia.tesorero]).then(function(result) {
			$scope.traerDatos();

			$scope.showAlert = function() {
			   var alertPopup = $ionicPopup.alert({
			     title: 'Iglesia creada creada',
			     template: 'se ha creado una nueva Iglesia'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });
			};

			
		}, function(tx) {
			console.log("Error no es posbile traer Iglesias", tx);
		});
    };


    $scope.VerCrearIglesias = function(){
      $scope.VerCreandoIglesias = true;
    };

    $scope.CancelarCrearIglesias = function(){
      $scope.VerCreandoIglesias = false;
    };



    $scope.EliminarIglesia = function(iglesia) {
	   var confirmPopup = $ionicPopup.confirm({
         title: 'Eliminar Iglesia' ,
         template: '¿Esta seguro de Eliminar esa Iglesia?'
      });

	  

      confirmPopup.then(function(res) {
         if(res) 
		if (res == true) {
			consulta = "DELETE FROM iglesias WHERE rowid=? ";

			ConexionServ.query(consulta, [iglesia.rowid]).then(function(result) {
				console.log("iglesia  eliminida", result);
				$scope.iglesias = $filter("filter")($scope.iglesias, {rowid: "!" + iglesia.rowid});
				$scope.focusOnValorNew = true;
			},function(tx) {
				console.log(
				"No se pudo Eliminar la iglesia que quiere eliminar ",
				tx
				);
			});
      	}

      });
	};


  
  
  


});