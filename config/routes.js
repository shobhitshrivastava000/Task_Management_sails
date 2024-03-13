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

  //UserController
  'POST /user/register':'UserController.register',
  'POST /user/login':'UserController.login',

  //TaskController
  'POST /add': 'TaskController.addTask',
  'GET /gettasks/:userid': 'TaskController.getAllTask',
  'PUT /gettoggle/:id': 'TaskController.toggleTaskDone',
  'PUT /update/:id': 'TaskController.updateTask',
  'DELETE /delete/:id': 'TaskController.deleteTask',

};
