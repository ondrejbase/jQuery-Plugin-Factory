(function($) {

$(function() {
	$('#city').autocomplete({
		source: locationsSource,
		autoFocus: true
	});
});

function locationsSource(term, response) {
	response([
		{
			label: 'Brno, CZ',
			value: 'Brno'
		},
		{
			label: 'Ostrava, CZ',
			value: 'Ostrava'
		},
		{
			label: 'Praha, CZ',
			value: 'Praha'
		}
	]);
}

})(jQuery);