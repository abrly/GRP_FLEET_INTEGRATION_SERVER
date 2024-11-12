import  poolGrpIntDB  from './db/grpIntegrationSqlDbConn.js';
import sql from 'mssql';
import LPO from '../models/lpo.js';
import appResponse from '../models/appResponse.js';


//#region "Receipts Returns Posting"

async function GetPODetailsFromFleet4ReceiptReturnsXport(PONo,SortColumn,SortDirection,PageNumber,PageSize) {  
  try {
    let  pool = await poolGrpIntDB;
    let  resp = await  pool.request()
    .input('PONo', sql.NVarChar(50), PONo) // Input for @PONo
    .input('SortColumn', sql.NVarChar(50), SortColumn) // Input for @SortColumn
    .input('SortDirection', sql.NVarChar(4), SortDirection) // Input for @SortDirection
    .input('PageNumber', sql.Int, PageNumber) // Input for @PageNumber
    .input('PageSize', sql.Int, PageSize) // Input for @PageSize
    .execute('spGetPODetailsFromFleet4ReceiptReturnsXport');    
  

    let items = resp.recordsets;

  
    let mappedResponse;


    if (items[0].length>0){

      let mappedItems =  items[0].map(row => new LPO(row.status, row.LPONo, row.SupplierNumber, row.SupplierName,row.return_flag, row.LineNo, row.PartNo, row.PartSuffix,row.Part_description,row.Part_keyword,row.QtyReceived, row.UnitPriceReceived, row.UnitPriceReceived, row.VAT, row.PO_Row_id, row.Location, row.DateReceived,row.DateReceived,row.SITE,row.Invoiced,row.TotalCost,row.TotalCostIncVAT,row.TotalInvoiceValue,row.TotalVATValue,row.TotalInvoiceValueWithVAT,row.row_id));
      
        mappedResponse = {
        data: mappedItems,
        totalItems: items[0][0].TotalCount,
        totalInvoiceValue:items[0][0].TotalInvoiceValue,
        totalVATValue:items[0][0].TotalVATValue,
        totalInvoiceValueWithVAT:items[0][0].TotalInvoiceValueWithVAT
      };

    }else{

      mappedResponse = {
        data: [],
        totalItems: 0,
        totalInvoiceValue:0.00,
        totalVATValue:0.00,
        totalInvoiceValueWithVAT:0.00
      };

    }

    return mappedResponse;


  }
  catch (err) {
    console.log(err);
  }
}


async function MarkUpdates_AddLogs_Receipt_Returns_Posting_ToGRP(postingInfo) {
  try {

    let  pool = await poolGrpIntDB;
    let  resp = await  pool.request()
    .input('PONo', sql.NVarChar(50), postingInfo.PONo) 
    .input('PostingDate', sql.DateTime, postingInfo.PostingDate) 
    .input('InvoiceNo', sql.NVarChar(50),postingInfo.InvoiceNo) 
    .input('TotalInvoiceValue', sql.Decimal, postingInfo.TotalInvoiceValue) 
    .input('TotalVATValue', sql.Decimal, postingInfo.TotalVATValue) 
    .input('TotalInvoiceValueWithVAT', sql.Decimal, postingInfo.TotalInvoiceValueWithVAT) 
    .input('Remarks', sql.NVarChar(1000), postingInfo.Remarks) 
    .input('CreatedBy', sql.NVarChar(100), postingInfo.CreatedBy) 
    .input('RowIDs', sql.NVarChar(2000),postingInfo.RowIds) 
    .execute('spMarkUpdates_AddLogs_Receipt_Returns_Posting_ToGRP');    
  
    let addLogResp = resp.recordsets[0][0];

    
    let mappedResponse =  new appResponse(addLogResp.ResponseCode,addLogResp.ResponseDesc,addLogResp.ReferenceNo);


    return mappedResponse;


  }
  catch (err) {
    console.log(err);
  }
}



//#endregion "Receipts Returns Posting"


//#region "Receipts Returns Reset"

async function GetPODetailsFromFleet4ResetReceiptReturnsXport(PONo,SortColumn,SortDirection,PageNumber,PageSize) {  
  try {
    let  pool = await poolGrpIntDB;
    let  resp = await  pool.request()
    .input('PONo', sql.NVarChar(50), PONo) // Input for @PONo
    .input('SortColumn', sql.NVarChar(50), SortColumn) // Input for @SortColumn
    .input('SortDirection', sql.NVarChar(4), SortDirection) // Input for @SortDirection
    .input('PageNumber', sql.Int, PageNumber) // Input for @PageNumber
    .input('PageSize', sql.Int, PageSize) // Input for @PageSize
    .execute('spGetPODetailsFromFleet4ResetReceiptReturnsXport');    
  

    let items = resp.recordsets;

  
    let mappedResponse;


    if (items[0].length>0){

      let mappedItems =  items[0].map(row => new LPO(row.status, row.LPONo, row.SupplierNumber, row.SupplierName,row.return_flag, row.LineNo, row.PartNo, row.PartSuffix,row.Part_description,row.Part_keyword,row.QtyReceived, row.UnitPriceReceived, row.UnitPriceReceived, row.VAT, row.PO_Row_id, row.Location, row.DateReceived,row.DateReceived,row.SITE,row.Invoiced,row.TotalCost,row.TotalCostIncVAT,row.TotalInvoiceValue,row.TotalVATValue,row.TotalInvoiceValueWithVAT,row.row_id));
      
        mappedResponse = {
        data: mappedItems,
        totalItems: items[0][0].TotalCount,
        totalInvoiceValue:items[0][0].TotalInvoiceValue,
        totalVATValue:items[0][0].TotalVATValue,
        totalInvoiceValueWithVAT:items[0][0].TotalInvoiceValueWithVAT
      };

    }else{

      mappedResponse = {
        data: [],
        totalItems: 0,
        totalInvoiceValue:0.00,
        totalVATValue:0.00,
        totalInvoiceValueWithVAT:0.00
      };

    }

    return mappedResponse;


  }
  catch (err) {
    console.log(err);
  }
}



async function MarkUpdates_AddLogs_Receipt_Returns_Reset_Posting_ToGRP(postingInfo) {
  try {

    let  pool = await poolGrpIntDB;
    let  resp = await  pool.request()
    .input('PONo', sql.NVarChar(50), postingInfo.PONo) 
    .input('Remarks', sql.NVarChar(1000), postingInfo.Remarks) 
    .input('CreatedBy', sql.NVarChar(100), postingInfo.CreatedBy) 
    .input('RowIDs', sql.NVarChar(2000),postingInfo.RowIds) 
    .execute('spMarkUpdates_AddLogs_Receipt_Returns_Reset_Posting_ToGRP');    
  
    let addLogResp = resp.recordsets[0][0];

    
    let mappedResponse =  new appResponse(addLogResp.ResponseCode,addLogResp.ResponseDesc,addLogResp.ReferenceNo);


    return mappedResponse;


  }
  catch (err) {
    console.log(err);
  }
}



//#endregion


//#endregion

  const poOps_Receipt_Returns = {  
    GetPODetailsFromFleet4ReceiptReturnsXport:GetPODetailsFromFleet4ReceiptReturnsXport,
    MarkUpdates_AddLogs_Receipt_Returns_Posting_ToGRP:MarkUpdates_AddLogs_Receipt_Returns_Posting_ToGRP,
    GetPODetailsFromFleet4ResetReceiptReturnsXport:GetPODetailsFromFleet4ResetReceiptReturnsXport,
    MarkUpdates_AddLogs_Receipt_Returns_Reset_Posting_ToGRP:MarkUpdates_AddLogs_Receipt_Returns_Reset_Posting_ToGRP
  }

  export default poOps_Receipt_Returns;