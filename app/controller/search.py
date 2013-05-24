import cherrypy
import httplib2

class Search(object):
	exposed = True

	def GET(self, q = None):
		params = '?q=%s' % q.replace(' ','+')
		url = 'http://localhost:8983/solr/collection1/query' + params
		resp, content = httplib2.Http().request(url, 'GET')
		return content

