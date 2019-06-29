/*
 * SERVICE to setup Jokes Grid
 */
angular.module("JOKES")
        .factory('jokesGrid', ['uiGridConstants', 
            function(uiGridConstants) {
                
                var jokeType = [ // Has to be in this for for category filter
                                 // uiGridConstants.filter.SELECT
                    { value: 'Funny', label: 'Funny' },
                    { value: 'Side splitting', label: 'Side splitting'},
                    { value: 'Awful', label: 'Awful'},
                    { value: 'Suitable for radio one', label: 'Suitable for radio one'},
                    { value: 'No longer funny', label: 'No longer funny'}
                ];
                var gridOptions = {
                    columnDefs: [
                        {   
                            field: 'index', 
                            displayName: 'Index', 
                            visible: false,
                            enableFiltering: false},
                        {   
                            field: 'joke', 
                            displayName: 'Joke', 
                            width: '78%', 
                            enableCellEdit: true},
                        {
                            field: 'category', 
                            displayName: 'Category', 
                            width: '15%', 
                            enableCellEdit: true,
                            editableCellTemplate: 'ui-grid/dropdownEditor',
                            editDropdownOptionsArray: jokeType,
                            editDropdownIdLabel: 'value',
                            editDropdownValueLabel: 'label',
                            filter: { 
                                selectOptions: jokeType, 
                                type: uiGridConstants.filter.SELECT}
                        },
                        {
                            name: 'Delete ?',
                            width: '7%', 
                            enableCellEdit: false,
                            enableFiltering: false,
                            enableSorting: false,
                            cellTemplate: '<button id="deleteJoke" class="w3-btn w3-text-green" ng-click="grid.appScope.deleteRow(row)"><i class="w3-margin-left fa fa-trash"></i></button>'
                        }
                    ],
                    data: [],
                    enableRowSelection: true,
                    enableFiltering: true,
                    enableColumnMenus: false,
// Under some circustances (window max/min button) ui-grid does not auto 
// resize, setting minRowsToShow to fit can fix the problem                    
//                    minRowsToShow: 20,
                    onRegisterApi: undefined
                };   



				return {
					setupGrid: function(gridApiFunction) {		 
                        /* Function:    gridApiFunction()
                         * Parameters:  Angular UI-Grid gridApi
                         * Description: Setup grid API; add bespoke function (update)
                         */ 
                        gridOptions.onRegisterApi = gridApiFunction;
                        return gridOptions;
                    }
				}			
		}]);