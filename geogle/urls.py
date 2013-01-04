from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView
from geogle.models import Article, Review

urlpatterns = patterns('geogle.views',
    url(r'^$', 'IndexView'),
    url(r'^article/(?P<id>\d+)$', 'ArticleView'),
)
