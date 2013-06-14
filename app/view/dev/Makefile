CC= jade
JDFLAGS = 
PRODCSS = ../../../static/css
PRODHTML = ..
LESSD = less
JADEDIR = jade

.PHONY: jade all debug setdbg clean less

all: jade less
debug: setdbg |  all
setdbg:
	$(eval JDFLAGS+=--pretty)
clean:
	rm *.html

jade: $(wildcard $(JADEDIR)/*.jade)
	$(CC) $(JDFLAGS) < $(JADEDIR)/index.jade --path $(JADEDIR)/index.jade > $(PRODHTML)/index.html

less: $(LESSD)/search.less $(LESSD)/big.less
	lessc -x --yui-compress $(LESSD)/big.less > $(PRODCSS)/big.min.css
