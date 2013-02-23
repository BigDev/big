App = Ember.Application.create();

App.ApplicationView = Ember.View.extend({
	templateName: 'big'
});
App.ApplicationController = Ember.Controller.extend();

App.SearchView = Ember.View.extend({
	templateName: 'search'
});
App.SearchController = Ember.Controller.extend();


App.Router.map(function() {
	this.route("index");
	this.route("search");
});

App.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('search');
	}
});
