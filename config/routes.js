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
    action: 'sign_up'
  },

  'GET /api/user/profile': {
    controller: 'UserController',
    action: 'profile'
  },
  "PUT /api/user/profile": {
    controller: 'UserController',
    action: 'edit_profile'
  },

  'GET /api/users': {
    controller: 'UserController',
    action: 'list'
  },
  'PUT /api/user': {
    controller: 'UserController',
    action: 'edit_user'
  },
  'DELETE /api/user': {
    controller: 'UserController',
    action: 'delete_user'
  },


  'GET /api/user/productions': {
    controller: 'ProductController',
    action: 'list_product'
  },
  'POST /api/user/product': {
    controller: 'ProductController',
    action: 'create_product'
  },
  'PUT /api/user/product': {
    controller: 'ProductController',
    action: 'edit_product'
  },
  'DELETE /api/user/product': {
    controller: 'ProductController',
    action: 'delete_product'
  },



  'GET /api/user/categories': {
    controller: 'CategoryController',
    action: 'list_category'
  },
  'POST /api/user/category': {
    controller: 'CategoryController',
    action: 'create_category'
  },
  'PUT /api/user/category': {
    controller: 'CategoryController',
    action: 'edit_category'
  },
  'DELETE /api/user/category': {
    controller: 'CategoryController',
    action: 'delete_category'
  },

  'GET /api/user/coupons': {
    controller: 'CouponController',
    action: 'list_coupon'
  },
  'POST /api/user/coupon': {
    controller: 'CouponController',
    action: 'create_coupon'
  },
  'PUT /api/user/coupon': {
    controller: 'CouponController',
    action: 'edit_coupon'
  },
  'DELETE /api/user/coupon': {
    controller: 'CouponController',
    action: 'delete_coupon'
  },

  'GET /api/user/providers': {
    controller: 'ProviderController',
    action: 'list_provider'
  },
  'POST /api/user/provider': {
    controller: 'ProviderController',
    action: 'create_provider'
  },
  'PUT /api/user/provider': {
    controller: 'ProviderController',
    action: 'edit_provider'
  },
  'DELETE /api/user/providers': {
    controller: 'ProviderController',
    action: 'delete_provider'
  },

  'GET /api/user/orders': {
    controller: 'OrderController',
    action: 'list_order'
  },
  
  'GET /api/admin/order/process': {
    controller: 'OrderController',
    action: 'process_order'
  },
  'POST /api/user/order': {
    controller: 'OrderController',
    action: 'create_order'
  },
  'PUT /api/admin/order': {
    controller: 'OrderController',
    action: 'edit_order'
  },
  'DELETE /api/user/order': {
    controller: 'OrderController',
    action: 'delete_order'
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
