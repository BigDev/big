
import cherrypy
from app.controller.error import Error
from app.controller.article import Article
from app.controller.search import Search

class Api(object):
	exposed = True
	search = Search()

class Root(object):
	exposed = True

	error = Error()
	article = Article()
	api = Api()

        @cherrypy.tools.mako(filename="index.html")
	def GET(self):
		return {}

