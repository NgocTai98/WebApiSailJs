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
      throw 'FAIL_TOKEN_DEFINED';
    }
  } else {
    throw 'NOT_FOUND_TOKEN'
  }
  let decode = jwToken.verify(token, function (err, token) {
    if (err) {
      throw 'INCORRECT_TOKEN';
    }    
    return token;   
    
  });
  return decode;
  
}