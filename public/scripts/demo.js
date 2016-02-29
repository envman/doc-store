$(function() {
  $.ajax({
    url: "http://localhost:8080/document/list",
    type: "GET",
    success: function(result) {
      for (var i in result) {
        $('.document-list').append('<li><a href="http://localhost:8080/document/' + result[i]._id + '"">' + result[i].title + ' - ' + result[i]._id + '</a><li>')
      }
    }
  })
});
