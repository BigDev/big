import os
import cherrypy

class Article(object):
	exposed = True

        @cherrypy.tools.mako(filename="index.html")
	def GET(self, text = 'hello world 2'):
		return {'bla': text}

	def POST(self, myFile=None):
		size = 0
		while True:
			data = myFile.file.read(8192)
			if not data:
				break
			size += len(data)

		return 'size: %s' % size

