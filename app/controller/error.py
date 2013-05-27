
import cherrypy

class Error(object):
	exposed = True

        @cherrypy.tools.mako(filename="error.html")
	def GET(self):
		return {}

