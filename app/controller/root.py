
import cherrypy
from app.controller.article import Article

class Root(object):
	exposed = True

	article = Article()

        @cherrypy.tools.mako(filename="index.html")
	def GET(self):
		text = 'hello world'
		return {'bla': text}

