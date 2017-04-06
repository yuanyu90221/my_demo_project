angular.module('myModule', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.then(function(data) {
			
				console.log($scope.loading);
				$scope.todos = data.data;
				$scope.loading = false;
			}, function(err){
                    console.log(err);
                });

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.then(function(data) {
						console.log(data.data);
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data.data; // assign our new list of todos
					},
                     function(err){
                    console.log(err);
                });
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.then(function(data) {
					console.log(data.data);
					$scope.loading = false;
					$scope.todos = data.data; // assign our new list of todos
				}, function(err){
                    console.log(err);
                });
		};
	}]);