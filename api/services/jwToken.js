const jwt = require('jsonwebtoken'),
  tokenSecret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2VjcmVhdCJ9.53yjVT5va67YMOGZVxv_DLm4oGfC9Nx5yMjOqzr3iMQ";
module.exports = {
  // Generates a token from supplied payload
  issue(payload) {
    return jwt.sign(
      payload,
      tokenSecret, 
      {
        algorithm: 'HS256',
        expiresIn: '7d' 
      });
  },
  // Verifies token on a request
  verify(token, callback) {
    return jwt.verify(
      token, 
      tokenSecret,
      {}, 
      callback
    );
  },
  decode(token){
    return jwt.decode(token);
  }
};
