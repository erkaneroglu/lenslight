import express from 'express';
import * as photo_controller from '../controllers/photo_controller.js';

const router = express.Router();

router.route('/').get(photo_controller.getAllPhotos);
router.route('/').post(photo_controller.createPhoto);
router.route('/:id').get(photo_controller.getAPhoto);

export default router;