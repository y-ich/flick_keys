$(document).ready ->
  flickKeys.initialize()

  asyncTest 'main', ->
    $('#text').val('')
    $('#text').focus()
    $('#text').unbind 'keypress'
    $('#text').keypress ->
      start()
      equal $('#text').val(), '(', 'main key'
    alert('Type "("!')

  asyncTest 'sub', ->
    $('#text').val('')
    $('#text').focus()
    $('#text').unbind 'keypress'
    $('#text').keypress ->
      start()
      equal $('#text').val(), ')', 'sub key'
    alert('Type ")"!')
