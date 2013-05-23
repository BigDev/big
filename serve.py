# -*- coding: utf-8 -*-
import sys
import logging
from logging import handlers
import os, os.path

import cherrypy
from cherrypy import _cplogging
from cherrypy.lib import httputil

class Server(object):
    def __init__(self, options):
        # First let's see where we're located
        self.base_dir = os.path.normpath(os.path.abspath(options.basedir))

        # Our conf directory
        self.conf_path = os.path.join(self.base_dir, "conf")

        # Mercurial doesn't track empty directory so we may need
        # to create the logs directory
        log_dir = os.path.join(self.base_dir, "logs")
        if not os.path.exists(log_dir):
            os.mkdir(log_dir)

        # Update the global settings for the HTTP server and engine
        cherrypy.config.update(os.path.join(self.conf_path, "server.cfg"))
        #cherrypy.config.update({'error_page.default': self.on_error})
        
        engine = cherrypy.engine

        # We amend the system path so that Python can find
        # the application's modules.
        sys.path.insert(0, self.base_dir)

        from lib.template import MakoLoader
        cherrypy.tools.mako = cherrypy.Tool('on_start_resource', MakoLoader())

        from lib.BackgroundTaskQueue import BackgroundTaskQueue
        cherrypy.tools.bgtask = BackgroundTaskQueue(cherrypy.engine)
        cherrypy.tools.bgtask.subscribe()

         # Let's mount the application so that CherryPy can serve it
        from app.controller.root import Root
        webapp = Root()
        app = cherrypy.tree.mount(webapp, '/', os.path.join(self.conf_path, "app.cfg"))
        self.make_rotate_logs(app)
     
    def run(self):
        engine = cherrypy.engine
        
        if hasattr(engine, "signal_handler"):
            engine.signal_handler.subscribe()
            
        if hasattr(engine, "console_control_handler"):
            engine.console_control_handler.subscribe()

        # Let's start the CherryPy engine so that
        # everything works
        engine.start()

        # Run the engine main loop
        engine.block()

    def make_rotate_logs(self, app):
        # see http://www.cherrypy.org/wiki/Logging#CustomHandlers
        log = app.log
        
        # Remove the default FileHandlers if present.
        log.error_file = ""
        log.access_file = ""
        
        maxBytes = getattr(log, "rot_maxBytes", 10485760)
        backupCount = getattr(log, "rot_backupCount", 5)
       
        # Make a new RotatingFileHandler for the error log.
        fname = getattr(log, "rot_error_file", "./logs/error.log")
        h = handlers.RotatingFileHandler(fname, 'a', maxBytes, backupCount)
        h.setLevel(logging.DEBUG)
        h.setFormatter(_cplogging.logfmt)
        log.error_log.addHandler(h)
        
        # Make a new RotatingFileHandler for the access log.
        fname = getattr(log, "rot_access_file", "./logs/access.log")
        h = handlers.RotatingFileHandler(fname, 'a', maxBytes, backupCount)
        h.setLevel(logging.DEBUG)
        h.setFormatter(_cplogging.logfmt)
        log.access_log.addHandler(h)
            
if __name__ == '__main__':
    from optparse import OptionParser
    
    def parse_commandline():
        curdir = os.path.normpath(os.path.abspath(os.path.curdir))
        
        parser = OptionParser()
        parser.add_option("-b", "--base-dir", dest="basedir",
                          help="Base directory in which the server "\
                          "is launched (default: %s)" % curdir)
        parser.set_defaults(basedir=curdir)
        (options, args) = parser.parse_args()

        return options

    Server(parse_commandline()).run()
