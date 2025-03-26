import express from 'express';
import detailRoutes from './detailRoutes';
import cookieParser from 'cookie-parser';

const router = express.Router();

// Use the detailRoutes router
router.use(cookieParser()); // Middleware to parse cookies
router.use('/details', detailRoutes);

export default router;