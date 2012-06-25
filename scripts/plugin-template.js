jQuery.Plugin('cancelable', function($) {

var defaults =  {
};

this.constructor = function(element, options) {
	this.$element = $(element);
	this.options = $.extend({}, defaults, options);
};

this.methods = {
	destroy: function() {}
};

});