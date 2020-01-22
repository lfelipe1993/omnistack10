const { Router } = require('express'); //dessa forma importa algo especifico
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search',SearchController.index)

module.exports = routes; // exportando o objeto de routes