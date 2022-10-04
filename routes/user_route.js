import express from 'express';
import * as user_controller from '../controllers/user_controller.js';

const router = express.Router();

router.route('/register').post(user_controller.createUser);
router.route('/login').post(user_controller.loginUser);

export default router;