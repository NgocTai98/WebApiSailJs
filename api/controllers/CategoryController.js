/**
 * CategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  listCategory: async function (req, res) {
    var limit = req.param('limit');
    var offset = req.param('offset');
    var query = req.param('query');

    try {
      let cate = await categoryService.list(limit,offset,query);

      return res.status(200).json({
        message: 'Danh sách danh mục sản phẩm',
        data: {
          totalCount: cate[0],
          category: cate[1]
        }
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },
  createCategory: async function (req, res) {
    let name = req.param('name');
    let parent = req.param('parent');
    let userId = req.token.id;
    try {
      let cate = await categoryService.create(name, parent, userId);
      return res.status(200).json({
        message: 'Thêm mới thành công danh mục sản phẩm',
        data: cate
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },
  editCategory: async function (req, res) {
    let name = req.param('name');
    let parent = req.param('parent');
    let userId = req.token.id;
    let id = req.param('id');
    try {
      let cate = await categoryService.update(id, name, parent, userId);

      return res.status(200).json({
        message: 'Sửa thành công danh mục sản phẩm',
        data: cate
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },
  deleteCategory: async function (req, res) {
    let id = req.param('id');
    try {
      let cate = await categoryService.delete(id);
      return res.status(200).json({
        message: 'Đã xóa danh mục sản phẩm',
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },

};
