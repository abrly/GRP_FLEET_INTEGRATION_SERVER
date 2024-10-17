import  poOps  from '../data/po_data.js';

import grpDBOps from '../data/grpDBOps.js'; 

import lpo_posting_lpo_line from '../models/lpo_posting_lpo_line.js';

import lpo_posting_main_info from '../models/lpo_posting_main_info.js';


export default class POController {

     
    static getPODetails(req,res){

      const poNo = req.params.pono;

      const { SortColumn = 'LineNo', SortDirection = 'ASC', PageNumber = 1, PageSize = 10 } = req.query;
    

      poOps.GetPODetailsFromFleet(poNo,SortColumn,SortDirection,PageNumber,PageSize).then((resp) => {

      const response = {
          statusCode: 200,
          message: 'Ok',
          data: resp.data,
          totalItems: resp.totalItems,
          totalInvoiceValue:resp.totalInvoiceValue,
          totalVATValue:resp.totalVATValue,
          totalInvoiceValueWithVAT:resp.totalInvoiceValueWithVAT
        };
              
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(response); 

      });
    }


    static postLPO(req,res){


      console.log('what is in body?');

      console.log(req.body);


      const {
        poNo,
        postingDate,
        invoiceNo,
        totalInvoiceValue,
        totalVATValue,
        totalInvoiceValueWithVAT,
        remarks,
        createdBy,
        rowids,
        merged_All_Line_Desc,    
        lpo_posting_lpo_lines,
      } = req.body;
  
     
      const postedLpoLines = lpo_posting_lpo_lines.map(lpoData => new lpo_posting_lpo_line(
        lpoData.SupplierNo,
        lpoData.SupplierName,
        lpoData.LineNo,
        lpoData.VAT,
        lpoData.Site,
        lpoData.TotalCost,
        lpoData.RowId
      ));

      console.log('what you lined');

      console.log(postedLpoLines);

      // Create an instance of LPOPostingInfo with the received data
      const posting_info = new lpo_posting_main_info(
        poNo,
        postingDate,
        invoiceNo,
        totalInvoiceValue,
        totalVATValue,
        totalInvoiceValueWithVAT,
        remarks,
        createdBy,
        rowids,
        merged_All_Line_Desc,
        postedLpoLines
      );

      console.log('what you mained');

      console.log(posting_info);
    

      grpDBOps.postLPO2GRP(posting_info).then((data)=>{



        if (data.responseCode=='1'){

            
          // add logs

          poOps.AddLogs_LPO_Posting_ToGRP(poNo,postingDate,invoiceNo,totalInvoiceValue,totalVATValue,totalInvoiceValueWithVAT,remarks,createdBy,rowids).then((resp) => {

            const response = {
                statusCode: 200,
                message: 'Ok',
                data: resp      
              };
                    
              res.statusCode = 200; 
              res.setHeader('Content-Type', 'application/json'); 
              res.json(response); 
      
            });


        } else {

          const response = {
            statusCode: 500,
            message: 'Error',
            data: resp      
          };

          res.statusCode = 500; 
          res.setHeader('Content-Type', 'application/json'); 
          res.json(response); 
        }


      });


      
    }


  }