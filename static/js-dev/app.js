App = Ember.Application.create();

App.ApplicationView = Ember.View.extend({
	templateName: 'big'
});
App.ApplicationController = Ember.Controller.extend();

App.SearchIndexView = Ember.View.extend();
App.SearchIndexController = Ember.Controller.extend({
	query: function(ev) {
		console.log('is this working?');
		
	}
});

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

App.SearchRoute = Ember.Route.extend({
	events: {
		query: function(ev) {
			this.transitionTo('articles');
		}
	}
});

App.SearchIndexRoute = Ember.Route.extend({
	events: {
		changeToAdv: function(ev) {
			this.transitionTo('search.adv');
		}
	}
});

App.SearchAdvRoute = Ember.Route.extend({
	events: {
		changeToSimple: function(ev) {
			this.transitionTo('search.index');
		}
	}
});
