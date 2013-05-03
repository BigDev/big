Big = Ember.Application.create();

Big.Router.map(function() {
	this.resource('search', function() {
		this.resource('adv');
	});
	this.resource('articles', function() {
		this.resource('article', {path: ':article_id'});
	});
});

Big.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('search/index');
	}
});
