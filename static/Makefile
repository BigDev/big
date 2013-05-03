CC= jade
OBJS= index.html
JDFLAGS = 
PRODCSS = css
LESSD = less

.PHONY: all debug setdbg clean less

all: $(OBJS) less
debug: setdbg |  all
setdbg:
	$(eval JDFLAGS+=--pretty)
clean:
	rm *.html

%.html:%.jade
	$(CC) $(JDFLAGS) < $< --path $< > $@

less: $(LESSD)/search.less $(LESSD)/big.less
	lessc -x --yui-compress $(LESSD)/big.less > $(PRODCSS)/big.min.css
