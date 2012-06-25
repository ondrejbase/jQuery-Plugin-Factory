/*!
 * jQuery Plugin Factory
 * @author Ondrej Base
 */

/**
 * Notes
 * - new plugin is created by jQuery.Plugin function
 * - this.name in this.constructor() and this.methods contains plugin name
 * - private method in this.methods should be prefixed with _, for example:
 * 		_displayMenu: function() {...
 */

(function($) {

/**
 * Class definitions of jQuery plugins.
 * @private
 * @type {Object}
 */
var pluginClasses = {};

/**
 * Class instances of jQuery plugins.
 * @private
 * @type {Object}
 */
var pluginInstances = {};

/**
 * Search for a plugin instance by a DOM element.
 * @private
 * @param {String} name Plugin name
 * @param {Object} element DOM element.
 * @returns {Object} Desired plugin instance.
 */
function findInstanceByElement(name, element) {
	for (var i in pluginInstances[name]) {
		if (element === pluginInstances[name][i].element) {
			return pluginInstances[name][i].instance;
		}
	}
	return null;
}

/**
 * Destroy given plugin instance.
 * @param {String} name The plugin name.
 * @param {Object} instance The plugin instance.
 */
function destroyInstance(name, instance) {
	for (var i in pluginInstances[name]) {
		if (instance === pluginInstances[name][i].instance) {
			pluginInstances[name].splice(i, 1);
		}
	}
}

/**
 * Registers a new jQuery plugin.
 * @public
 * @param {String} name Plugin name.
 * @param {Function} pluginClass Plugin class definition container.
 */
$.Plugin = function(name, pluginClass) {
	/**
	 * Current class definition.
	 * @private
	 * @type {Object}
	 */
	var	classDefinition = {};

	if (!pluginClasses[name] && !$.fn[name]) {
		// It is a new plugin.
		pluginClass.call(classDefinition, $);
		classDefinition.methods._destroy_ = classDefinition.methods.destroy;
		classDefinition.methods.destroy = function() {
			destroyInstance(name, this);
			this._destroy_();
		};
		classDefinition.constructor.prototype = classDefinition.methods;
		pluginClasses[name] = classDefinition;
		pluginInstances[name] = [];
	} else {
		$.error('Plugin ' + name + ' already exists.');
	}

	/**
	 * Defines a real jQuery plugin.
	 * @param {Object|String} [optionsOrMethodName] A configuration object or
	 * 	a method name.
	 */
	$.fn[name] = function(optionsOrMethodName) {
		var elementsCount = this.length;
		if (!optionsOrMethodName || typeof optionsOrMethodName == 'object') {
			// Instantiating a class
			var element,
				instance;
			for (var i = 0; i < elementsCount; i++) {
				element = this[i];
				if (!findInstanceByElement(name, element)) {
					instance = new pluginClasses[name].constructor(element,
						optionsOrMethodName);
					instance.name = name;
					pluginInstances[name].push({
						element: element,
						instance: instance 
					});
				} // Ignoring – only one instance per element is allowed.
			}
			return this;
		} else if (typeof optionsOrMethodName == 'string' &&
				optionsOrMethodName.search('_') != 0 &&
				pluginClasses[name].methods[optionsOrMethodName]) {
			// Public method calling.
			if (elementsCount == 0) {
				// Returns the jQuery object to maintain chainability.
				return this;
			} else if (elementsCount == 1) {
				var instance = findInstanceByElement(name, this[0]);
				if (instance) {
					// We will return a method's return value directly.
					return instance[optionsOrMethodName].apply(instance,
						Array.prototype.slice.call(arguments, 1));
				} else {
					$.error('Calling method ' + optionsOrMethodName +
						' of uninitialized jQuery plugin ' + name+ '.');
				}
			} else {
				/* We will join return values of called methods into an array
				 * or a jQuery object.
				 */
				var instance,
					ret = [];
				for (var i = 0; i < elementsCount; i++) {
					instance = findInstanceByElement(name, this[i]);
					if (instance) {
						ret.push(instance[optionsOrMethodName].apply(instance,
							Array.prototype.slice.call(arguments, 1)));
					} else {
						$.error('Calling method ' + optionsOrMethodName +
							' of uninitialized jQuery plugin ' + name+ '.');
					}
				}
				if (ret[0] && ret[0].jquery) {
					/* First return value is a jQuery object, so we will
					 * encapsulate whole array into a jQuery object.
					 */
					ret = $(ret);
				}
				return ret;
			}
		} else {
			$.error('Public method ' + optionsOrMethodName +
				' does not exist on jQuery plugin ' + name + '.');
		}
	};
};

})(jQuery);