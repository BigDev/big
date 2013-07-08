Big = Ember.Application.create();

Big.Router.map(function() {
	this.resource('search', function() {
		this.route('adv');
	});
	this.resource('results', {path: '/:query'}, function() {
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

Big.SearchIndexRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render();
		this.render('search/index', {controller: 'Search'});
	}
});

Big.ResultsRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render();
		this.render('upper-search', {into: 'results', outlet: 'upperSearch',
			controller: 'Search'});
		this.render('article-list', {into: 'results', outlet: 'articleList'});
	}
});

Big.ArticleRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render();
		this.render('upper-search', {into: 'article', outlet: 'upperSearch',
			controller: 'Search'});
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
		this.clear();
		this.set('content', []);

		for (var i=0; i<data.length; i++) {
			var newObj = Ember.Object.create({
				filepath: this.defaultPath+data[i].filename,
				authors: data[i].author,
				keywords: data[i].keywords,
				title: data[i].title,
				year: data[i].year,
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
	},

	query: function() {
		var querystr = document.forms["search"].elements["query"].value;
		querystr = $.trim(querystr);
		if (!querystr)
			return false;
		this.makeSearch(querystr);
	}
});

Big.SearchAdvController = Ember.Controller.extend({
	needs: 'search',

	query: function() {
		console.log("query: "+this.querystr);
		this.get('controllers.search').makeSearch(this.querystr);
	}
});


function createHidden(inputName, inputValue) {
	var el = document.createElement('input');
	el.type="hidden";
	el.name=inputName;
	el.value=inputValue;
	return el;
}

function multipleValues(inputName, formName) {
	var form = document.forms[formName];
	var field = form.elements[inputName];

	var arr = field.value.split(",");
	if (arr.length==0) return; 

	field.value = $.trim(arr[0]);
	
	for (var i=1; i<arr.length; i++) {
		if ($.trim(arr[i])=='')
			continue;

		form.appendChild(createHidden(
			field.name,	
			$.trim(arr[i])
		));
	}
}

Big.UploadController = Ember.Controller.extend({
	submit: function() {
		multipleValues("author", "upload");
		multipleValues("keywords", "upload");
	}
});
