import express from 'express';
import { generatePDF } from '../controllers/pdfController';
import authenticateToken from '../middlewares/authenticateToken'; 
const router = express.Router();

router.post('/generate', authenticateToken,generatePDF);

module.exports = router;
