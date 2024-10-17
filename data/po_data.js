import  poolGrpIntDB  from './db/grpIntegrationSqlDbConn.js';
import sql from 'mssql';
import LPO from '../models/lpo.js';
import appResponse from '../models/appResponse.js';

async function GetPODetailsFromFleet(PONo,SortColumn,SortDirection,PageNumber,PageSize) {  
  try {
    let  pool = await poolGrpIntDB;
    let  resp = await  pool.request()
    .input('PONo', sql.NVarChar(50), PONo) // Input for @PONo
    .input('SortColumn', sql.NVarChar(50), SortColumn) // Input for @SortColumn
    .input('SortDirection', sql.NVarChar(4), SortDirection) // Input for @SortDirection
    .input('PageNumber', sql.Int, PageNumber) // Input for @PageNumber
    .input('PageSize', sql.Int, PageSize) // Input for @PageSize
    .execute('spGetPODetailsFromFleet');    
  

    let items = resp.recordsets;

    let mappedItems =  items[0].map(row => new LPO(row.status, row.LPONo, row.SupplierNumber, row.SupplierName,row.return_flag, row.LineNo, row.PartNo, row.PartSuffix,row.QtyReceived, row.UnitPriceReceived, row.UnitPriceReceived, row.VAT, row.PO_Row_id, row.Location, row.DateReceived,row.DateReceived,row.SITE,row.Invoiced,row.TotalCost,row.TotalCostIncVAT,row.TotalInvoiceValue,row.TotalVATValue,row.TotalInvoiceValueWithVAT,row.row_id));

       
    const mappedResponse = {
      data: mappedItems,
      totalItems: items[0][0].TotalCount,
      totalInvoiceValue:items[0][0].TotalInvoiceValue,
      totalVATValue:items[0][0].TotalVATValue,
      totalInvoiceValueWithVAT:items[0][0].TotalInvoiceValueWithVAT
    };

    console.log('what is mapped resp');

    console.log(mappedResponse);


    return mappedResponse;


  }
  catch (err) {
    console.log(err);
  }
}


async function AddLogs_LPO_Posting_ToGRP(pONo,postingDate,invoiceNo,totalInvoiceValue,totalVATValue,totalInvoiceValueWithVAT,remarks,createdBy,rowIds) {
  try {

    let  pool = await poolGrpIntDB;
    let  resp = await  pool.request()
    .input('PONo', sql.NVarChar(50), pONo) 
    .input('PostingDate', sql.DateTime, postingDate) 
    .input('InvoiceNo', sql.NVarChar(50),invoiceNo) 
    .input('TotalInvoiceValue', sql.Decimal, totalInvoiceValue) 
    .input('TotalVATValue', sql.Decimal, totalVATValue) 
    .input('TotalInvoiceValueWithVAT', sql.Decimal, totalInvoiceValueWithVAT) 
    .input('Remarks', sql.NVarChar(100), remarks) 
    .input('CreatedBy', sql.NVarChar(100), createdBy) 
    .input('RowIDs', sql.NVarChar(100),rowIds) 
    .execute('spAddLogs_LPO_Posting_ToGRP');    
  
    let addLogResp = resp.recordsets[0][0];

    let mappedResponse =  new appResponse(addLogResp.responseCode,addLogResp.responseDesc);

    return mappedResponse;


  }
  catch (err) {
    console.log(err);
  }
}

  const poOps = {  
    GetPODetailsFromFleet:GetPODetailsFromFleet,
    AddLogs_LPO_Posting_ToGRP:AddLogs_LPO_Posting_ToGRP
  }

  export default poOps;