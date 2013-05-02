# -*- encoding:utf-8 -*-
from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 8
_modified_time = 1367480303.475946
_enable_loop = True
_template_filename = '/var/www/localhost/htdocs/big/app/view/index.html'
_template_uri = 'index.html'
_source_encoding = 'utf-8'
_exports = ['makerow']


def render_body(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        __M_locals = __M_dict_builtin(pageargs=pageargs)
        range = context.get('range', UNDEFINED)
        def makerow(row):
            return render_makerow(context.locals_(__M_locals),row)
        __M_writer = context.writer()
        # SOURCE LINE 1
        __M_writer(u'<html>\n<head>\n\t<meta http-equiv="content-type" content="text/html; charset=utf-8">\n\n\t<title>Index</title>\n\t\n</head>\n<body>\n')
        # SOURCE LINE 9

        rows = [[v for v in range(0,10)] for row in range(0,10)]
        
        
        __M_locals_builtin_stored = __M_locals_builtin()
        __M_locals.update(__M_dict_builtin([(__M_key, __M_locals_builtin_stored[__M_key]) for __M_key in ['rows','row','v'] if __M_key in __M_locals_builtin_stored]))
        # SOURCE LINE 11
        __M_writer(u'\n<table>\n')
        # SOURCE LINE 13
        for row in rows:
            # SOURCE LINE 14
            __M_writer(u'        ')
            __M_writer(unicode(makerow(row)))
            __M_writer(u'\n')
        # SOURCE LINE 16
        __M_writer(u'</table>\n\n')
        # SOURCE LINE 24
        __M_writer(u'\n</body>\n</html>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_makerow(context,row):
    __M_caller = context.caller_stack._push_frame()
    try:
        bla = context.get('bla', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 18
        __M_writer(u'\n    <tr>\n')
        # SOURCE LINE 20
        for name in row:
            # SOURCE LINE 21
            __M_writer(u'        <td>')
            __M_writer(unicode(name))
            __M_writer(u' ')
            __M_writer(unicode(bla))
            __M_writer(u'</td>')
        # SOURCE LINE 23
        __M_writer(u'    </tr>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


