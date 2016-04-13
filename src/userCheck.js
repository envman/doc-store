module.exports = function(request, response, next) {

  next()
  return

  if (!request.headers['user-id']) {
    response.status(401)
      .send('Unauthorized')
    return
  }

  next()
}
