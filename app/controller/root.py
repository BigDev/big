
import cherrypy
from app.controller.article import Article
from app.controller.search import Search

class Root(object):
	exposed = True

	article = Article()
	search = Search()

        @cherrypy.tools.mako(filename="index.html")
	def GET(self):
		text = 'hello world'
		return {'bla': text}

