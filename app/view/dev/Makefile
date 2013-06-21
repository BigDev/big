CC= jade
JDFLAGS = 
STATICD = ../../../static
PRODCSS = $(STATICD)/css
PRODJS = $(STATICD)/js
PRODHTML = ..
LESSD = less
JADEDIR = jade
JSDIR = js

.PHONY: jade all debug setdbg clean less js

all: jade less js
debug: setdbg |  all
setdbg:
	$(eval JDFLAGS+=--pretty)
clean:
	rm *.html

jade: $(wildcard $(JADEDIR)/*.jade)
	$(CC) $(JDFLAGS) < $(JADEDIR)/index.jade --path $(JADEDIR)/index.jade > $(PRODHTML)/index.html

less: $(LESSD)/search.less $(LESSD)/big.less
	lessc -x --yui-compress $(LESSD)/big.less > $(PRODCSS)/big.min.css

js: $(wildcard $(JSDIR)/*.js)
	cat $^ > $(PRODJS)/app.js
