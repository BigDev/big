Big.SearchController = Ember.Controller.extend({
	searchUrlPrefix: 'api/search',
	needs: 'results',
	querystr: '',

	buildUrl: function(querystring) {
		return this.searchUrlPrefix+
			'?q='+querystring;
	},	

	makeSearch: function(querystring) {
		this.set('querystr', querystring);
		var me = this;

		$.ajax({
			url: this.buildUrl(querystring),
			dataType: 'json'
		}).done(function(data) {
			me.get('controllers.results').getData(data.response.docs);
		});
		this.transitionToRoute('results.index');
	},

	query: function() {
		var querystr = document.forms["search"].elements["query"].value;
		querystr = $.trim(querystr);
		if (!querystr)
			return false;
		this.makeSearch(querystr);
	}
});

Big.SearchAdvController = Ember.Controller.extend({
	needs: 'search',

	query: function() {
		console.log("query: "+this.querystr);
		this.get('controllers.search').makeSearch(this.querystr);
	}
});


