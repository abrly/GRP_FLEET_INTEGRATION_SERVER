import  poOps_Receipt_Returns  from '../data/po_receipt_returns_data.js';

import grpDBOps from '../data/grpDBOps.js'; 

import lpo_posting_lpo_line from '../models/lpo_posting_lpo_line.js';

import lpo_posting_main_info from '../models/lpo_posting_main_info.js';

import reset_lpo_info from '../models/reset_lpo_info.js';


export default class PO_Receipt_Returns_Controller {


  //#region "Posting"

     
    static getPODetails4ReceiptReturnsXport(req,res){

      
      const poNo = req.params.pono;

      const { SortColumn = 'LineNo', SortDirection = 'ASC', PageNumber = 1, PageSize = 10 } = req.query;
    

      poOps_Receipt_Returns.GetPODetailsFromFleet4ReceiptReturnsXport(poNo,SortColumn,SortDirection,PageNumber,PageSize).then((resp) => {

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


    static postReceiptReturns(req,res){


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


      grpDBOps.postReceipts2GRP(posting_info).then((data)=>{


        if (data.responseCode=='1'){

        
          poOps_Receipt_Returns.MarkUpdates_AddLogs_Receipt_Returns_Posting_ToGRP(posting_info).then((resp) => {


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


      }); 


      
    }


    //#endregion "Posting"

    //#region "Reset"


    static getPODetails4ResetReceiptReturnsXport(req,res){

      const poNo = req.params.pono;

      const { SortColumn = 'LineNo', SortDirection = 'ASC', PageNumber = 1, PageSize = 10 } = req.query;
    

      poOps_Receipt_Returns.GetPODetailsFromFleet4ResetReceiptReturnsXport(poNo,SortColumn,SortDirection,PageNumber,PageSize).then((resp) => {

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





    static resetReceiptReturns(req,res){

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


      poOps_Receipt_Returns.MarkUpdates_AddLogs_Receipt_Returns_Reset_Posting_ToGRP(rest_info).then((resp) => {



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



    //#endregion "Receipts Returns Reset"



    

      


    
    

  }