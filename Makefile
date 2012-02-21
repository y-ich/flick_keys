TARGET	= flick_keys

all: $(TARGET).min.js

$(TARGET).min.js: $(TARGET).js
	uglifyjs $< > $@

push:
	git push origin master

.coffee.js:
	coffee -c $<
