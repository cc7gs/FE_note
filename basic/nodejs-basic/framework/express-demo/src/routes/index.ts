import { Router} from "express";
import AuthController from '../controllers/AuthController'
import user from './user'

const routes = Router();

routes.post('/signup',AuthController.signup)
routes.post('/signin',AuthController.signin)

routes.use('/api',AuthController.protect)
routes.use('/api/user',user)

export default routes