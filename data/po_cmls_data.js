import  poolGrpIntDB  from './db/grpIntegrationSqlDbConn.js';
import sql from 'mssql';
import appResponse from '../models/appResponse.js';
import CML from '../models/cml.js';


//#region "CMLs Postings"


async function GetPODetailsFromFleet4CMLsXport(PONo,SortColumn,SortDirection,PageNumber,PageSize) {  
  try {
    let  pool = await poolGrpIntDB;
    let  resp = await  pool.request()
    .input('PONo', sql.NVarChar(50), PONo) // Input for @PONo
    .input('SortColumn', sql.NVarChar(50), SortColumn) // Input for @SortColumn
    .input('SortDirection', sql.NVarChar(4), SortDirection) // Input for @SortDirection
    .input('PageNumber', sql.Int, PageNumber) // Input for @PageNumber
    .input('PageSize', sql.Int, PageSize) // Input for @PageSize
    .execute('spGetPODetailsFromFleet4CMLsXport');    
  

    let items = resp.recordsets;

  
    let mappedResponse;


    if (items[0].length>0){

      let mappedItems =  items[0].map(row => new CML(row.Status, row.JobCardNo, row.TaskID, row.Task_Description,row.SupplierNumber, row.SupplierName, row.LineNo, row.InvoiceNo,row.Site,row.Job_Rowid,row.Cml_row_id, row.LaborCost, row.PartsCost, row.Discount, row.TotalCost, row.VAT, row.TotalCostWithVAT,row.AccountType,row.Invoiced));
      
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



async function MarkUpdates_AddLogs_CMLs_ToGRP(postingInfo) {
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
    .execute('spMarkUpdates_AddLogs_CMLs_Posting_ToGRP');    
  
    let addLogResp = resp.recordsets[0][0];

    
    let mappedResponse =  new appResponse(addLogResp.ResponseCode,addLogResp.ResponseDesc,addLogResp.ReferenceNo);


    return mappedResponse;


  }
  catch (err) {
    console.log(err);
  }
}


//#endregion


//#region CML Reset


async function GetPODetailsFromFleet4ResetCMLsXport(PONo,SortColumn,SortDirection,PageNumber,PageSize) {  
  try {
    let  pool = await poolGrpIntDB;
    let  resp = await  pool.request()
    .input('PONo', sql.NVarChar(50), PONo) // Input for @PONo
    .input('SortColumn', sql.NVarChar(50), SortColumn) // Input for @SortColumn
    .input('SortDirection', sql.NVarChar(4), SortDirection) // Input for @SortDirection
    .input('PageNumber', sql.Int, PageNumber) // Input for @PageNumber
    .input('PageSize', sql.Int, PageSize) // Input for @PageSize
    .execute('spGetPODetailsFromFleet4ResetCMLsXport');    
  

    let items = resp.recordsets;

  
    let mappedResponse;


    if (items[0].length>0){

      let mappedItems =  items[0].map(row => new CML(row.Status, row.JobCardNo, row.TaskID, row.Task_Description,row.SupplierNumber, row.SupplierName, row.LineNo, row.InvoiceNo,row.Site,row.Job_Rowid,row.Cml_row_id, row.LaborCost, row.PartsCost, row.Discount, row.TotalCost, row.VAT, row.TotalCostWithVAT,row.AccountType,row.Invoiced));
      
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


async function MarkUpdates_AddLogs_CMLs_Reset_Posting_ToGRP(postingInfo) {
  try {

    let  pool = await poolGrpIntDB;
    let  resp = await  pool.request()
    .input('PONo', sql.NVarChar(50), postingInfo.PONo) 
    .input('Remarks', sql.NVarChar(1000), postingInfo.Remarks) 
    .input('CreatedBy', sql.NVarChar(100), postingInfo.CreatedBy) 
    .input('RowIDs', sql.NVarChar(2000),postingInfo.RowIds) 
    .execute('spMarkUpdates_AddLogs_CMLs_Reset_Posting_ToGRP');    
  
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

  const poOps_Cmls = {  

    GetPODetailsFromFleet4CMLsXport:GetPODetailsFromFleet4CMLsXport,
    MarkUpdates_AddLogs_CMLs_ToGRP:MarkUpdates_AddLogs_CMLs_ToGRP,
    GetPODetailsFromFleet4ResetCMLsXport:GetPODetailsFromFleet4ResetCMLsXport,
    MarkUpdates_AddLogs_CMLs_Reset_Posting_ToGRP:MarkUpdates_AddLogs_CMLs_Reset_Posting_ToGRP,

  }

  export default poOps_Cmls;