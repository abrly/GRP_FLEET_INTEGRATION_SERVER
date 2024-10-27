import { Router } from 'express';
import  utilOps  from '../util.js';


const router = Router();

import po_router from './po_routes.js';
import login_router from './login_routes.js';

router.use('/api/auth', login_router);
router.use('/api/po',utilOps.verifyToken, po_router);
 

export default router;