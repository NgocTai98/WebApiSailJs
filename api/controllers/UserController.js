/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {

  profile: async function (req, res) {
    let id = req.token.id;
    try {
      let profile = await userService.get_profile(id);
      if (profile == undefined) {
        throw 'FAIL_VIEW_PROFILE';
      }
      return res.status(200).json({
        message: 'Thông tin profile',
        data: profile
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },

  edit_profile: async function (req, res) {
    let id = req.param('id');
    let email = req.param('email');
    let password = req.param('password');
    let age = req.param('age');
    let sex = req.param('sex');
    let level = req.param('level');
    let address = req.param('address');
    let phone = req.param('phone');
    let fullname = req.param('fullname');
    try {
      let profile = await userService.update_profile(id,email,password,age,sex,level,address,phone,fullname);
      if (profile == undefined) {
        throw 'FAIL_EDIT_PROFILE';
      }
      return res.status(200).json({
        message: 'Đã sửa thành công thông tin profile',
        data: {
          user: profile[0],
          info: profile[1]
        }
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },

  list: async function (req, res) {
    var limit = req.param('limit');
    var query = req.param('query');
    try {
      let users = await userService.list(limit, query);
      if (users == undefined) {
        throw 'FAIL_LIST_USERS';
      }
      return res.status(200).json({
        message: 'Danh sách các users',
        data: {
          totalCount: users[1],
          user: users[0],
        }
      })

    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },

  edit_user: async function (req, res) {
    let id = req.param('id');
    let level = req.param('level');
    try {
      let user = await userService.update_user(id,level);
      if (user == undefined) {
        throw 'FAIL_EDIT_USER'
      }
      return res.status(200).json({
        message: 'Sửa thông tin của user thành công',
        data: user
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },

  delete_user: async function (req, res) {
    let id = req.param('id');
    try {
      let user = await userService.del_user(id);
      if (user == undefined) {
        throw 'FAIL_DELETE_USER';
      }
      return res.status(200).json({
        message: 'Đã xóa thành công'
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  }
};
