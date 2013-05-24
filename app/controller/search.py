import cherrypy
import httplib2
import solr
import json

class Search(object):
	exposed = True

	def GET(self, q = None):

		if q == None:
			return ''

		params = '?q=%s' % q.replace(' ','+')
		url = 'http://localhost:8983/solr/collection1/query' + params

		try:
			resp, content = httplib2.Http().request(url, 'GET')
		except:
			# TODO: log
			raise cherrypy.HTTPRedirect("/error")

		return content

