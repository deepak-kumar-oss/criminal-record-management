import express from 'express';
import { jailerLogin, jailerSignUp } from '../controllers/jailer.model.js';

const router = express.Router();

router.post('/signup', jailerSignUp);
router.post('/login', jailerLogin);

export default router;