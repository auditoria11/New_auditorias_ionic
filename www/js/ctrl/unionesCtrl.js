angular.module("auditoriaApp")
.controller("unionesCtrl", function($scope, ConexionServ, $filter) {


 

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
			toastr.success("Se ha creado una Nueva Union Exitosamente.");
		}, function(tx) {
			console.log("Error no es posbile traer Uniones", tx);
		});
    };



})