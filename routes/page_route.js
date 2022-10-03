import express from 'express';
import * as page_controller from '../controllers/page_controller.js';

const router = express.Router();

//routes
router.route('/').get(page_controller.getIndexPage);
router.route('/about').get(page_controller.getAboutPage);

export default router;