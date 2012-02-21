(function() {

  $(document).ready(function() {
    flickKeys.initialize();
    asyncTest('main', function() {
      $('#text').val('');
      $('#text').focus();
      $('#text').unbind('keypress');
      $('#text').keypress(function() {
        start();
        return equal($('#text').val(), '(', 'main key');
      });
      return alert('Type "("!');
    });
    return asyncTest('sub', function() {
      $('#text').val('');
      $('#text').focus();
      $('#text').unbind('keypress');
      $('#text').keypress(function() {
        start();
        return equal($('#text').val(), ')', 'sub key');
      });
      return alert('Type ")"!');
    });
  });

}).call(this);
