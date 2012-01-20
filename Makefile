TARGET	= flick_keys

all: $(TARGET).min.js $(TARGET)_test.js

$(TARGET).min.js: $(TARGET).js
	uglifyjs $< > $@

$(TARGET).js: flick_keys.coffee
	coffee -cj $(TARGET) $^

$(TARGET)_test.js: flick_keys.coffee flick_keys_test.coffee
	coffee -cj $(TARGET)_test $^

push:
	git push origin master
