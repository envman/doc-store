$(function() {
  $('.btn-add').click(function() {
    var request = {
      title: $('#title').val(),
      document: $('#document').val()
    }

    $.ajax({
      url: "http://localhost:8080/document/add",
      type: "POST",
      data: request,
      success: function(result) {
        $('#title').val('')
        $('#document').val('')
      }
    })
  })
})
