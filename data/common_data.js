import  poolGrpIntDB  from './db/grpIntegrationSqlDbConn.js';
import sql from 'mssql';


//#region "Common stuffs"

async function GetPostingDataTotalRecs(PONo,postingTypeId,isReset) {  
  try {
    let  pool = await poolGrpIntDB;
    let  resp = await  pool.request()
    .input('PONo', sql.NVarChar(50), PONo) 
    .input('PostingTypeID', sql.Int, parseInt(postingTypeId)) 
    .input('IsReset', sql.Bit, parseInt(isReset)) 
    .execute('spGetPostingDataTotalRecs');    
  

    let items = resp.recordsets;

  
    let totalRecs=0;

    if (items[0].length>0){

      totalRecs = items[0][0].TotalCount;
    
    }

    return totalRecs;


  }
  catch (err) {
    console.log(err);
  }
}


async function addExceptionLog(clientID,clientRef,methodName,exception,exceptionDetails) {  
  try {
    let  pool = await poolGrpIntDB;
    let  resp = await  pool.request()
    .input('ClientID', sql.NVarChar(50), clientID) 
    .input('ClientRef', sql.NVarChar(200), clientRef) 
    .input('MethodName', sql.NVarChar(100),methodName) 
    .input('Exception', sql.NVarChar(1000), exception) 
    .input('ExceptionDetails', sql.NVarChar(2000), exceptionDetails) 
    .execute('spAddException');    


  
    let addLogResp = resp.recordsets[0][0];

    console.log('htmme');

    console.log(addLogResp);

    console.log('200');

    //return Promise.reject('Error Occured');

    return addLogResp;


  }
  catch (err) {
    console.log(err);

    console.log('200 err');

  }
}




//#endregion

  const commonOps = {  
    GetPostingDataTotalRecs:GetPostingDataTotalRecs,
    addExceptionLog:addExceptionLog 
  }

  export default commonOps;