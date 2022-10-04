import express from 'express';
import * as page_controller from '../controllers/page_controller.js';

const router = express.Router();

//routes
router.route('/').get(page_controller.getIndexPage);
router.route('/about').get(page_controller.getAboutPage);
router.route('/register').get(page_controller.getRegisterPage);
router.route('/login').get(page_controller.getLoginPage);
router.route('/logout').get(page_controller.getLogout);

export default router;