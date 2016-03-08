$(function() {
  $.ajax({
    url: "http://localhost:8080/document/list",
    type: "GET",
    success: function(result) {
      for (var i in result) {
        $('.document-list').append('<li class="list-group-item document-item"><span class="glyphicon glyphicon-book"></span><a class="document-link" href="http://localhost:8080/demo/edit/' + result[i]._id + '"">' + result[i].title + ' - ' + result[i]._id + '</a></li>')
      }
    }
  })
});
