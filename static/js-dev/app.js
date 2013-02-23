App = Ember.Application.create();

App.ApplicationView = Ember.View.extend({
	templateName: 'big'
});
App.ApplicationController = Ember.Controller.extend();

App.SearchView = Ember.View.extend();
App.SearchController = Ember.Controller.extend();

App.AdvSearchView = Ember.View.extend();
App.AdvSearchController = Ember.View.extend();

App.Router.map(function() {
	this.resource('search', function() {
		this.route('adv');
	});
});

App.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('search');
	}
});

