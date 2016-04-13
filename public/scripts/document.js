$(function() {

  $('#update-button').click(function() {

    var user = $('#user-id').val()

    $.ajax({
      url: "http://localhost:8080/document/update/" + user,
      type: "POST",
      data: {
        _id: $('#document-id').val(),
        document: $('#document').val(),
        message: $('#message').val()
      },
      success: function(result) {
        $('.output').text(result)
        $('#message').val('')
      }
    })
  })

  $('#add-user-button').click(function() {

    $.ajax({
      url: "http://localhost:8080/user/createdocument",
      type: "POST",
      data: {
        documentId: $('#document-id').val(),
        userId: $('#add-user-id').val()
      },
      success: function(result) {
        $('#add-user-id').val('')
      }
    })
  })
})
