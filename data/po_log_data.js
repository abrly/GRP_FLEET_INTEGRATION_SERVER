import  poolGrpIntDB  from './db/grpIntegrationSqlDbConn.js';
import sql from 'mssql';
import Log from '../models/log.js';

//#region PostingLogs

async function GetPostingLogs(Fromdate,Todate,SortColumn,SortDirection,PageNumber,PageSize,postingTypeId,lpoRef) {  
  try {
    let  pool = await poolGrpIntDB;
    let  resp = await  pool.request()
    .input('FromDate', sql.NVarChar(50), Fromdate) 
    .input('ToDate', sql.NVarChar(50),Todate) 
    .input('SortColumn', sql.NVarChar(50), SortColumn) // Input for @SortColumn
    .input('SortDirection', sql.NVarChar(4), SortDirection) // Input for @SortDirection
    .input('PageNumber', sql.Int, PageNumber) // Input for @PageNumber
    .input('PageSize', sql.Int, PageSize) // Input for @PageSize
    .input('PostingTypeId', sql.NVarChar(50), postingTypeId) // Input for @PageSize
    .input('LPORef', sql.NVarChar(50), lpoRef) // Input for @PageSize
    .execute('spGetGRPPostingLogs');    
  

    let items = resp.recordsets;

    console.log('what items');

    console.log(items);

  
    let mappedResponse;


    if (items[0].length>0){

      let mappedItems =  items[0].map(row => new Log(row.PostingMainTrxID,row.LogCategory, row.PostingTypeDescription, row.LPONo, row.RowId,row.CreatedBy, row.CreatedOn,row.Remarks,row.TotalCount));
      
        mappedResponse = {
        data: mappedItems,
        totalItems: items[0][0].TotalCount,           
      };

    }else{

      mappedResponse = {
        data: [],
        totalItems: 0,  
      };

    }

    return mappedResponse;


  }
  catch (err) {
    console.log(err);
  }
}



async function GetResetLogs(Fromdate,Todate,SortColumn,SortDirection,PageNumber,PageSize,postingTypeId,lpoRef) {  
  try {
    let  pool = await poolGrpIntDB;
    let  resp = await  pool.request()
    .input('FromDate', sql.NVarChar(50), Fromdate) 
    .input('ToDate', sql.NVarChar(50),Todate) 
    .input('SortColumn', sql.NVarChar(50), SortColumn) // Input for @SortColumn
    .input('SortDirection', sql.NVarChar(4), SortDirection) // Input for @SortDirection
    .input('PageNumber', sql.Int, PageNumber) // Input for @PageNumber
    .input('PageSize', sql.Int, PageSize) // Input for @PageSize
    .input('PostingTypeId', sql.NVarChar(50), postingTypeId) // Input for @PageSize
    .input('LPORef', sql.NVarChar(50), lpoRef) // Input for @PageSize
    .execute('spGetGRPPostingResetLogs');    
  

    let items = resp.recordsets;

    console.log('what items');

    console.log(items);

  
    let mappedResponse;


    if (items[0].length>0){

      let mappedItems =  items[0].map(row => new Log(row.PostingMainTrxID,row.LogCategory, row.PostingTypeDescription, row.LPONo, row.RowId,row.CreatedBy, row.CreatedOn,row.Remarks,row.TotalCount));
      
        mappedResponse = {
        data: mappedItems ,
        totalItems: items[0][0].TotalCount,     
      };

    }else{

      mappedResponse = {
        data: [],
        totalItems: 0,     
      };

    }

    return mappedResponse;


  }
  catch (err) {
    console.log(err);
  }
}

//#endregion

  const poOps_LogData = {  
   
    GetPostingLogs:GetPostingLogs,
    GetResetLogs:GetResetLogs

  }

  export default poOps_LogData;