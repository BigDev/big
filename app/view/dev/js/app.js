Big = Ember.Application.create();

Big.Router.map(function() {
	this.resource('search', function() {
		this.route('adv');
	});
	this.resource('results', function() {
		this.route('info', {path: 'info/:article_id'});
	});
	this.resource('article', {path: 'article/:article_id'});
	this.route('upload');
});

Big.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('search');
	}
});

Big.SearchIndexRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render();
		this.render('search/index', {controller: 'Search'});
	}
});

Big.ResultsRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render();
		this.render('upper-search', {into: 'results', outlet: 'upperSearch',
			controller: 'Search'});
		this.render('article-list', {into: 'results', outlet: 'articleList'});
	}
});

Big.ArticleRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render();
		this.render('upper-search', {into: 'article', outlet: 'upperSearch',
			controller: 'Search'});
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

Handlebars.registerHelper('csl', function(arr) {
	console.log (arr);
});

Big.ResultsController = Ember.ArrayController.extend({
	defaultPath: 'data/',

	getData: function(data) {
		this.clear();
		this.set('content', []);

		for (var i=0; i<data.length; i++) {
			var newObj = Ember.Object.create({
				filepath: this.defaultPath+data[i].filename,
				authors: data[i].author,
				keywords: data[i].keywords,
				title: data[i].title,
				year: data[i].year,
				classification: data[i].classification,
				'abstract': data[i]['abstract'],
				'institution': data[i].institution,
				'id': data[i].id	
			});
			
			this.pushObject(newObj);
		}
	}
});
