module.exports = function(request, response, next) {

  if (!request.headers['user-id']) {
    response.status(401)
      .send('Unauthorized')
    return;
  }

  next()
}
