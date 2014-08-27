angular.module('usPhone', []);
angular.module('usPhone').filter('phonenumber', function() {
    /*
     Format phonenumber as: c (xxx) xxx-xxxx
     or as close as possible if phonenumber length is not 10
     if c is not '1' (country code not USA), does not use country code
     */
    return function (number) {
        /*
         @param {Number | String} number - Number that will be formatted as telephone number
         Returns formatted number: (###) ###-####
         if number.length < 4: ###
         else if number.length < 7: (###) ###

         Does not handle country codes that are not '1' (USA)
         */
        if (!number) { return ''; }

        number = String(number);

        // Will return formattedNumber.
        // If phonenumber isn't longer than an area code, just show number
        var formattedNumber = number;

        // if the first character is '1', strip it out and add it back
        var c = (number[0] == '1') ? '1 ' : '';
        number = number[0] == '1' ? number.slice(1) : number;

        // # (###) ###-#### as c (area) front-end
        var area = number.substring(0,3);
        var front = number.substring(3, 6);
        var end = number.substring(6, 10);

        if (front) {
            formattedNumber = (c + "(" + area + ") " + front);
        }
        if (end) {
            formattedNumber += ("-" + end);
        }
        return formattedNumber;
    };
});

angular.module('usPhone').directive('usPhoneDirective', ['$filter', function($filter){
	// Runs during compile
	return {
		restrict: 'A',
		scope: {
        	ngModel: '='
    	},
		link: function($scope, iElm, iAttrs, controller) {
			$scope.$watch('ngModel', function(value, oldValue) {
	            var number = String(value).replace(/[^0-9]+/g, '');
	            $scope.ngModel = $filter('phonenumber')(number);
	        });
		}
	};
}]);