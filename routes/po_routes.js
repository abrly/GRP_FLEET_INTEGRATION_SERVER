import { Router } from 'express';

import POController from '../controllers/po_controller.js';

const po_router = Router();

po_router.get('/getPODetails/:pono',POController.getPODetails);

po_router.post('/postlpo',POController.postLPO);

export default po_router;