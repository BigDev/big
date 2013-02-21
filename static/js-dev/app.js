App = Ember.Application.create();

App.ApplicationView = Ember.View.extend({
	templateName: 'search'
});
App.ApplicationController = Ember.Controller.extend();

App.SearchView = Ember.View.extend({
	templateName: 'search'
});
App.SearchController = Ember.Controller.extend();


App.Router = Ember.Router.extend({
	enableLogging: true,
	location: 'hash',

	root: Ember.Route.extend({
		index: Ember.Route.extend({
			route: '/',
			redirectsTo: 'search'
		}),

		search: Ember.Route.extend({
			route: '/search',
			connectOutlets: function(router) {
				var tmp=router.get('applicationController');
				console.log(tmp);
				tmp.connectOutlet('search');
			}
		})
	})
});
