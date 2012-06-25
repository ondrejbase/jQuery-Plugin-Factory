/*!
 * @fileOverview jQuery ValueChange Plugin
 * Improved ajax-complatible variant of jQuery TextChange Plugin.
 * http://www.zurb.com/playground/jquery-text-change-custom-event
 * 
 * Copyright 2010–2012, ZURB and Ondřej Baše
 * Released under the MIT License
 */

(function ($) {

var timeout = 700,
	timeoutParameterKey = 'valuechangeTimeout',
	eventName = 'valuechange',
	timerKey = 'valuchangeTimer',
	originalValueKey = 'valuechangeOriginal';

$.event.special.valuechange = {

	setup: function(data, namespaces) {
		var $element = $(this),
			ns = '.' + eventName;
		if (namespaces) {
			ns += '.' + namespaces.join('.');
		}
		if (data && typeof data == 'object' && data[timeoutParameterKey]) {
			$element.data(timeoutParameterKey, data[timeoutParameterKey]);
			delete data[timeoutParameterKey];
		}
		$element
			.data(originalValueKey, this.contentEditable === 'true' ?
				$element.html() :
				$element.val()
			)
			.bind('keyup' + ns + ' input' + ns + ' cut' + ns + ' paste' + ns,
				data, $.event.special.valuechange.handler);
	},

	teardown: function() {
		$(this).unbind('.' + eventName);
	},

	handler: function(ev) {
		var $element = $(this),
			currentValue = this.contentEditable === 'true' ?
					$element.html() :
					$element.val(),
			originalValue = $element.data(originalValueKey);
		if (currentValue != originalValue) {
			var timer;
			if (timer = $element.data(timerKey)) {
				window.clearTimeout(timer);
			}
			var to = parseInt($element.data(timeoutParameterKey));
			to = to ? to : timeout;
			$element.data(timerKey, window.setTimeout(function() {
				$element.trigger(eventName, [originalValue]);
				$element.data(originalValueKey, currentValue);
			}, to));
		}
	}
};

})(jQuery);