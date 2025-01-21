import express from 'express';
import { renderHome, shortUrl, redirectToUrl } from './controller.js';

const router = express.Router();

router.get('/', renderHome); 
router.post('/cut', shortUrl); 
router.get('/:url', redirectToUrl); 

export default router;
