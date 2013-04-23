CC= jade
OBJS= index.html
JDFLAGS = 

.PHONY: all debug setdbg clean

all: $(OBJS)
debug: setdbg |  all
setdbg:
	$(eval JDFLAGS+=--pretty)
clean:
	rm *.html

%.html:%.jade
	$(CC) $(JDFLAGS) < $< --path $< > $@  
