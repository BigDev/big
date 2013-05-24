
import cherrypy
import psycopg2

def getConnectionString():

	host = cherrypy.request.app.config['database']['host']
	port = cherrypy.request.app.config['database']['port']
	dbname = cherrypy.request.app.config['database']['dbname']
	login = cherrypy.request.app.config['database']['login']
	passwd = cherrypy.request.app.config['database']['passwd']

	return "host=%s port=%s dbname=%s login=%s passwd=%s" % (host, port, dbname, login, passwd)

