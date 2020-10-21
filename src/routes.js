const container = require('./container')
const routes = require('express').Router();
const UsersController = require('./interface/controllers/UsersController');

routes.post('/users', UsersController.store(container));


module.exports = routes;