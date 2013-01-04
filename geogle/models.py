from django.db import models
from django.contrib import admin
from taggit.managers import TaggableManager

class Author(models.Model):
	name = models.CharField(max_length=100)

	def __unicode__(self):
		return u"%s" % (self.name)

class Article(models.Model):
	title = models.CharField(max_length=100)
	abstract = models.TextField()
	author = models.ForeignKey(Author)
	date = models.DateField()
	tags = TaggableManager()

	def __unicode__(self):
		return u"%s" % (self.title)

class Review(models.Model):
	article = models.ForeignKey(Article)
	pontuation = models.PositiveSmallIntegerField()
	name = models.CharField(max_length=100)
	review = models.TextField()
	date = models.DateField(auto_now=True)

	def __unicode__(self):
		return u"%s" % (self.name + ' -> ' + self.article.title)

admin.site.register(Author)
admin.site.register(Article)
admin.site.register(Review)

