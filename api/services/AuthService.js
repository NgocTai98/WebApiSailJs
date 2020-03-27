module.exports = async function(req, res){
    var token;

  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.json(401, {
        err: 'Định dạng phải ở dạng : Bearer [token]'
      });
    }
  } else {
    return res.json(401, {
      err: 'Không tìm thấy Authorization'
    });
  }
  return token;
}