import express from 'express';
import {createCriminal , getCriminals , deleteCriminals , updateCriminals} from '../controllers/criminal.controller.js';

const router = express.Router();

router.post('/create', createCriminal);
router.get('/get', getCriminals);
router.delete('/delete/:id', deleteCriminals);
router.put('/update/:id', updateCriminals);

export default router;