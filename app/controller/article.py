import os
import cherrypy
import solr

class Article(object):
	exposed = True

	def GET(self):
		return cherrypy.request.app.config['database']['host']

	def POST(self, author=None, title=None, abstract=None, classification=None, institution=None, keywords=None, year=None, filepdf=None):

		con = solr.SolrConnection('http://localhost:8983/solr')
		con.add(
			author=author,
			title=title,
			abstract=abstract,
			classification=classification,
			institution=institution,
			keywords=keywords,
			year=year,
			filename=filepdf.filename
		)
		con.commit()

		fdir = os.path.join(os.getcwd(), 'static/data')
		fname = fdir + '/%s' % filepdf.filename
		fOut = open(fname, 'w')

		while True:
			data = filepdf.file.read(8192)
			if not data:
				break
			fOut.write(data)

		fOut.close()

		return '%s - %s - %s - %s - %s - %s - %s - %s' % (author, title, abstract, classification, institution, keywords, year, filepdf.filename)

