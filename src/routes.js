const routes = require('express').Router();
const UsersController = require('./app/controllers/UsersController');

routes.post('/users', UsersController.store);


module.exports = routes;