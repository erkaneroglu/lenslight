import express from 'express';
import * as photo_controller from '../controllers/photo_controller.js';

const router = express.Router();

//routes
router.route('/').post(photo_controller.createPhoto);

export default router;