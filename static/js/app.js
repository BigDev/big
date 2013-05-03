Big = Ember.Application.create();

Big.Router.map(function() {
	this.resource('search', function() {
		this.route('adv');
	});
	this.resource('articles', function() {
		this.resource('article', {path: ':article_id'});
	});
});

Big.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('search');
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

		console.log(this.$());
	}
});
