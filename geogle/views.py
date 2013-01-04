from django.shortcuts import render_to_response
from geogle.models import Article

def IndexView(request):
	query = ""
	articles = []

	if request.GET.has_key("q") == True and len(request.GET["q"]) > 0:
		articles = Article.objects.raw("SELECT id, title, abstract, author_id, date FROM geogle_article WHERE search_index @@@ to_tsquery(simples(%s));", [request.GET["q"]])
		query = request.GET["q"]

	return render_to_response('search.html', {"query":query, "articles":articles})

def ArticleView(request, id):
	article = Article.objects.get(id=id)
	return render_to_response('article.html', {"article":article})

