

/*
 * SERVICE for Alerts functions. Calls Alert controller
 */
angular.module("JOKES")
        .factory('AlertService', ['$rootScope',
                function ($rootScope) {
					$rootScope.messagesList = [];
			
					function rifMessage2(messageLevel, msg, rifHide, rifError) {
						var err; // Get stack
						if (rifError) {
							err=rifError;
						}
						else {
							err=new Error("Auto created by service");
						}
										
						$rootScope.$broadcast('jokesMessage', { 
							messageLevel: messageLevel, 
							msg: msg,
							rifHide: rifHide,
							rifError: err
						});						
					}
					
                    return {
						// Back compatibility controller style messages
						showError: function (msg, rifError) {
							rifMessage2("ERROR", msg, true, rifError);
						},
						showWarning: function (msg) {
							rifMessage2("WARNING", msg, true);
						},
						showSuccess: function (msg) {
							rifMessage2("SUCCESS", msg, true);
						},
						showErrorNoHide: function (msg, rifError) {
							rifMessage2("ERROR", msg, false, rifError);
						},	
                        consoleLog: function (msg, rifError) {
                            $rootScope.$broadcast('consoleMessage', { 
								messageLevel: "INFO", 
								msg: msg,
								rifError: rifError
							});
                        },
                        consoleError: function (msg, rifError) {
							var err; // Get stack
							if (rifError) {
								err=rifError;
							}
							else {
								err=new Error("Auto created by service");
							}
											
                            $rootScope.$broadcast('consoleMessage', { 
								messageLevel: "ERROR", 
								msg: msg,
								rifError: err
							});
                        }
                    };

                }]);