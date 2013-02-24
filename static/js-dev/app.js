App = Ember.Application.create();

App.ApplicationView = Ember.View.extend({
	templateName: 'big'
});
App.ApplicationController = Ember.Controller.extend();

App.SearchIndexView = Ember.View.extend();
App.SearchIndexController = Ember.Controller.extend();

App.AdvSearchView = Ember.View.extend({
});
App.AdvSearchController = Ember.View.extend();


App.Router.map(function() {
	this.resource('search', function() {
		this.route('adv');
	});

	this.route('articles');
	this.route('article', {path: '/article/:article_id'});

});

App.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('search');
	}
});

