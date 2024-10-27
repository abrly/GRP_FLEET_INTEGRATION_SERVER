import { Router } from 'express';

import LoginController from '../controllers/login_controller.js';

const login_router = Router();

login_router.post('/login',LoginController.LogMein);

export default login_router;