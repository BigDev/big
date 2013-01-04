from django.shortcuts import render_to_response
from geogle.models import Article
from string import punctuation

def IndexView(request):
	query = ""
	articles = []

	if request.GET.has_key("q") == True and len(request.GET["q"]) > 0:
		query = request.GET["q"]
		tsquery = ''
		for word in query.strip(punctuation).split(' '):
			if len(word) > 0:
				if len(tsquery) == 0:
					tsquery = (word+':*')
				else:
					tsquery = tsquery + ' | ' + (word+':*')

		articles = Article.objects.raw("SELECT id, title, abstract, author_id, date FROM geogle_article WHERE search_index @@@ to_tsquery(simples(%s));", [tsquery])

	return render_to_response('search.html', {"query":query, "articles":articles})

def ArticleView(request, id):
	article = Article.objects.get(id=id)
	return render_to_response('article.html', {"article":article})

