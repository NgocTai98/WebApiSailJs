module.exports = async function (req, res, next) {
  try {
    let token = await AuthService(req);

    if (token.role == 2) {
      req.token = token;
      next();
    } else {
      return res.json(403, {
        err: 'Bạn không phải quyền supper admin'
      })
    }
  } catch (error) {
    let err = await errorService.error(error);
    return res.status(401).json({
      message: err
    })
  }


};
