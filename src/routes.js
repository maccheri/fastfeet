import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.send('App inicializado com sucesso.'));

export default routes;
