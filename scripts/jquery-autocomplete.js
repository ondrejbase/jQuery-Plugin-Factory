/*!
 * Zásuvný modul AutoComplete knihovny jQuery
 * @author Ondřej Baše
 * @requires Zásuvný modul ValueChange
 */

/**
 * Inicialize našeptávače
 * **********************
 * Inicializace našeptávače probíhá tak, že obalíme příslušná vstupní pole
 * objektu knihovny jQuery a zavoláme na něho metodu autocomplete(). Příklad:
 * $('.my-fields').autocomplete();
 * 
 * Při inicializaci můžeme předávat metodě autocomplete konfigurační objekt
 * s možnostmi nastavení a jejich hodnotami. Příklad:
 * $('.my-fields').autocomplete({
 * 		timeout: 700,
 * 		autoFocus: true
 * });
 * 
 * Možnosti nastavení
 * ******************
 * source
 * ------
 * Typ: funkce
 * Výchozí: žádná hodnota; hodnota je povinná
 * Popis: 	Účelem této funkce je vyhledat daný termín ve zdroji dat a vrátit
 * 			výsledky. Tato funkce má dva parametry:
 * 			- term (textový řetězec): vyhledávaný termín.
 * 			- response (funkce): funkce, pomocí které vracíme výsledky
 * 			vyhledávání našeptávači.
 *
 * 			Funkce response() přijímá pole, jehož každý prvek představuje data
 * 			pro položku našeptávače, a to ve formě objektu s následujícími
 * 			hodnotami:
 * 			- label (textový řetězec): popisek položky v nabídce našeptávače,
 * 			- value (textový řetězec): hodnota, která se po výběru položky
 * 			vloží do vstupního pole.
 * 			- případně jakékoliv další hodnoty, které chceme zpracovat v reakci
 * 			na událost select.
 * Příklad: $('.myFields').autocomplete({
 * 				source: function(term, response) {
 * 					$.ajax({
 * 						url: ...,
 * 						data: {
 * 							term: term,
 * 							...
 * 						}
 * 						...
 * 						success: function(data) {
 * 							var responseData = [];
 * 							for (var i in data) {
 * 								responseData.push() {
 * 									label: data.caption,
 * 									value: data.name
 * 								}
 * 							}
 * 							response(responseData);
 * 						}
 * 					});
 * 				}
 * 			});
 *
 * minLength
 * ---------
 * Typ: přirozené číslo
 * Výchozí: 1
 * Popis:	Minimální délka termínu, který našeptávač vyhledává.
 * 
 * timeout
 * -------
 * Typ: nezáporné celé čísla
 * Výchozí: 350
 * Popis:	Určuje, jaká doba musí uplynout mezi stisky kláves, než našeptávač
 * 			spustí vyhledávání.
 * 
 * autofocus
 * ---------
 * Typ: pravdivostní hodnota
 * Výchozí: false
 * Popis:	Rozhoduje o tom, jestli bude po otevření nabídky našeptávače
 * 			zaměřená první položka (true), nebo ne (false).
 * 
 * autoselect
 * ----------
 * Typ: pravdivostní hodnota
 * Výchozí: false
 * Popis:	Specifikuje, jestli by se měla automaticky vybrat první položka
 * 			z nabídky našeptávače, pokud se uživatel před koncem vyhledávání
 * 			přesunul na jiné políčko.
 *
 * change
 * ------
 * Typ: funkce
 * Výchozí: žádná funkce
 * Popis:	Obsluhující funkce události autocompletechange (viz "Události").
 * 
 * search
 * ------
 * Typ: funkce
 * Výchozí: žádná funkce
 * Popis:	Obsluhující funkce události autocompletesearch (viz "Události").
 *
 * select
 * ------
 * Typ: funkce
 * Výchozí: žádná funkce
 * Popis:	Obsluhující funkce události autocompleteselect (viz "Události").
 *
 * 
 * Metody
 * ******
 * refresh
 * -------
 * Parametry: žádné
 * Návratová hodnota: objekt jQuery
 * Popis:	Obnovuje našeptávač; v případě, že se něco změnilo zvenčí (například
 *			pozice vstupního elementu apod.).
 *
 * destroy
 * -------
 * Parametry: žádné
 * Návratová hodnota: žádná
 * Popis:	Ruší instanci našeptávače a vrací vstupní element do původního stavu.
 * Příklad:	$('.my-fields').autocomplete('destroy');
 * 
 * Události
 * ========
 * change
 * ------
 * Typ: autocompletechange
 * Popis:	Nastává, když se uživatel změní hodnotu vstupního pole (po uplynutí
 * 			timeoutu), a také když našeptávač doplní novou hodnotu do pole.
 * 			Obsluhující funkce může mít tyto parametry:
 * 			- ev (objekt): objekt události,
 * 			- value (textový řetězec): hodnota vstupního pole.
 * Příklad: $('my-fields').on('autocompletechange', function(ev, value) {
 * 				alert('Nová hodnota ' + value);
 * 			});
 *
 * search
 * ------
 * Typ: autocompletesearch
 * Popis:	Nastává, když našpetávač začíná vyhledávat (po uplynutí timeoutu).
 * 			Obsluhující funkce může mít tyto parametry:
 * 			- ev (objekt): objekt události,
 * 			- term (textový řetězec): vyhledávaný termín.
 * Příklad: $('my-fields').on('autocompletesearch', function(ev, term) {
 * 				alert('Hledám ' + term);
 * 			});
 *
 * select
 * ------
 * Typ: autocompleteselect
 * Popis:	Nastává po výběru položky našeptávače. Obsluhující funkce může mít
 * 			tyto parametry:
 * 			- ev (objekt): objekt události,
 * 			- itemData (objekt): objekt s daty položky, které jsme definovali
 * 			ve funkci source, která hledala daný termín ve zdroji. Tento
 * 			objekt obsahuje hodnoty label, value a případně další hodnoty,
 * 			které jsme specifikovali (viz "Možnosti nastavení").
 * Příklad: $('my-fields').on('autocompleteselect', function(ev, itemData) {
 * 				alert('Vybral/a jste si položku ' + itemData.label);
 * 			});
 *
 */

jQuery.Plugin('autocomplete', function($) {

/**
 * Výchozí konfigurace.
 * @private
 * @type Object
 */
var defaults = {
	minLength: 1,
	timeout: 350,
	autoFocus: false,
	autoSelect: false
};

/**
 * Inicializuje instanci našeptávače.
 * @private
 * @class
 * @constructor
 * @property {Object} $element Element, na který se našeptávač váže.
 * @property {Object} options Konfigurační objekt.
 * @property {String} namespace Jmenný prostor událostí.
 * @property {Object} $menu Element nabídky našeptávače.
 * @property {Object} menuItems Pole položek nabídky.
 * @property {Number} focusedId Identifikátor zaměřené položky.
 * @property {String} autocompleteAtribut Původní hodnota atributu autocomplete
 * 	pro vstupní pole.
 * @property {Object} clickedOnItem Pomocná proměnná označující, že uživatel
 * 	právě klepl na položku nabídku, takže bychom měli ignorovat blur.
 */
this.constructor = function(element, options) {
	this.$element = $(element);
	this.options = $.extend({}, defaults, options);
	if (!this.options.source) {
		$.error('source option is required for jQuery.autocomplete.');
	}
	if (!this.options.timeout) {
		// S nulou neumí pracovat událost valuechange
		this.options.timeout = 1;
	}

	this.namespace = 'autocomplete';

	this.$menu = $('<ul></ul>', {
		'class': 'autocomplete-menu'
	})
		.appendTo($('body'));
	this.menuItems = [];
	this.focusedId = -1;
	this.clickedOnItem = false;

	this.autocompleteAtribut = this.$element.attr('autocomplete');
	this.$element
		.attr('autocomplete', 'off')
		.bind('valuechange.' + this.namespace,
			{valuechangeTimeout: this.options.timeout},
			$.proxy(this._search, this))
		.bind('keydown.' + this.namespace,
			$.proxy(this._keyDown, this))
		.bind('keyup.' + this.namespace + ' keypress.' + this.namespace,
			$.proxy(this._keyPressed, this))
		.bind('blur.' + this.namespace,
			$.proxy(this._blured, this));

	if (this.options.change) {
		this.$element.bind(this.namespace + 'change.' + this.namespace,
			this.options.change);
	}
	if (this.options.search) {
		this.$element.bind(this.namespace + 'search.' + this.namespace,
			this.options.search);
	}
	if (this.options.select) {
		this.$element.bind(this.namespace + 'select.' + this.namespace,
			this.options.select);
	}

	this.refresh();
}

/**
 * Metody našeptávače.
 */
this.methods = {
	//------------------------- Hlavní metody
	/**
	 * Obnovuje našeptávač; v případě, že se něco změnilo zvenčí (například
	 * pozice vstupního elementu apod.).
	 * @public
	 */
	refresh: function() {
		this._placeMenu();
		return this;
	},

	/**
	 * Umísťuje nabídku na správnou pozici – vlevo dolů pod vstupní element.
	 * @private
	 */
	_placeMenu: function() {
		var elementOffset = this.$element.offset();
		this.$menu
			.offset({
				left: elementOffset.left,
				top: elementOffset.top + this.$element.outerHeight()
			});
	},

	/**
	 * Zobrazuje zaměření na zaměřené položce.
	 * @private
	 */
	_displayFocus: function() {
		for (var i in this.menuItems) {
			if (i == this.focusedId) {
				this.menuItems[i].$element.addClass('autocomplete-menu-item-focused');
			} else {
				this.menuItems[i].$element.removeClass('autocomplete-menu-item-focused');
			}
		}
	},

	/**
	 * Hledá ve zdroji dostupná data pro daný termín.
	 * @private
	 */
	_search: function() {
		var term = this.$element.val();
		this.$element.trigger(this.namespace + 'change', term);
		if (term.length >= this.options.minLength) {
			// Vyhledáváme jen, když má hledaný termín minimální délku.
			this.$element.trigger(this.namespace + 'search', term);
			this.options.source.call(this.$element, term, $.proxy(this._searchDone, this));
		}
	},

	/**
	 * Vyhledávání je dokončené.
	 * @private
	 * @param {Object} data Pole dat získaných ze zdroje. Jednotlivé prvky jsou
	 * 	objekty s těmito hodnotami:
	 * 	- label: popisek, který se zobrazuje v nabídce našeptávače.
	 * 	- value: hodnota, která se vkládá do vstupního pole.
	 */
	_searchDone: function(data) {
		this._destroyMenuItems();

		var dataCount = data.length;
		if (dataCount) {
			for (var i = 0; i < dataCount; i++) {
				this.menuItems.push({
					$element: $('<li></li>',
						{
							text: data[i].label,
							'class': 'autocomplete-menu-item',
							tabindex: -1
						})
							.data('autocomplete-menu-item-id', i)
							.appendTo(this.$menu)
							.hover(
								$.proxy(this._menuItemMouseEntered, this),
								$.proxy(this._menuItemMouseLeft, this))
							.mousedown($.proxy(this._menuItemMouseDown, this))
							.click($.proxy(this._menuItemClicked, this)),
					data: data[i]
				});
			}

			if (this.options.autoFocus) {
				this.focusedId = 0;
				this._displayFocus();
			}

			if (this.$element.is(':focus')) {
				this.$menu.show();
			} else {
				if (this.options.autoSelect) {
					this.focusedId = 0;
					this._select();
				}
			}
		} else {
			this.$menu.hide();
		}
	},

	/**
	 * Vybere zaměřenou položku.
	 */
	_select: function() {
		if (this.focusedId > -1) {
			var item = this.menuItems[this.focusedId];
			if (this.$element.val() != item.data.value) {
				this.$element.trigger(this.namespace + 'change', item.data.value);
			}
			this.$element.val(item.data.value);
			this.$menu.hide();
			this.focusedId = -1;
			this.$element.trigger(this.namespace + 'select', item.data);
		}
	},

	/**
	 * Posouvá zaměření o položku nahoru/dolů.
	 * @param {Number} direction Směr posunu (1 = dolů, -1 = nahoru).
	 */
	_moveFocus: function(direction) {
		if (this.focusedId == -1) {
			// Nic není zaměřené, proto
			if (direction > 0) {
				// při přesunu dolů vybereme první položku.
				this.focusedId = 0;
			} else {
				// a při přesunu nahoru poslední položku.
				this.focusedId = this.menuItems.length - 1;
			}
		} else {
			// Něco už je zaměřené, takže
			var itemsCount = this.menuItems.length;
			if (itemsCount) {
				// přejdeme na další.
				this.focusedId = (this.focusedId + direction + itemsCount) %
					itemsCount; 
			} else {
				// To je divné; asi chyba.
				this.focusedId = -1;
			}
		}
		this._displayFocus();
	},

	/**
	 * Ruší instanci našeptávače a vrací vstupní element do původního stavu.
	 * @public
	 */
	destroy: function() {
		this._destroyMenuItems();
		this.$menu.remove();
		this.$element.unbind('.' + this.namespace);
		if (this.autocompleteAtribut) {
			this.$element.attr('autocomplete', this.autocompleteAtribut);
		} else {
			this.$element.removeAttr('autocomplete');
		}
		destroyInstance(this);
	},

	/**
	 * Ruší položky nabídky.
	 * @private
	 */
	_destroyMenuItems: function() {
		for (var i in this.menuItems) {
			this.menuItems[i].$element.remove();
		}
		this.menuItems = [];
		this.focusedId = -1;
	},

	//------------------------- Hlavní metody
	//------------------------- Obsluha událostí vstupního pole

	/**
	 * Uživatel stiskl klávesu ve vstupním poli a zatím ji nepustil.
	 * @param {Object} ev Objekt události.
	 */
	_keyDown: function(ev) {
		var ARROW_UP_KEY = 38,
			ARROW_DOWN_KEY = 40,
			TAB_KEY = 9;
		switch (ev.keyCode) {
			case ARROW_UP_KEY:
				this._moveFocus(-1);
				/* Firefox se při stisku klávesy nahoru vracel ve vstupním poli
				 * na začátek, proto vracíme false.
				 */
				return false;
				break;
			case ARROW_DOWN_KEY:
				this._moveFocus(1);
				break;
			case TAB_KEY:
				/* V IE 7 musíme TAB ošetřit už při keydown, jelikož po této
				 * události už se přesouvá jinam a další události nespustí.
				 */
				this._select();
				break;
			default:
				break;
		}
	},

	/**
	 * Uživatel stiskl klávesu ve vstupním poli.
	 * @private
	 * @param {Object} ev Objekt události.
	 */
	_keyPressed: function(ev) {
		var ENTER_KEY = 13;
		switch (ev.keyCode) {
			case ENTER_KEY:
				if (ev.type == 'keyup') {
					// Pouze zrušíme událost valuchange.
					clearTimeout(this.$element.data('valuchangeTimer'));
				} else {
					// Vybereme zaměřenou položku.
					this._select();
					/* Zastavovat událost pro ENTER má smysl pouze pro keypress,
					 * a to kvůli IE 7; jinak totiž IE 7 odešle formulář.
					 */
					return false;
				}
				break;
			default:
				break;
		}
	},

	/**
	 * Vstupní pole ztratilo zaměření.
	 */
	_blured: function() {
		if (this.clickedOnItem) {
			// Uživatel právě klepl na položku nabídky, takže ignorujeme.
			this.clickedOnItem = false;
		} else {
			this.$menu.hide();
			this.focusedId = -1;
		}
	},

	//------------------------- Obsluha událostí vstupního pole
	//------------------------- Obsluha událostí položek nabídky

	/**
	 * Ukazatel myši se přesunul na položku nabídku, proto ji zaměříme.
	 * @private
	 * @param {Object} ev Objekt události
	 */
	_menuItemMouseEntered: function(ev) {
		this.focusedId = $(ev.target).data('autocomplete-menu-item-id');
		this._displayFocus();
	},

	/**
	 * Ukazatel myši opustil položku nabídky, takže odstraníme zaměření.
	 * @private
	 */
	_menuItemMouseLeft: function() {
		this.focusedId = -1;
		this._displayFocus();
	},

	/**
	 * Uživatel stiskl tlačítko myši na položce nabídky.
	 * @private
	 */
	_menuItemMouseDown: function() {
		// Pouze si poznačíme, že tato událost nastala.
		this.clickedOnItem = true;
	},

	/**
	 * Uživatel klepl na položku nabídky.
	 * @private
	 */
	_menuItemClicked: function() {
		this.$element.focus();
		this._select();
	}

	//------------------------- Obsluha událostí položek nabídky
};

});