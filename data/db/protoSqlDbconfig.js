
import dotenv from 'dotenv';

dotenv.config();

const Proto_DB_UserID = process.env.Proto_DB_UserID;
const Proto_DB_User_Password = process.env.Proto_DB_User_Password;
const Proto_DB_Name = process.env.Proto_DB_Name;
const Proto_DB_Server = process.env.Proto_DB_Server;
const Proto_DB_Server_Port = process.env.Proto_DB_Server_Port;


  const config = {
    user: Proto_DB_UserID, 
    password: Proto_DB_User_Password, 
    server: Proto_DB_Server,
    database: Proto_DB_Name,
    options: {
      enableArithAbort: true,
      trustServerCertificate: true, // Ignore certificate validation in dev
      encrypt: false // Disable encryption to avoid SSL/TLS issues
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 90000
    },
    port: Proto_DB_Server_Port
  };
  
  export default config;


