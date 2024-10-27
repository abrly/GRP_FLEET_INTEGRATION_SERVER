import { Router } from 'express';

import POController from '../controllers/po_controller.js';

const po_router = Router();

po_router.get('/getPODetails4ReceiptXport/:pono',POController.getPODetails4ReceiptXport);

po_router.post('/postreceipts',POController.postReceipts);

po_router.get('/getPODetails4ResetReceiptXport/:pono',POController.getPODetails4ResetReceiptXport);

po_router.post('/resetReceipts',POController.resetReceipts);



po_router.get('/getPODetails4CMLsXport/:pono',POController.getPODetails4CMLsXport);

po_router.post('/postcmls',POController.postCMLs);

po_router.get('/getPODetails4ResetCMLsXport/:pono',POController.getPODetails4ResetCMLsXport);

po_router.post('/resetCmls',POController.resetCMLs);


po_router.get('/getPostingLogs',POController.getPostingLogs);


export default po_router;