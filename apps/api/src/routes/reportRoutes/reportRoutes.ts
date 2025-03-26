import express from 'express';
import detailRoutes from './detailRoutes';

const router = express.Router();

// Use the detailRoutes router
router.use('/details', detailRoutes);

export default router;