$(function() {
  $.ajax({
    url: "http://localhost:8080/document/update",
    type: "POST",
    data: {
      _id: $('').val(),
      document: $('#document').val()
    },
    success: function(result) {
      $('.output').text(result)
    }
  })
});
