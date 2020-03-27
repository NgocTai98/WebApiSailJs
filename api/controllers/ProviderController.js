/**
 * CategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    list_provider: async function (req, res) {
        var limit = req.param('limit');
        var query = req.param('query');
    
      try {
          let provider = await providerService.list(limit,query);
          if (provider == undefined) {
              throw 'FAIL_VIEW_PROVIDER'
          }
          return res.status(200).json({
              message: 'Danh sách nhà cung cấp',
              data: {
                  totalCount: provider[0],
                  provider: provider[1]
              }
          })
      } catch (error) {
        let err = await errorService.error(error);
        return res.status(401).json({
          message: err
        })
      }
    },
    create_provider: async function (req, res) {
        let name = req.param('name');
        let code = req.param('code');
        let address = req.param('address');
        let phone = req.param('phone');
        let info = req.param('info');
        let userId = req.token.id;
      try {
          let provider = await providerService.create(name,code,address,phone,info,userId);
          if (provider == undefined) {
              throw 'FAIL_CREATE_PROVIDER';
          }
          return res.status(200).json({
              message: 'Thêm mới thành công nhà cung cấp',
              data: provider
          })
      } catch (error) {
        let err = await errorService.error(error);
        return res.status(401).json({
          message: err
        })
      }
    },
    edit_provider: async function (req, res) {
        let id = req.param('id');
        let name = req.param('name');
        let code = req.param('code');
        let address = req.param('address');
        let phone = req.param('phone');
        let info = req.param('info');
        let userId = req.token.id;
      try {
          let provider = await providerService.update(id,name,code,address,phone,info,userId);
          if (provider == undefined) {
              throw 'FAIL_EDIT_PROVIDER'
          }
          return res.status(200).json({
              message: 'Sửa thành công nhà cung cấp',
              data: provider
          })
      } catch (error) {
        let err = await errorService.error(error);
        return res.status(401).json({
          message: err
        })
      }
    },
    delete_provider: async function (req, res) {
        let id = req.param('id');
      try {
          let provider = await providerService.delete(id);
          if (provider == undefined) {
              throw 'FAIL_DELETE_PROVIDER'
          }
          return res.status(200).json({
              message: 'Đã xóa nhà cung cấp',           
          })
      } catch (error) {
        let err = await errorService.error(error);
        return res.status(401).json({
          message: err
        })
      }
    },
  
  };
  