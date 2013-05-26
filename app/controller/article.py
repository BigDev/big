import os
import cherrypy
import requests
import json

# http://localhost:8983/solr/update?stream.body=%3Cdelete%3E%3Cquery%3E*:*%3C/query%3E%3C/delete%3E&commit=true

class Article(object):
	exposed = True

	def GET(self):
		pass

	def POST(self, id, author=None, title=None, abstract=None, classification=None, institution=None, keywords=None, year=None, filepdf=None):

		url = 'http://localhost:8983/solr/update'

		r = requests.post('%s/extract?literal.id=%s&commit=true' % (url, id), files={filepdf.filename:filepdf.file})

		doc = [{
				'id':id,
				'author':author,
				'title':title,
				'abstract':abstract,
				'classification':classification,
				'institution':institution,
				'keywords':keywords,
				'year':year,
				'filename':filepdf.filename,

		}]
		r = requests.post('%s?commit=true' % url, data=json.dumps(doc), headers={'content-type':'application/json'})

		fdir = os.path.join(os.getcwd(), 'static/data')
		fname = fdir + '/%s' % filepdf.filename
		fOut = open(fname, 'w')

		filepdf.file.seek(0)
		while True:
			data = filepdf.file.read(8192)
			if not data:
				break
			fOut.write(data)

		fOut.close()

		return '%s - %s - %s - %s - %s - %s - %s - %s' % (author, title, abstract, classification, institution, keywords, year, filepdf.filename)

