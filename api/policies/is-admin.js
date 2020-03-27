module.exports = async function (req, res, next) {

  let token = await AuthService(req);
  jwToken.verify(token, function (err, token) {
    if (err) return res.json(401, {
      err: 'Token không hợp lệ!'
    });
    if (token.role == 2) {
      req.token = token;
      next();
    }
    else{
      return res.json(403, {err: 'Bạn không phải quyền supper admin'})
    }
  });
  
  
};
