from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView
from search.models import Article, Review

urlpatterns = patterns('search.views',
    url(r'^$', 'IndexView'),
    url(r'^article/(?P<id>\d+)$', 'ArticleView'),
)
