import config from './protoSqlDbconfig.js';
import sql from 'mssql';

const poolProto = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL@proto')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

export default poolProto

