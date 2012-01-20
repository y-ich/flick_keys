$(document).ready ->
  initKeys()

  asyncTest 'main', ->
    $('#text').val('')
    $('#text').focus()
    $('#text').unbind 'keypress'
    $('#text').keypress ->
      start()
      equals $('#text').val(), '(', 'main key'
    alert('Type "("!')

  asyncTest 'sub', ->
    $('#text').val('')
    $('#text').focus()
    $('#text').unbind 'keypress'
    $('#text').keypress ->
      start()
      equals $('#text').val(), ')', 'sub key'
    alert('Type ")"!')
