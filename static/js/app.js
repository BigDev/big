Big = Ember.Application.create();

Big.Router.map(function() {
	this.resource('search');
	this.resource('adv-search');
	this.resource('articles', function() {
		this.resource('article', {path: ':article_id'});
	});
});
