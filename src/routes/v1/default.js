/**
 * @description Endpoint por defecto /v1
 */

import { Router } from 'express';

const router = Router();

router.get('/', (_request, response) => {
  response.status(200).json({ message: 'API Medify V1' });
});

router.get('/health', (_request, response) => {
  response.status(200).json({
    message: 'OK',
    uptime: process.uptime(),
    timestamp: Date.now().toString(),
  });
});

export default router;