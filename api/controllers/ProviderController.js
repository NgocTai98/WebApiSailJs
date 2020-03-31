/**
 * CategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    listProvider: async function (req, res) {
        var limit = req.param('limit');
        var offset = req.param('offset');
        var query = req.param('query');
    
      try {
          let providers = await providerService.list(limit,offset,query);
        
          return res.status(200).json({
              message: 'Danh sách nhà cung cấp',
              data: {
                  totalCount: providers[0],
                  provider: providers[1]
              }
          })
      } catch (error) {
        let err = await errorService.error(error);
        return res.status(401).json({
          message: err
        })
      }
    },
    createProvider: async function (req, res) {
      let provider = {
       name: req.param('name'),
       code: req.param('code'),
       address: req.param('address'),
       phone: req.param('phone'),
       info: req.param('info'),
       userId: req.token.id,
      }
      try {
          let providers = await providerService.create(provider);
         
          return res.status(200).json({
              message: 'Thêm mới thành công nhà cung cấp',
              data: providers
          })
      } catch (error) {
        let err = await errorService.error(error);
        return res.status(401).json({
          message: err
        })
      }
    },
    editProvider: async function (req, res) {
       let provider = {
         id: req.param('id'),
         name: req.param('name'),
         code: req.param('code'),
         address: req.param('address'),
         phone: req.param('phone'),
         info: req.param('info'),
         userId: req.token.id,
       }
      try {
          let providers = await providerService.update(provider);
         
          return res.status(200).json({
              message: 'Sửa thành công nhà cung cấp',
              data: providers
          })
      } catch (error) {
        let err = await errorService.error(error);
        return res.status(401).json({
          message: err
        })
      }
    },
    deleteProvider: async function (req, res) {
        let id = req.param('id');
      try {
          let providers = await providerService.delete(id);
        
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
  