
import cherrypy

class Root(object):
	exposed = True

	def GET(self):
		return dir(cherrypy.request)

	def POST(self):
		return 'ola'

