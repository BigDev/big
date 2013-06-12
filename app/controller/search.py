import cherrypy
import requests
import solr
import json

class Search(object):
	exposed = True

	def GET(self, q = None, fl = "id,author,title,filename,classification,keywords,abstract,year,institution"):

		if q == None:
			return ''

		params = '?q=%s&fl=%s' % (q.replace(' ','+'), fl)
		url = 'http://localhost:8983/solr/collection1/query' + params

		try:
			r = requests.get(url)
		except:
			# TODO: log
			raise cherrypy.HTTPRedirect("/error")

		return r.content

