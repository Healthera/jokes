

/* 
 * CONTROLLER to handle alert bars and notifications over whole application
 */
angular.module("JOKES")
        .controller('AlertCtrl', ['$scope', 'notifications',
			function ($scope, notifications) {
            $scope.delay = 0; // mS
			$scope.messageStart = new Date().getTime();
					
			var level = {
				error: 		"ERROR",
				warning: 	"WARNING",
				success:	"SUCCESS",	// For compatibility with ngNotificationsBar; mapped to INFO in middleware
				info:		"INFO",
				debug: 		"DEBUG"
			};
								
			/*
			 * Function: 	isIE()
			 * Parameters: 	None
			 * Returns: 	Nothing
			 * Description:	Test for IE nightmare 
			 */
			function isIE() {
				var myNav = navigator.userAgent.toLowerCase();
				return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
			}
			
			/*
			 * Function: 	consoleLog()
			 * Parameters:  Message
			 * Returns: 	Nothing
			 * Description:	IE safe console log 
			 */
			$scope.consoleLog = function(msg, jokesError) {
				var end=new Date().getTime();
				var elapsed=(Math.round((end - $scope.messageStart)/100))/10; // in S	
				if (window.console && console && console.log && typeof console.log == "function") { // IE safe
					if (isIE()) {
						if (window.__IE_DEVTOOLBAR_CONSOLE_COMMAND_LINE) {
							console.log("+" + elapsed + ": " + msg + 
								(jokesError ? "\nStack: " + jokesError.stack : "")); // IE safe
						}
					}
					else {
						console.log("+" + elapsed + ": " + msg + 
								(jokesError ? "\nStack: " + jokesError.stack : "")); // IE safe
					}
				}  
				
			}
			
			/*
			 * Function: 	consoleError()
			 * Parameters:  Message, jokes Error object [optional]
			 * Returns: 	Nothing
			 * Description:	IE safe console log for errors
			 *				Log message to console with relative timestamp; save message in array
			 */
			$scope.consoleError = function(msg, jokesError) {
				var err; // Get stack
				if (jokesError) {
					err=jokesError;
				}
				else {
					err=new Error("Auto created by controller");
				}
							
				var end=new Date().getTime();
				var elapsed=(Math.round((end - $scope.messageStart)/100))/10; 
						// time since application init in S
                if (window.console && console && console.log && typeof console.log == "function") { // IE safe
                    if (isIE()) {
                        if (window.__IE_DEVTOOLBAR_CONSOLE_COMMAND_LINE) {
                            console.log("+" + elapsed + ": [ERROR]" + msg + "\nStack: " + err.stack); // IE safe
                        }
                    }
                    else {
                        console.log("+" + elapsed + ": [ERROR] " + msg + "\nStack: " + err.stack); // IE safe
                    }
                } 
				
			}

			/*
			 * Function:	jokesMessage listener
			 * Parameters:	Event, data object:
			 *					Level [ERROR/WARNING/SUCCESS], message, auto hide (after about 5s): true/false, rif Error object [optional] 
			 * Usage:		$rootScope.$broadcast('jokesMessage', { messageLevel: "DEBUG", msg: "Test message" });
			 */			
			$scope.$on('jokesMessage', function (event, data) {				var err; // Get stack
				if (data.err) {
					err=data.err;
				}
				else {
					err=new Error("Auto created by controller");
				}
				if (data.messageLevel && data.msg) {
					if (data.messageLevel.toUpperCase() == "ERROR") {	
						notifications.showError({
							message: 'Error: ' + data.msg, 
							hideDelay: $scope.delay, 
							hide: false
							});	
						$scope.consoleLog("Stack: " + err.stack);
					}
					else if (data.messageLevel.toUpperCase() == "WARNING") {
						notifications.showWarning({
							message: 'Warning: ' + data.msg, 
							hideDelay: $scope.delay, 
							hide: true
							});
					}
					else if (data.messageLevel.toUpperCase() == "SUCCESS") {
						notifications.showSuccess({
							message: data.msg, 
							hideDelay: 
							$scope.delay, 
							hide: true});
					}					 }
				 else {
					$scope.consoleError("jokesMessage has incorrect data: " + JSON.stringify(data), data.rifError);
				 }
			});
			
			/*
			 * Function:	consoleMessage listener
			 * Parameters:	Event, data object:
			 *					Level [DEBUG/INFO/ERROR], message, rif Error object [optional] 
			 * Description:	Call rifMessage()
			 * Usage:		$rootScope.$broadcast('rifMessage', { messageLevel: "DEBUG", msg: "Test message" });
			 */			
			$scope.$on('consoleMessage', function (event, data) {
				if (data.messageLevel && data.msg) {
					if (data.messageLevel.toUpperCase() == "DEBUG") {
						$scope.consoleDebug(data.msg, data.rifError);	
					}	
					else if (data.messageLevel.toUpperCase() == "INFO") {
						$scope.consoleLog(data.msg, data.rifError);	
					}	
					else if (data.messageLevel.toUpperCase() == "ERROR") {
						$scope.consoleError(data.msg, data.rifError);	
					}	
					else {
						$scope.consoleError("consoleMessage has incorrect messageLevel: " + JSON.stringify(data), data.rifError);
					}	
				}
				else if (data.msg == undefined) { // Do nothing
				}
				else {
					$scope.consoleError("consoleMessage has incorrect data: " + JSON.stringify(data), data.rifError);
				}
			});
			
            $scope.showError = function (msg) {
                notifications.showError({
							message: 'Error: ' + msg, 
							hideDelay: $scope.delay, 
							hide: false
							});	
            };
            $scope.showWarning = function (msg) {
                notifications.showWarning({
							message: 'Warning: ' + msg, 
							hideDelay: $scope.delay, 
							hide: true
							});
            };
            $scope.showSuccess = function (msg) {
                notifications.showSuccess({
							message: 'Success: ' + msg, 
							hideDelay: $scope.delay, 
							hide: true
							});
            };
        }]);