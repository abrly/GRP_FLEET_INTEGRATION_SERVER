import config from './grpIntegrationSqlDbconfig.js';
import sql from 'mssql';

const poolGrpIntDB = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL@grpIntegrationDB')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

export default poolGrpIntDB

