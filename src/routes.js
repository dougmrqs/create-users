const routes = require('express').Router();
const UsersController = require('./interface/controllers/UsersController');

routes.post('/users', UsersController.store);


module.exports = routes;