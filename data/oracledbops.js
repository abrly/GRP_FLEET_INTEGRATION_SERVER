//const oracledb = require('oracledb');
import oracledb from 'oracledb';

oracledb.initOracleClient({ libDir: 'C:/instantclient_23_5' }); 

async function oracledbops()
{
  let connection;
  try {
    console.log('try to connect');

    let cnstr={
        user: 'xx_dgw',  // Replace with your Oracle username
        password: 'xx_dgw123',  // Replace with your Oracle password
        connectString: '213.42.48.56:1571/PROD'  // e.g., localhost:1521/orclpdb1
      }

    //connection = await oracledb.getConnection({ user: "xx_dgw", password: "xx_dgw123", connectionString: "PROD" });

connection = await oracledb.getConnection(cnstr);




    console.log("Successfully connected to Oracle Database");
  
    /* Create a table
    await connection.execute(`begin execute immediate 'drop table todoitem'; exception when others then if sqlcode <> -942 then raise; end if; end;`);
    await connection.execute(`create table todoitem ( id number generated always as identity, description varchar2(4000), creation_ts timestamp with time zone default current_timestamp, done number(1,0), primary key (id))`);
  
    // Insert some data
    const sql = `insert into todoitem (description, done) values(:1, :2)`;
    const rows = [ ["Task 1", 0 ], ["Task 2", 0 ], ["Task 3", 1 ], ["Task 4", 0 ], ["Task 5", 1 ] ];
    let result = await connection.executeMany(sql, rows);
    console.log(result.rowsAffected, "Rows Inserted");
    connection.commit(); */

      //console.log(connection);



      const result = await connection.execute(
        `SELECT FLT_INVOICE_REF FROM XX_DGW_FLT_AP_INVOICES`        
      );
  
      console.log('Query Results:', result.rows); 


      /*

  
    // Now query the rows back
    let result = await connection.execute( `select FLT_INVOICE_REF from XX_DGW_FLT_AP_INVOICES`, [], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });

      console.log(result);

    const rs = result.resultSet; let row;
    while ((row = await rs.getRow())) {
      if (row.DONE)
        console.log(row.DESCRIPTION, "is done");
      else
        console.log(row.DESCRIPTION, "is NOT done");
    }
    await rs.close();

      */

  } catch (err) {
    console.error(err);
  } finally {
    if (connection)
    {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export default oracledbops;
