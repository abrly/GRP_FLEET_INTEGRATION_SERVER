import oracledb from 'oracledb';
import moment from 'moment';
import commonOps from './common_data.js';

oracledb.initOracleClient({ libDir: 'C:/instantclient_23_5' }); 

async function postReceipts2GRP(postingData) {

   // return { responseCode: 1, responseDesc: "OK" };

   let grpTableName= process.env.GRP_DB_Export_Table_Name;

  
    let connection;

    try {
        // Establish the OracleDB connection
     
          let cnstr = {
            user: process.env.GRP_DB_User,  // Replace with your Oracle username
            password: process.env.GRP_DB_Password,  // Replace with your Oracle password
            connectString: process.env.GRP_DB_Connection_String // e.g., localhost:1521/orclpdb1
        }; 

        connection = await oracledb.getConnection(cnstr);

        for (const e of postingData.lpo_posting_lpo_lines) {

            const sql = `INSERT INTO ${grpTableName} 
                (
                FLT_INVOICE_REF,
                FLT_INVOICE_NUM,
                FLT_INVOICE_DATE,
                FLT_VENDOR_NUM,
                FLT_VENDOR_NAME,
                FLT_VENDOR_SITE_CODE,
                FLT_INVOICE_AMOUNT,
                FLT_INVOICE_CURRENCY_CODE,
                FLT_EXCHANGE_RATE,
                FLT_EXCHANGE_RATE_TYPE,
                FLT_EXCHANGE_DATE,
                FLT_LINE_STATUS,
                FLT_ERROR_DETAILS,
                FLT_DESCRIPTION,
                FLT_LINE_NUMBER,
                FLT_AMOUNT,
                FLT_DIST_CODE_CONCATENATED,
                TAX_RATE_CODE,
                TAX_AMOUNT,
                PRODUCT_CATEGORY
                )
            VALUES 
                (
                :FLT_INVOICE_REF, 
                :FLT_INVOICE_NUM,
                :FLT_INVOICE_DATE,
                :FLT_VENDOR_NUM,
                :FLT_VENDOR_NAME,
                :FLT_VENDOR_SITE_CODE,
                :FLT_INVOICE_AMOUNT,
                :FLT_INVOICE_CURRENCY_CODE,
                :FLT_EXCHANGE_RATE,
                :FLT_EXCHANGE_RATE_TYPE,
                :FLT_EXCHANGE_DATE,
                :FLT_LINE_STATUS,
                :FLT_ERROR_DETAILS,
                :FLT_DESCRIPTION,
                :FLT_LINE_NUMBER,
                :FLT_AMOUNT,
                :FLT_DIST_CODE_CONCATENATED,
                :TAX_RATE_CODE,
                :TAX_AMOUNT,
                :PRODUCT_CATEGORY
                )`;

            const today = moment();

         /*  const binds = {
                FLT_INVOICE_REF: postingData.PONo,
                FLT_INVOICE_NUM: postingData.InvoiceNo,
                FLT_INVOICE_DATE: moment(postingData.PostingDate).format('DD-MMM-YYYY'),
                FLT_VENDOR_NUM: e.SupplierNo,
                FLT_VENDOR_NAME: e.SupplierName,
                FLT_VENDOR_SITE_CODE: e.Site,
                FLT_INVOICE_AMOUNT: postingData.TotalInvoiceValueWithVAT,
                FLT_INVOICE_CURRENCY_CODE: 'AED',
                FLT_EXCHANGE_RATE: 1,
                FLT_EXCHANGE_RATE_TYPE: 1,
                FLT_EXCHANGE_DATE: today.format('DD-MMM-YYYY'),
                FLT_LINE_STATUS: 1,
                FLT_ERROR_DETAILS: '',
                FLT_DESCRIPTION: postingData.Merged_All_Line_Desc,
                FLT_LINE_NUMBER: e.LineNo,
                FLT_AMOUNT: e.TotalCost,
                FLT_DIST_CODE_CONCATENATED: '15-000-0000-41104-00-00000-00000-00000',
                TAX_RATE_CODE: 'STANDARD',
                TAX_AMOUNT: e.VAT,
                PRODUCT_CATEGORY: ''
            }; */


             const binds = {
                FLT_INVOICE_REF: postingData.Merged_All_Line_Desc,
                FLT_INVOICE_NUM: postingData.InvoiceNo,
                FLT_INVOICE_DATE: moment(postingData.PostingDate).format('DD-MMM-YYYY'),
                FLT_VENDOR_NUM: e.SupplierNo,
                FLT_VENDOR_NAME: e.SupplierName,
                FLT_VENDOR_SITE_CODE: e.Site,
                FLT_INVOICE_AMOUNT: postingData.TotalInvoiceValueWithVAT,
                FLT_INVOICE_CURRENCY_CODE: 'AED',
                FLT_EXCHANGE_RATE: 1,
                FLT_EXCHANGE_RATE_TYPE: 1,
                FLT_EXCHANGE_DATE: today.format('DD-MMM-YYYY'),
                FLT_LINE_STATUS: 1,
                FLT_ERROR_DETAILS: '',
                FLT_DESCRIPTION: postingData.PONo,
                FLT_LINE_NUMBER: e.LineNo,
                FLT_AMOUNT: e.TotalCost,
                FLT_DIST_CODE_CONCATENATED: '15-000-0000-41104-00-00000-00000-00000',
                TAX_RATE_CODE: 'STANDARD',
                TAX_AMOUNT: e.VAT,
                PRODUCT_CATEGORY: ''
            }; 


            // Execute the INSERT query
            const result = await connection.execute(sql, binds);  // Await is added
            console.log('Row inserted: ', result.rowsAffected);
        }



        // Commit all changes
        await connection.commit();  // Commit after all inserts

        const response = { responseCode: 1, responseDesc: "OK" };
      
        return Promise.resolve(response);

       
     

    } catch (err) {

        
        let errMsg=err.toString();

        await commonOps.addExceptionLog("GRP-LPO-FLOW","","postReceipts2GRP",errMsg,errMsg);

        const response = { responseCode: -1, responseDesc: "NOT OK" };
       
        return Promise.reject(response);


    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing connection: ', err);
                const response = { responseCode: -2, responseDesc: "NOT OK" };
                return Promise.reject(response);
            }
        }
    }
}



async function postCMLs2GRP(cmlPostingData) {

    let grpTableName= process.env.GRP_DB_Export_Table_Name;
  
    let connection;

    try {
        // Establish the OracleDB connection
       /* let cnstr = {
            user: 'xx_dgw',  // Replace with your Oracle username
            password: 'xx_dgw123',  // Replace with your Oracle password
            connectString: '213.42.48.56:1571/PROD'  // e.g., localhost:1521/orclpdb1
        };*/


        let cnstr = {
            user: process.env.GRP_DB_User,  // Replace with your Oracle username
            password: process.env.GRP_DB_Password,  // Replace with your Oracle password
            connectString: process.env.GRP_DB_Connection_String // e.g., localhost:1521/orclpdb1
        }; 

        connection = await oracledb.getConnection(cnstr);

     
        for (const e of cmlPostingData.lpo_posting_cml_lines) {

            
            const sql = `INSERT INTO ${grpTableName}  
                (
                FLT_INVOICE_REF,
                FLT_INVOICE_NUM,
                FLT_INVOICE_DATE,
                FLT_VENDOR_NUM,
                FLT_VENDOR_NAME,
                FLT_VENDOR_SITE_CODE,
                FLT_INVOICE_AMOUNT,
                FLT_INVOICE_CURRENCY_CODE,
                FLT_EXCHANGE_RATE,
                FLT_EXCHANGE_RATE_TYPE,
                FLT_EXCHANGE_DATE,
                FLT_LINE_STATUS,
                FLT_ERROR_DETAILS,
                FLT_DESCRIPTION,
                FLT_LINE_NUMBER,
                FLT_AMOUNT,
                FLT_DIST_CODE_CONCATENATED,
                TAX_RATE_CODE,
                TAX_AMOUNT,
                PRODUCT_CATEGORY
                )
            VALUES 
                (
                :FLT_INVOICE_REF, 
                :FLT_INVOICE_NUM,
                :FLT_INVOICE_DATE,
                :FLT_VENDOR_NUM,
                :FLT_VENDOR_NAME,
                :FLT_VENDOR_SITE_CODE,
                :FLT_INVOICE_AMOUNT,
                :FLT_INVOICE_CURRENCY_CODE,
                :FLT_EXCHANGE_RATE,
                :FLT_EXCHANGE_RATE_TYPE,
                :FLT_EXCHANGE_DATE,
                :FLT_LINE_STATUS,
                :FLT_ERROR_DETAILS,
                :FLT_DESCRIPTION,
                :FLT_LINE_NUMBER,
                :FLT_AMOUNT,
                :FLT_DIST_CODE_CONCATENATED,
                :TAX_RATE_CODE,
                :TAX_AMOUNT,
                :PRODUCT_CATEGORY
                )`;

            const today = moment();
           
           /* const binds = {
                FLT_INVOICE_REF: cmlPostingData.PONo,
                FLT_INVOICE_NUM: cmlPostingData.InvoiceNo,
                FLT_INVOICE_DATE: moment(cmlPostingData.PostingDate).format('DD-MMM-YYYY'),
                FLT_VENDOR_NUM: e.SupplierNo,
                FLT_VENDOR_NAME: e.SupplierName,
                FLT_VENDOR_SITE_CODE: e.Site,
                FLT_INVOICE_AMOUNT: cmlPostingData.TotalInvoiceValueWithVAT,
                FLT_INVOICE_CURRENCY_CODE: 'AED',
                FLT_EXCHANGE_RATE: 1,
                FLT_EXCHANGE_RATE_TYPE: 1,
                FLT_EXCHANGE_DATE: today.format('DD-MMM-YYYY'),
                FLT_LINE_STATUS: 1,
                FLT_ERROR_DETAILS: '',
                FLT_DESCRIPTION: cmlPostingData.Merged_All_Line_Desc,
                FLT_LINE_NUMBER: e.LineNo,
                FLT_AMOUNT: e.TotalCost,
                FLT_DIST_CODE_CONCATENATED: '15-000-0000-41104-00-00000-00000-00000',
                TAX_RATE_CODE: 'STANDARD',
                TAX_AMOUNT: e.VAT,
                PRODUCT_CATEGORY: ''
            }; */


               const binds = {
                FLT_INVOICE_REF: cmlPostingData.Merged_All_Line_Desc,
                FLT_INVOICE_NUM: cmlPostingData.InvoiceNo,
                FLT_INVOICE_DATE: moment(cmlPostingData.PostingDate).format('DD-MMM-YYYY'),
                FLT_VENDOR_NUM: e.SupplierNo,
                FLT_VENDOR_NAME: e.SupplierName,
                FLT_VENDOR_SITE_CODE: e.Site,
                FLT_INVOICE_AMOUNT: cmlPostingData.TotalInvoiceValueWithVAT,
                FLT_INVOICE_CURRENCY_CODE: 'AED',
                FLT_EXCHANGE_RATE: 1,
                FLT_EXCHANGE_RATE_TYPE: 1,
                FLT_EXCHANGE_DATE: today.format('DD-MMM-YYYY'),
                FLT_LINE_STATUS: 1,
                FLT_ERROR_DETAILS: '',
                FLT_DESCRIPTION: cmlPostingData.PONo,
                FLT_LINE_NUMBER: e.LineNo,
                FLT_AMOUNT: e.TotalCost,
                FLT_DIST_CODE_CONCATENATED: '15-000-0000-40010-00-00000-00000-00000',
                TAX_RATE_CODE: 'STANDARD',
                TAX_AMOUNT: e.VAT,
                PRODUCT_CATEGORY: ''
            }; 

            // Execute the INSERT query
            const result = await connection.execute(sql, binds);  // Await is added
            console.log('Row inserted: ', result.rowsAffected);
        }

        // Commit all changes
        await connection.commit();  // Commit after all inserts

        const response = { responseCode: 1, responseDesc: "OK" };
      
        return Promise.resolve(response);

       
     

    } catch (err) {
        console.error('Error occurred: ', err);


        let errMsg=err.toString();

        await commonOps.addExceptionLog("GRP-LPO-FLOW","","postCMLs2GRP",errMsg,errMsg);

        const response = { responseCode: -1, responseDesc: "NOT OK" };
        return Promise.reject(response);

    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing connection: ', err);
                const response = { responseCode: -2, responseDesc: "NOT OK" };
                return Promise.reject(response);
            }
        }
    }
}


const grpDBOps = {
    postReceipts2GRP: postReceipts2GRP,
    postCMLs2GRP:postCMLs2GRP
};

export default grpDBOps;
