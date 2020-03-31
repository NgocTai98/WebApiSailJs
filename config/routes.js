/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'POST /api/login': {
    controller: 'LoginController',
    action: 'login'
  },  
  'POST /api/sign-up': {
    controller: 'LoginController',
    action: 'signUp'
  },

  'GET /api/user/profile': {
    controller: 'UserController',
    action: 'profile'
  },
  "PUT /api/user/profile": {
    controller: 'UserController',
    action: 'editProfile'
  },

  'GET /api/users': {
    controller: 'UserController',
    action: 'list'
  },
  'PUT /api/user': {
    controller: 'UserController',
    action: 'editUser'
  },
  'DELETE /api/user': {
    controller: 'UserController',
    action: 'deleteUser'
  },


  'GET /api/user/productions': {
    controller: 'ProductController',
    action: 'listProduct'
  },
  'POST /api/user/product': {
    controller: 'ProductController',
    action: 'createProduct'
  },
  'PUT /api/user/product': {
    controller: 'ProductController',
    action: 'editProduct'
  },
  'DELETE /api/user/product': {
    controller: 'ProductController',
    action: 'deleteProduct'
  },



  'GET /api/user/categories': {
    controller: 'CategoryController',
    action: 'listCategory'
  },
  'POST /api/user/category': {
    controller: 'CategoryController',
    action: 'createCategory'
  },
  'PUT /api/user/category': {
    controller: 'CategoryController',
    action: 'editCategory'
  },
  'DELETE /api/user/category': {
    controller: 'CategoryController',
    action: 'deleteCategory'
  },

  'GET /api/user/coupons': {
    controller: 'CouponController',
    action: 'listCoupon'
  },
  'POST /api/user/coupon': {
    controller: 'CouponController',
    action: 'createCoupon'
  },
  'PUT /api/user/coupon': {
    controller: 'CouponController',
    action: 'editCoupon'
  },
  'DELETE /api/user/coupon': {
    controller: 'CouponController',
    action: 'deleteCoupon'
  },

  'GET /api/user/providers': {
    controller: 'ProviderController',
    action: 'listProvider'
  },
  'POST /api/user/provider': {
    controller: 'ProviderController',
    action: 'createProvider'
  },
  'PUT /api/user/provider': {
    controller: 'ProviderController',
    action: 'editProvider'
  },
  'DELETE /api/user/provider': {
    controller: 'ProviderController',
    action: 'deleteProvider'
  },

  'GET /api/user/orders': {
    controller: 'OrderController',
    action: 'listOrder'
  },
  
  'GET /api/admin/order/process': {
    controller: 'OrderController',
    action: 'processOrder'
  },
  'POST /api/user/order': {
    controller: 'OrderController',
    action: 'createOrder'
  },
  'PUT /api/admin/order': {
    controller: 'OrderController',
    action: 'editOrder'
  },
  'DELETE /api/user/order': {
    controller: 'OrderController',
    action: 'deleteOrder'
  },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
