Big = Ember.Application.create();

Big.Router.map(function() {
	this.resource('search', function() {
		this.route('adv');
	});
	this.resource('results', function() {
		this.route('info', {path: 'info/:article_id'});
	});
	this.resource('article', {path: 'article/:article_id'});
	this.route('upload');
});

Big.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('search');
	}
});

Big.ResultsRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render();
		this.render('upper-search', {into: 'results', outlet: 'upperSearch',
			controller: 'SearchIndex'});
		this.render('article-list', {into: 'results', outlet: 'articleList'});
	}
});

Big.ArticleRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render();
		this.render('upper-search', {into: 'article', outlet: 'upperSearch',
			controller: 'SearchIndex'});
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

Big.ResultsController = Ember.ArrayController.extend({
	defaultPath: 'data/',

	getData: function(data) {
		this.set('content', []);

		for (var i=0; i<data.length; i++) {
			var newObj = Ember.Object.create({
				filepath: this.defaultPath+data[i].filename,
				authors: data[i].author,
				keywords: data[i].keywords,
				title: data[i].title,
				year: data[i].year,
				periodic: 'dummy data',
				classification: data[i].classification,
				'abstract': data[i]['abstract'],
				'institution': data[i].institution,
				'id': data[i].id	
			});
			
			this.pushObject(newObj);
		}
	}
});
Big.SearchController = Ember.Controller.extend({
	searchUrlPrefix: 'api/search',
	needs: 'results',
	querystr: '',

	buildUrl: function(querystring) {
		return this.searchUrlPrefix+
			'?q='+querystring;
	},	

	makeSearch: function(querystring) {
		this.set('querystr', querystring);
		var me = this;

		$.ajax({
			url: this.buildUrl(querystring),
			dataType: 'json'
		}).done(function(data) {
			me.get('controllers.results').getData(data.response.docs);
		});
		this.transitionToRoute('results.index');
	}
});

Big.SearchIndexController = Ember.Controller.extend({
	needs: 'search',

	query: function() {
		var querystr = document.forms["search"].elements["query"].value;
		console.log(querystr);
		querystr = $.trim(querystr);
		if (!querystr)
			return false;
		this.get('controllers.search').makeSearch(querystr);
	}
});

Big.SearchAdvController = Ember.Controller.extend({
	needs: 'search',

	query: function() {
		console.log("query: "+this.querystr);
		this.get('controllers.search').makeSearch(this.querystr);
	}
});


