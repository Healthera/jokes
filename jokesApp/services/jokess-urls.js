/*
 * SERVICE for URL middleware calls. 
 *
 * Rewritten to remove the need for hard coding	HTTPS, hostname etc
 */
angular.module("JOKES")
        .factory('urlConfig', [
            function() {
				var urlRoot=window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
				return {		 
					urlRoot: urlRoot
				}			
		}]);