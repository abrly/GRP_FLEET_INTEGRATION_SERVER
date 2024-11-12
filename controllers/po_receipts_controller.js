import  poOps_Receipts  from '../data/po_receipts_data.js';

import grpDBOps from '../data/grpDBOps.js'; 

import lpo_posting_lpo_line from '../models/lpo_posting_lpo_line.js';

import lpo_posting_main_info from '../models/lpo_posting_main_info.js';

import reset_lpo_info from '../models/reset_lpo_info.js';


export default class PO_Receipts_Controller {


  //#region "Posting"

     
    static getPODetails4ReceiptXport(req,res){

      
      const poNo = req.params.pono;

      const { SortColumn = 'LineNo', SortDirection = 'ASC', PageNumber = 1, PageSize = 10 } = req.query;
    

      poOps_Receipts.GetPODetailsFromFleet4ReceiptXport(poNo,SortColumn,SortDirection,PageNumber,PageSize).then((resp) => {

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


    static async postReceipts(req,res){


      const {
        PONo,
        PostingDate,
        InvoiceNo,
        TotalInvoiceValue,
        TotalVATValue,
        TotalInvoiceValueWithVAT,
        Remarks,
        CreatedBy,
        RowIds,
        Merged_All_Line_Desc,    
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

       // Create an instance of LPOPostingInfo with the received data
      const posting_info = new lpo_posting_main_info(
        PONo,
        PostingDate,
        InvoiceNo,
        TotalInvoiceValue,
        TotalVATValue,
        TotalInvoiceValueWithVAT,
        Remarks,
        CreatedBy,
        RowIds,
        Merged_All_Line_Desc,
        postedLpoLines
      );


      console.log('what is postig info');

      console.log(posting_info)

      console.log('what is postig info end');


      grpDBOps.postReceipts2GRP(posting_info).then((data)=>{

      
        if (data.responseCode=='1'){ 

         console.log('are you comming here after done');
        
          poOps_Receipts.MarkUpdates_AddLogs_Receipts_Posting_ToGRP(posting_info).then((resp) => {

            const response = {
                StatusCode: resp.ResponseCode,
                Message: resp.ResponseDesc,
                ReferenceNo: resp.ReferenceNo      
              };

           
              res.statusCode = 200; 
              res.setHeader('Content-Type', 'application/json'); 
              res.json(response); 
      
            });

            
        } else {

          const response = {
            statusCode: 500,
            message: 'Error',
            ReferenceNo: ''      
          };

          res.statusCode = 500; 
          res.setHeader('Content-Type', 'application/json'); 
          res.json(response); 
        }


      }).catch((c)=>{

        console.log('you HIT Me 222');

        console.log(c);

      });

    
    /*

    grpDBOps.postReceipts2GRP(posting_info).then((data)=>{

      console.log("you hme 1");
     


    }).catch((c)=>{

      console.log('you HIT Me');

      console.log(c);

    }); */

    

  }

      
    


    //#endregion "Posting"

    //#region "Reset"


    static getPODetails4ResetReceiptXport(req,res){

      const poNo = req.params.pono;

      const { SortColumn = 'LineNo', SortDirection = 'ASC', PageNumber = 1, PageSize = 10 } = req.query;
    

      poOps_Receipts.GetPODetailsFromFleet4ResetReceiptXport(poNo,SortColumn,SortDirection,PageNumber,PageSize).then((resp) => {

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





    static resetReceipts(req,res){

      const {
        PONo,
        Remarks,
        CreatedBy,
        RowIds   
      } = req.body;
  
     
       // Create an instance of LPOPostingInfo with the received data
      const rest_info = new reset_lpo_info(
        PONo,
        Remarks,
        CreatedBy,
        RowIds      
      );


      poOps_Receipts.MarkUpdates_AddLogs_Receipts_Reset_Posting_ToGRP(rest_info).then((resp) => {



        const response = {
            StatusCode: resp.ResponseCode,
            Message: resp.ResponseDesc,
            ReferenceNo: resp.ReferenceNo      
          };

       
          res.statusCode = 200; 
          res.setHeader('Content-Type', 'application/json'); 
          res.json(response); 
  
        }).catch((err)=>{
          

          const response = {
            statusCode: 500,
            message: 'Error',
            ReferenceNo: ''      
          };

          res.statusCode = 500; 
          res.setHeader('Content-Type', 'application/json'); 
          res.json(response); 




        });


      
    }



    //#endregion "Receipts Reset"



    

      


    
    

  }