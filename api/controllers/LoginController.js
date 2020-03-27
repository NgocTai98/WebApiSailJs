/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var jwt = require('jsonwebtoken');

module.exports = {
  sign_up: async function (req, res) {
    let email = req.param('email');
    let password = req.param('password');
    let age = req.param('age');
    let sex = req.param('sex');
    let level = req.param('level');
    let address = req.param('address');
    let phone = req.param('phone');
    let fullname = req.param('fullname');
    try {
      let user = await userService.create(email,password,age,sex,level,address,phone,fullname);
        if (user == undefined) {
            throw 'FAIL_SIGNUP'
        }
        return res.json({
          status: 'success',
          message: 'Đăng ký thành công',
          data: {
            user: user[0],
            info: user[1],
            token: user[2]
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
      let user = await userService.login(email,password);
      if (user == undefined) {
        throw 'INCORRECT_LOGIN'
      }
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
