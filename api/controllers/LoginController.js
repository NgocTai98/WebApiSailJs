/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var jwt = require('jsonwebtoken');

module.exports = {
  signUp: async function (req, res) {
    let user = {
      email: req.param('email'),
      password: req.param('password'),
      age: req.param('age'),
      sex: req.param('sex'),
      level: req.param('level'),
      address: req.param('address'),
      phone: req.param('phone'),
      fullname: req.param('fullname'),
    }
    try {
      let users = await userService.create(user);

      return res.json({
        status: 'success',
        message: 'Đăng ký thành công',
        data: {
          user: users[0],
          info: users[1],
          token: users[2]
        }
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }

  },
  login: async function (req, res) {
    let email = req.param('email');
    let password = req.param('password');
    try {
      let user = await userService.login(email, password);

      return res.status(200).json({
        message: 'Đăng nhập thành công',
        data: {
          user: user[0],
          token: user[1]
        }
      })

    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })

    }

  }

};
