import  poolGrpIntDB  from './db/grpIntegrationSqlDbConn.js';
import sql from 'mssql';

async  function login(userName,userPassword) {
  try {
    let  pool = await poolGrpIntDB;
    let  resp = await  pool.request()
              .input('UserName', sql.NVarChar(50), userName)
              .input('Password', sql.NVarChar(50), userPassword)
              .execute('spLogin');  
              
              let addLogResp = resp.recordsets[0][0];

    return addLogResp;
  }
  catch (err) {
    console.log(err);
  }
}



  const loginOps = {  
    login:login  
  }

  export default loginOps;