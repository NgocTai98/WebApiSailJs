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

  editProfile: async function (req, res) {
   let profile = {
   id: req.token.id,
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
      let profiles = await userService.update_profile(profile);
     
      return res.status(200).json({
        message: 'Đã sửa thành công thông tin profile',
        data: {
          user: profiles[0],
          info: profiles[1]
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
    var offset = req.param('offset');
    var query = req.param('query');
    try {
      let users = await userService.list(limit,offset,query);
    
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

  editUser: async function (req, res) {
    let id = req.param('id');
    let level = req.param('level');
    try {
      let user = await userService.update_user(id,level);
     
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

  deleteUser: async function (req, res) {
    let id = req.param('id');
    try {
      let user = await userService.del_user(id);
      
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
