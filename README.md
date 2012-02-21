Onscreen Key library with flick feature for mobile browser

License: MIT

Copyright (c) 2012 ICHIKAWA, Yuji, http://github.com/y-ich

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# usage:
#  0. "flickKeys" is the only global variable.
#      flickKeys.sound is a boolean that determine whether enables click sound or not.
#      flickKeys.initialize is a intialization function.
#      flickKeys.isPushed is a function to let you know whether a special key is pushed or not. 
#  1. prepare keys in an HTML file like the below
#    <div title="+" class="key main>+
#        <div title="-" class="key sub>-</div>
#    </div>
#    <div data-keyid="Alt" class="key main">Alt</div>
#    "title" property is used for output at key release.
#    The child element is a second key, so basically invisible.
#    you need to setup such things with layout in CSS.
#    "data-keyid" propery is used for special keys.
#  2. prepare prefetch functions if necessary. (for modifier keys.) 
#  3. call flickKeys.intialize before using keys.
#
# parameters:
#  KeyFSM.holdTime: hold time to activate subkey
#
# implementation:
#  Using MVC pattern, KeyFSM is Model, DOM is V, and KeyState is C.
#  KeyState uses "Choosing Method."
#  KeyFSM uses Observer pattern.
#  There is a single controller using four instances of KeyState.
#  So updating method for each key is one kind. that is kind of restriction.