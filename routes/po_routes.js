import { Router } from 'express';


import PO_Receipts_Controller from '../controllers/po_receipts_controller.js';

import PO_Cmls_Controller from '../controllers/po_cmls_controller.js';

import PO_Receipt_Rerurns_Controller from '../controllers/po_receipt_returns_controller.js';

import LogsController from '../controllers/po_logs_controller.js';
import Common_Controller from '../controllers/common_controller.js';


const po_router = Router();

po_router.get('/getPODetails4ReceiptXport/:pono',PO_Receipts_Controller.getPODetails4ReceiptXport);

po_router.post('/postreceipts',PO_Receipts_Controller.postReceipts);

po_router.get('/getPODetails4ResetReceiptXport/:pono',PO_Receipts_Controller.getPODetails4ResetReceiptXport);

po_router.post('/resetReceipts',PO_Receipts_Controller.resetReceipts);





po_router.get('/getPODetails4CMLsXport/:pono',PO_Cmls_Controller.getPODetails4CMLsXport);

po_router.post('/postcmls',PO_Cmls_Controller.postCMLs);

po_router.get('/getPODetails4ResetCMLsXport/:pono',PO_Cmls_Controller.getPODetails4ResetCMLsXport);

po_router.post('/resetCmls',PO_Cmls_Controller.resetCMLs);



po_router.get('/getPODetails4ReceiptReturnsXport/:pono',PO_Receipt_Rerurns_Controller.getPODetails4ReceiptReturnsXport);

po_router.post('/postreceiptReturns',PO_Receipt_Rerurns_Controller.postReceiptReturns);

po_router.get('/getPODetails4ResetReceiptReturnsXport/:pono',PO_Receipt_Rerurns_Controller.getPODetails4ResetReceiptReturnsXport);

po_router.post('/resetReceiptReturns',PO_Receipt_Rerurns_Controller.resetReceiptReturns);



po_router.get('/getPostingLogs',LogsController.getPostingLogs);
po_router.get('/getPostingResetLogs',LogsController.GetResetLogs);


po_router.get('/getPostingDataTotalRecs/:pono',Common_Controller.GetPostingDataTotalRecs);


export default po_router;