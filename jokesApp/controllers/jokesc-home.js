

/* 
 * CONTROLLER to handle alert bars and notifications over whole application
 */
angular.module("JOKES")
        .controller('HomeCtrl', ['$scope', '$http', '$timeout', 'AlertService', 'urlConfig', 'jokesGrid',
			function ($scope, $http, $timeout, AlertService, urlConfig, jokesGrid) {
                                 
                // Amuse me button
                $scope.getJoke = function() {
                    $http.get(urlConfig.urlRoot + "/getJoke").then(
                        function success(response) {
                            AlertService.showSuccess(response.data.joke);
                        },
                        function fail(response) {
                            handleHttpError(response, "getJoke");
                        }
                    );                    
                }
                
                // Add new joke button
                $scope.addNewJoke = function() {                   
                    if ($scope.gridOptions.data[$scope.gridOptions.data.length-1].joke != "") {
                        var index = $scope.gridOptions.data.length+1;
                        
                        $scope.gridOptions.data.push({
                            index: index,
                            joke: "",
                            category: "funny"
                        });
                        $http.post(urlConfig.urlRoot+ "/createJoke?index=" + 
                            index + "&joke=&category=funny").then(
                            function success(response) {
                                $timeout(function() { // Wait for ui-grid
                                    $scope.gridApi.cellNav.scrollToFocus(
                                        $scope.gridOptions.data[$scope.gridOptions.data.length-1], 
                                        $scope.gridOptions.columnDefs[1]);
                                });
                            },
                            function fail(response) {
                                handleHttpError(response, "createJoke");
                            });
                    }                   
                }
                
                // Delete button
                $scope.deleteRow = function(row) {
                    var i = $scope.gridOptions.data.indexOf(row.entity);
                    
                    $http.delete(urlConfig.urlRoot+ "/deleteJoke?index=" + 
                        $scope.gridOptions.data[i].index).then(
                        function success(response) {
                            $scope.gridOptions.data.splice(i, 1);
                        },
                        function fail(response) {
                            handleHttpError(response, "deleteJoke");
                        });
                };

                /* Function:    handleHttpError()
                 * Parameters:  Express response, textual name of url
                 * Description: Error handler
                 */ 
                function handleHttpError(response, url) {
                    AlertService.showError("Error " + response.status +
                        " in " + url + ": " + 
                        JSON.stringify(response.statusText));
                }
 
                // Initialise grid - set $scope.gridOptions for UI-grid
                function initialiseGrid() {
                    /* Function:    gridApiFunction()
                     * Parameters:  Angular UI-Grid gridApi
                     * Description: Setup grid API; add bespoke function (update)
                     */ 
                    var gridApiFunction = function (gridApi) {
                        $scope.gridApi = gridApi;
                        
                        // Cell update function
                        $scope.gridApi.edit.on.afterCellEdit($scope, 
                            function(rowEntity, colDef, newValue, oldValue) {
                            //Alert to show what info about the edit is available
                            AlertService.consoleLog('Column: ' + colDef.name + ' index: ' + rowEntity.index + 
                                 '; oldValue: ' + oldValue + '; newValue: ' + newValue);

                            $http.put(urlConfig.urlRoot + "/updateJoke?index=" + rowEntity.index +
                                "&" + colDef.name + "=" +  encodeURIComponent(newValue)).then(
                                function success(response) {
                                },
                                function fail(response) {
                                    handleHttpError(response, "updateJoke");
                                });
                        });
                    }
                    
                    $scope.gridOptions = angular.copy(
                        jokesGrid.setupGrid(gridApiFunction));
                    
                    // Populate table
                    $http.get(urlConfig.urlRoot + "/getJokes").then(
                        function success(response) {
                            var jokes=[];
                            for (var i=0; i<response.data.length; i++) {
                                jokes.push({
                                    index: i+1,
                                    joke: response.data[i][0],
                                    category: "funny" // Default
                                });
                            }
                           $scope.gridOptions.data=angular.copy(jokes);
                            
    //                        AlertService.consoleLog(JSON.stringify(jokes));
                        },
                        function fail(response) {
                            handleHttpError(response, "getJokes");
                        }
                    );
                }
                
                // Initialisation on service start
                initialiseGrid();
            }]);