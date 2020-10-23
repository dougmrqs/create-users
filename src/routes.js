const container = require('./container')
const routes = require('express').Router();
const UsersController = require('./interface/controllers/UsersController');

routes.post('/users', UsersController.store(container));
routes.patch('/users/:id', UsersController.update(container));

module.exports = routes;