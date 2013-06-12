Big = Ember.Application.create();

Big.Router.map(function() {
	this.resource('search', function() {
		this.route('adv');
	});
	this.resource('results', function() {
		this.route('info', {path: 'info/:article_id'});
	});
	this.resource('article', {path: 'article/:article_id'});
});

Big.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('search');
	}
});

Big.ResultsRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render();
		this.render('upper-search', {into: 'results', outlet: 'upperSearch'});
		this.render('article-list', {into: 'results', outlet: 'articleList'});
	}
});

Big.ArticleRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render();
		this.render('upper-search', {into: 'article', outlet: 'upperSearch'});
		this.render('article-info', {into: 'article', outlet: 'articleInfo'});
		this.render('article-pdf', {into: 'article', outlet: 'articlePdf'});	
	}
});

Big.ResultsInfoRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render('article-info', {into: 'results', outlet: 'articleInfo'});
	}
});

Big.SearchView = Ember.View.extend({
	templateName: 'search',
	
	init: function() {
		this._super();
		this.on('didInsertElement', this.centerVertically);
		$(window).resize(this.centerVertically);
	},
	
	centerVertically: function() {
		var sdiv = $('#search-div');
		var oh = $(sdiv).height();
		var wh = $(window).height();

		$(sdiv).css('top', wh/2-oh/2);
	}
});

Big.Article = Ember.Object.extend();

Big.SearchController = Ember.Controller.extend({
	searchUrlPrefix: 'http://localhost:8000/api/search',

	buildUrl: function(querystring) {
		return this.searchUrlPrefix+
			'?q="'+querystring+'"';
	},	

	makeSearch: function(querystring) {
		//return $.ajax({
		//	url: this.buildUrl(querystring) 
		//});
	}
});

Big.SearchIndexController = Ember.Controller.extend({
	needs: 'search',
	querystr: '',	

	query: function() {
		console.log("query: "+this.get('querystr'));
		this.get('controllers.search').makeSearch(this.get('querystr'));
		this.transitionToRoute('results.index');
	}
});

Big.SearchAdvController = Ember.Controller.extend({
	needs: 'search',
	querystr: '',	

	query: function() {
		console.log("query: "+this.querystr);
		this.get('controllers.search').makeSearch(this.querystr);
		this.transitionToRoute('results.index');
	}
});


Big.ResultsController = Ember.Controller.extend({

});
