$(function() {

  $('#update-button').click(function() {
    $.ajax({
      url: "http://localhost:8080/document/update",
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
});
