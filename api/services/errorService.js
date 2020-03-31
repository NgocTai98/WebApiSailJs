
module.exports = {
  error: async function (err) {
    switch (err) {
      case 'FAIL_CREATE_QUERY_PRODUCT':
        return {
          code: 100,
            message: 'Không thể thêm mới sản phẩm'
        };
      case 'FAIL_LIST_QUERY_PRODUCT':
        return {
          code: 101,
            message: 'Không thể hiển thị danh sách sản phẩm'
        };
      case 'FAIL_EDIT_QUERY_PRODUCT':
        return {
          code: 102,
            message: 'Không thể sửa sản phẩm'
        };
      case 'FAIL_DELETE_PRODUCT':
        return {
          code: 108,
            message: 'Không thể xóa sản phẩm'
        };
      case 'FAIL_VIEW_PROFILE':
        return {
          code: 103,
            message: 'Không thể hiển thị thông tin của profile'
        };
      case 'FAIL_EDIT_PROFILE':
        return {
          code: 104,
            message: 'Không thể sửa thông tin profile'
        };
      case 'FAIL_LIST_USER':
        return {
          code: 105,
            message: 'Không thể hiển thị danh sách các user'
        };
      case 'FAIL_EDIT_USER':
        return {
          code: 106,
            message: 'Không thể sửa quyền cho user'
        };
      case 'FAIL_DELETE_USER':
        return {
          code: 107,
            message: 'Không thể xóa sản phẩm'
        };
      case 'FAIL_VIEW_PROVIDER':
        return {
          code: 200,
            message: 'Không thể hiển thị danh sách nhà cung cấp'
        };
      case 'FAIL_CREATE_PROVIDER':
        return {
          code: 201,
            message: 'Thêm mới một nhà cung cấp không thành công'
        };
      case 'FAIL_EDIT_PROVIDER':
        return {
          code: 202,
            message: 'Sửa thông tin của nhà cung cấp không thành công'
        };
      case 'FAIL_DELETE_PROVIDER':
        return {
          code: 203,
            message: 'Không thể xóa nhà cung cấp này'
        };
      case 'FAIL_VIEW_ORDER':
        return {
          code: 300,
            message: 'Không thể hiển thị danh sách đơn hàng'
        };
      case 'FAIL_CREATE_ORDER':
        return {
          code: 301,
            message: 'Không thể thêm mới đơn hàng'
        };
      case 'FAIL_EDIT_ORDER':
        return {
          code: 302,
            message: 'Không thể sửa trạng thái của đơn hàng'
        };
      case 'FAIL_DELETE_ORDER':
        return {
          code: 303,
            message: 'Không thể xóa đơn hàng này'
        };
      case 'FAIL_VIEW_ORDER_PROCESS':
        return {
          code: 304,
            message: 'Không thể hiển thị danh sách đơn hàng đã xử lý'
        };

      case 'EMPTY_FIELD':
        return {
          code: 406,
            message: 'Các trường không được để trống'
        };
      case 'EMPTY_PASSWORD':
        return {
          code: 401,
            message: 'Email và password không được để trống'
        };
      case 'EMPTY_FIELD_ID':
        return {
          code: 402,
            message: 'Trường id không được để trống'
        };
      case 'FAIL_SIGNUP':
        return {
          code: 403,
            message: 'Đăng ký tài khoản mới không thành công'
        };
      case 'INCORRECT_LOGIN':
        return {
          code: 405,
            message: 'Email hoặc password không hợp lệ'
        };
      case 'FAIL_LIST_COUPON':
        return {
          code: 509,
            message: 'Không thể hiển thị danh sách mã coupon'
        };
      case 'FAIL_CREATE_COUPON':
        return {
          code: 501,
            message: 'Không thể thêm mới mã coupon'
        };
      case 'FAIL_EDIT_COUPON':
        return {
          code: 502,
            message: 'Không thể sửa mã coupon'
        };
      case 'FAIL_DELETE_COUPON':
        return {
          code: 503,
            message: 'Không thể xóa mã coupon này'
        };
      case 'FAIL_LIST_CATEGORY':
        return {
          code: 600,
            message: 'Không thể hiển thị danh sách category'
        };
      case 'FAIL_CREATE_CATEGORY':
        return {
          code: 601,
            message: 'Không thể thêm mới danh mục sản phẩm'
        };
      case 'FAIL_EDIT_CATEGORY':
        return {
          code: 602,
            message: 'Không thể sửa danh mục sản phẩm'
        };
      case 'FAIL_DELETE_CATEGORY':
        return {
          code: 603,
            message: 'Không thể xóa danh mục sản phẩm này'
        };

        case 'FAIL_TOKEN_DEFINED':
        return {
          code: 604,
            message: 'Định dạng token không đúng'
        };
        case 'NOT_FOND_TOKEN':
        return {
          code: 605,
            message: 'Không tìm thấy Authorization'
        };
        case 'INCORRECT_TOKEN':
        return {
          code: 606,
            message: 'Token không hợp lệ'
        };

        default: 
        return {
          code: 500,
          message: 'Error server'
        }
     
    }
  },

}
