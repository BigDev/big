import os
import cherrypy

import solr

class Article(object):
	exposed = True

	def GET(self):
		pass

	def POST(self, author=None, title=None, abstract=None, classification=None, institution=None, keywords=None, year=None, filepdf=None):

#		con = solr.SolrConnection('http://localhost:8983/solr')
#		con.add(id=2,author=author, title=title, capes=classification, institution=institution, keywords=keywords, year=year)
#		con.commit()

		id = 1
		dir = os.path.join(os.getcwd(), 'static/data')
		filename = dir + '/a%s.pdf' % id
		fOut = open(filename, 'w')

		while True:
			data = filepdf.file.read(8192)
			if not data:
				break
			fOut.write(data)

		fOut.close()

		return '%s - %s - %s - %s - %s - %s - %s - %s' % (author, title, abstract, classification, institution, keywords, year, filepdf.fp)

