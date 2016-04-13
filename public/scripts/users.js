$(function() {
  $('#btn-create').click(function() {
    var user = {
      name: $('#user-name').val(),
      email: $('#user-email').val()
    }

    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/user',
      data: user,
      success: function(response) {
        location.reload(true)
      }
    })
  })
})
