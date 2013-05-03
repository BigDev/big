
import cherrypy

class Root(object):
	exposed = True

        @cherrypy.tools.mako(filename="index.html")
	def GET(self, text = 'hello world'):
		return {'bla': text}

	def POST(self):
		return 'ola'

