angular.module("auditoriaApp")
.controller("unionesCtrl", function($scope, ConexionServ, $filter, $ionicPopup) {


 

	$scope.traerDatos = function() {
	// Traemos Uniones
		consulta = "SELECT rowid, nombre, alias, codigo, division_id from uniones";
		ConexionServ.query(consulta, []).then(function(result) {
				$scope.uniones = result;
		}, function(tx) {
				console.log("Error no es posbile traer Uniones", tx);
		});

	};

	$scope.traerDatos();

	 $scope.inserter_union = function(creatar_union) {
		consulta = "INSERT INTO uniones(nombre, alias, codigo) VALUES(?,?,?)";

		ConexionServ.query(consulta, [creatar_union.nombre, creatar_union.alias, creatar_union.codigo]).then(function(result) {
			           

			$scope.traerDatos();

			$scope.showAlert = function() {
			   var alertPopup = $ionicPopup.alert({
			     title: 'Union creada',
			     template: 'se ha creado una nueva union co'
			   });

			   alertPopup.then(function(res) {
			     console.log('Thank you for not eating my delicious ice cream cone');
			   });
			};

			
		}, function(tx) {
			console.log("Error no es posbile traer Uniones", tx);
		});
    };


    $scope.VerCrearUnion = function(){
    	$scope.VermostrandoCrearUnion = true;

    };

      $scope.CancelarCrearUnion = function(){
    	$scope.VermostrandoCrearUnion = false;

    };



   
   $scope.EliminarUnion = function(union) {
	   var confirmPopup = $ionicPopup.confirm({
         title: 'Eliminar Union' ,
         template: '¿Esta seguro de Eliminar esa union?'
      });

	  

      confirmPopup.then(function(res) {
         if(res) 
		if (res == true) {
			consulta = "DELETE FROM uniones WHERE rowid=? ";

			ConexionServ.query(consulta, [union.rowid]).then(function(result) {
				console.log("union  eliminida", result);
				$scope.uniones = $filter("filter")($scope.uniones, {rowid: "!" + union.rowid});
				$scope.focusOnValorNew = true;
			},function(tx) {
				console.log(
				"No se pudo Eliminar La union que quiere eliminar ",
				tx
				);
			});
      	}

      });
	};






})