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
	},
	model: function() {
		return Big.Article.find();
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

Big.Store = DS.Store.extend({
	revision: 12,
	adapter: 'DS.FixtureAdapter'
});

Big.Article = DS.Model.extend({
	title: DS.attr('string'),
	author: DS.attr('string'),
	abstrac: DS.attr('string'),
	detail: DS.attr('string')
});

Big.Article.FIXTURES = [{
	'id': 1,
	'title': 'Article1',
	'author': 'Author1',
	'abstrac': 'This is an abstract act act act',
	'detail': 'Goddamn!'
},
{
	'id': 2,
	'title': 'Article2',
	'author': 'Author1',
	'abstrac': 'This is an abstract act act act',
	'detail': 'Goddamn!'
},
{
	'id': 3,
	'title': 'Article3',
	'author': 'Author1',
	'abstrac': 'This is an abstract act act act',
	'detail': 'Goddamn!'
},
{
	'id': 4,
	'title': 'Article4',
	'author': 'Author1',
	'abstrac': 'This is an abstract act act act',
	'detail': 'Goddamn!'
}]
