import { Router } from 'express'
import testController from '../../controllers/v1/test.controller.js';

const router = Router();

router.get('/admin', testController.testAuth);

router.post('/testemail', testController.emailTest);

export default router;  