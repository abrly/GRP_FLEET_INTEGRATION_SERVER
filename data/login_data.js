import  poolGrpIntDB  from './db/grpIntegrationSqlDbConn.js';
import sql from 'mssql';

async  function login(userName,userPassword) {
  try {
    let  pool = await poolGrpIntDB;
    let  resp = await  pool.request()
              .input('Username', sql.NVarChar(50), userName)
              .input('Password', sql.NVarChar(50), userPassword)
              .execute('spUserLogin');    
    return resp.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}



  const loginOps = {  
    login:login  
  }

  export default loginOps;