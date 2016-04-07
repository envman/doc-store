$(function() {
  $('#btn-create').click(function() {
    var user = {
      name: $('#user-name').val()
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

  $('#select-user').each(function() {
    $(this).click(function() {
      selectedUser = {
        _id: $('#user-id').text(),
        name: $('#user-name').text()
      }
    })
  })
})
