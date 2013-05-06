Big = Ember.Application.create();

Big.Router.map(function() {
	this.resource('search', function() {
		this.route('adv');
	});
	this.resource('articles');
	this.resource('article', {path: ':article_id'});
});

Big.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('search');
	}
});

Big.ArticlesRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render();
		this.render('upper-search', {into: 'articles', outlet: 'upperSearch'});
		this.render('article-list', {into: 'articles', outlet: 'articleList'});
	},
	model: function() {
		console.log(Big.Article.find());
		return Big.Article.find();
	}
});

Big.SearchView = Ember.View.extend({
	templateName: 'search',
	
	init: function() {
		this._super();
		this.on('didInsertElement', this.centerVertically);
	},
	
	centerVertically: function() {
		var oh = this.$().outerHeight();
		console.log(oh);		
		var wh = $(window).height();
		console.log(wh);

		console.log(this.$().find('#search-div').height());
		console.log(this.$());
	}
});

Big.Store = DS.Store.extend({
	revision: 12,
	adapter: 'DS.FixtureAdapter'
});

Big.Article = DS.Model.extend({
	title: DS.attr('string'),
	author: DS.attr('string'),
	abstrac: DS.attr('string')
});

Big.Article.FIXTURES = [{
	'id': 1,
	'title': 'Article1',
	'author': 'Author1',
	'abstrac': 'This is an abstract act act act'
},
{
	'id': 2,
	'title': 'Article1',
	'author': 'Author1',
	'abstrac': 'This is an abstract act act act'
},
{
	'id': 3,
	'title': 'Article1',
	'author': 'Author1',
	'abstrac': 'This is an abstract act act act'
},
{
	'id': 4,
	'title': 'Article1',
	'author': 'Author1',
	'abstrac': 'This is an abstract act act act'
}]

Big.ArticlesController = Ember.Controller.extend({
	
});
