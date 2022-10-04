import express from 'express';
import * as user_controller from '../controllers/user_controller.js';
import * as auth_middleware from '../middlewares/auth_middleware.js';

const router = express.Router();

router.route('/register').post(user_controller.createUser);
router.route('/login').post(user_controller.loginUser);
router.route('/dashboard').get(auth_middleware.authToken, user_controller.getDashboardPage);

export default router;  