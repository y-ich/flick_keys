(function() {
  var KeyFSM, KeyState, fireKeyEvent, fireTextEvent, keyActive, keyCodes, keyInactive, keySound, keySubActive, keySubInactive;

  keySound = {
    source: new Audio('sounds/click.aiff'),
    enable: true,
    play: function() {
      if (!this.enable) return;
      this.source.play();
      return keySound.timer = setTimeout(function() {
        keySound.source.pause();
        try {
          return keySound.source.currentTime = 0;
        } catch (e) {

        }
      }, 30);
    }
  };

  KeyFSM = (function() {

    function KeyFSM(state, observer, holdTime) {
      this.state = state;
      this.observer = observer;
      this.holdTime = holdTime;
    }

    KeyFSM.prototype.setState = function(state) {
      this.state = state;
      return this.changed();
    };

    KeyFSM.prototype.subkey = function() {
      var _ref;
      return (_ref = this.observer.childNodes[1]) != null ? _ref : null;
    };

    KeyFSM.prototype.changed = function() {
      return this.state.update(this.observer, this.subkey());
    };

    KeyFSM.prototype.clearTimer = function() {
      if (this.timer != null) clearTimeout(this.timer);
      return this.timer = null;
    };

    KeyFSM.prototype.touchStart = function(startX, startY) {
      var _this = this;
      this.startX = startX;
      this.startY = startY;
      setTimeout((function() {
        return keySound.source.play();
      }), 0);
      this.setState(keyActive);
      if (this.subkey() != null) {
        this.timer = setTimeout((function() {
          return _this.setState(keySubActive);
        }), this.holdTime);
      }
      return fireKeyEvent('keydown', this.observer.id, this.keyCode(), 0);
    };

    KeyFSM.prototype.touchMove = function(event) {
      var moveX, moveY, touchPoint;
      touchPoint = event.targetTouches[0];
      moveX = touchPoint.pageX - this.startX;
      moveY = touchPoint.pageY - this.startY;
      return this.state.touchMove(this, moveX, moveY);
    };

    KeyFSM.prototype.touchEnd = function() {
      this.state.touchEnd(this);
      return fireKeyEvent('keyup', this.observer.id, this.keyCode(), 0);
    };

    KeyFSM.prototype.keyCode = function() {
      if (this.observer.id != null) {
        return keyCodes[this.observer.id];
      } else if (this.observer.title != null) {
        return this.observer.title.charCodeAt(0);
      } else {
        return 0;
      }
    };

    return KeyFSM;

  })();

  KeyState = (function() {

    function KeyState() {}

    KeyState.prototype.update = function(main, sub) {};

    KeyState.prototype.touchMove = function(fsm, moveX, moveY) {};

    KeyState.prototype.touchEnd = function(fsm) {};

    KeyState.prototype.inRange = function(moveX, moveY) {
      var keySize;
      keySize = $('.key').width();
      return (-keySize < moveX && moveX < keySize) && (-2 * keySize < moveY && moveY < keySize);
    };

    return KeyState;

  })();

  keyInactive = new KeyState();

  keyInactive.update = function(main, sub) {
    if (sub != null) return sub.style.display = 'none';
  };

  keyActive = new KeyState();

  keyActive.update = function(main, sub) {
    return main.style.backgroundColor = '#a0a0a0';
  };

  keyActive.touchMove = function(fsm, moveX, moveY) {
    var flickLength;
    flickLength = 30;
    if ((fsm.subkey() != null) && moveY < -flickLength && (-flickLength < moveX && moveX < flickLength)) {
      fsm.clearTimer();
      return fsm.setState(keySubActive);
    } else if (!this.inRange(moveX, moveY)) {
      fsm.clearTimer();
      return fsm.setState(keyInactive);
    }
  };

  keyActive.touchEnd = function(fsm) {
    var code;
    fsm.clearTimer();
    if (fsm.observer.title != null) {
      code = fsm.observer.title.charCodeAt(0);
      fireTextEvent(fsm.observer.title);
      fireKeyEvent('keypress', code, code);
    }
    return fsm.setState(keyInactive);
  };

  keySubActive = new KeyState();

  keySubActive.update = function(main, sub) {
    $(sub).css('color', '#fff');
    $(sub).css('background-image', '-webkit-gradient(linear, left top, left bottom, from(rgb(65,134,245)), to(rgb(25,79,220)))');
    return sub.style.display = 'block';
  };

  keySubActive.touchMove = function(fsm, moveX, moveY) {
    if (!this.inRange(moveX, moveY)) return fsm.setState(keySubInactive);
  };

  keySubActive.touchEnd = function(fsm) {
    var c;
    if ((fsm.subkey().title != null) && fsm.subkey().title !== '') {
      c = fsm.subkey().title.charCodeAt(0);
      fireTextEvent(fsm.subkey().title);
      fireKeyEvent('keypress', c, c);
    }
    return fsm.setState(keyInactive);
  };

  keySubInactive = new KeyState();

  keySubInactive.update = function(main, sub) {
    $(sub).css('color', '#000');
    return $(sub).css('background-image', '-webkit-gradient(linear, left top, left bottom, from(#EEEEF0), to(#D2D2D8))');
  };

  keySubInactive.touchMove = function(fsm, moveX, moveY) {
    if (this.inRange(moveX, moveY)) return fsm.setState(keySubActive);
  };

  keySubInactive.touchEnd = function(fsm) {
    return fsm.setState(keyInactive);
  };

  keyCodes = {
    'Control': 17,
    'Alt': 18,
    'Meta': 91,
    'Left': 37,
    'Right': 39,
    'Up': 38,
    'Home': 36,
    'PageUp': 33,
    'U+0009': 9,
    'Down': 40,
    'End': 35,
    'PageDown': 34,
    'Shift': 16
  };

  KeyboardEvent.DOM_KEY_LOCATION_STANDARD = 0;

  fireKeyEvent = function(type, keyIdentifier, keyCode, charCode) {
    var e;
    e = document.createEvent('KeyboardEvent');
    e.initKeyboardEvent(type, true, true, window, keyIdentifier, KeyboardEvent.DOM_KEY_LOCATION_STANDARD, '');
    e.override = {
      keyCode: keyCode,
      charCode: charCode
    };
    return document.activeElement.dispatchEvent(e);
  };

  TextEvent.DOM_INPUT_METHOD_KEYBOARD = 1;

  TextEvent.DOM_INPUT_METHOD_PASTE = 2;

  fireTextEvent = function(str, method) {
    var e;
    if (method == null) method = TextEvent.DOM_INPUT_METHOD_KEYBOARD;
    e = document.createEvent('TextEvent');
    e.initTextEvent('textInput', true, true, window, str, TextEvent.DOM_INPUT_METHOD_KEYBOARD);
    return document.activeElement.dispatchEvent(e);
  };

}).call(this);
