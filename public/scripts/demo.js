$(function() {
  $.ajax({
    url: "http://localhost:8080/document/list",
    type: "GET",
    success: function(result) {
      for (var i in result) {
        $('.document-list').append('<li><div>'+result[i].title+'</div><div>'+result[i]._id+'</div><li>')
      }
    }
  })
});
