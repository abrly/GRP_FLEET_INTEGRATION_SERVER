
import dotenv from 'dotenv';

dotenv.config();

const Integration_DB_UserID = process.env.Integration_DB_UserID;
const Integration_DB_User_Password = process.env.Integration_DB_User_Password;
const Integration_DB_Name = process.env.Integration_DB_Name;
const Integration_DB_Server = process.env.Integration_DB_Server;
const Integration_DB_Server_Port = process.env.Integration_DB_Server_Port;


  const config = {
    user: Integration_DB_UserID, 
    password: Integration_DB_User_Password, 
    server: Integration_DB_Server,
    database: Integration_DB_Name,
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
    port: Integration_DB_Server_Port
  };
  
  export default config;
  
  