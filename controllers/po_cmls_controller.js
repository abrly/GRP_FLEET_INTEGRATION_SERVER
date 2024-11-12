import  poOps_Cmls  from '../data/po_cmls_data.js';

import grpDBOps from '../data/grpDBOps.js'; 


import reset_lpo_info from '../models/reset_lpo_info.js';

import lpo_posting_cml_line from '../models/lpo_posting_cml_line.js';

import cml_posting_main_info from '../models/cml_posting_main_info.js';


export default class PO_Cmls_Controller {


    //#region postings


    static getPODetails4CMLsXport(req,res){

      const poNo = req.params.pono;

      const { SortColumn = 'LineNo', SortDirection = 'ASC', PageNumber = 1, PageSize = 10 } = req.query;
    

      poOps_Cmls.GetPODetailsFromFleet4CMLsXport(poNo,SortColumn,SortDirection,PageNumber,PageSize).then((resp) => {

       

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



    static postCMLs(req,res){

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
        lpo_posting_cml_lines,
      } = req.body;

      
     
      const postedCMLs = lpo_posting_cml_lines.map(lpoData => new lpo_posting_cml_line(
        lpoData.SupplierNo,
        lpoData.SupplierName,
        lpoData.LineNo,
        lpoData.VAT,
        lpoData.Site,
        lpoData.TotalCost,
        lpoData.RowId
      ));


       // Create an instance of LPOPostingInfo with the received data
      const cml_posting_info = new cml_posting_main_info(
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
        postedCMLs
      );


        grpDBOps.postCMLs2GRP(cml_posting_info).then((data)=>{


        if (data.responseCode=='1'){

        
          poOps_Cmls.MarkUpdates_AddLogs_CMLs_ToGRP(cml_posting_info).then((resp) => {


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



    //#endregion


    //#region Reset

    static getPODetails4ResetCMLsXport(req,res){

      const poNo = req.params.pono;

      const { SortColumn = 'LineNo', SortDirection = 'ASC', PageNumber = 1, PageSize = 10 } = req.query;
    

      poOps_Cmls.GetPODetailsFromFleet4ResetCMLsXport(poNo,SortColumn,SortDirection,PageNumber,PageSize).then((resp) => {

       
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


    static resetCMLs(req,res){

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


      poOps_Cmls.MarkUpdates_AddLogs_CMLs_Reset_Posting_ToGRP(rest_info).then((resp) => {


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


  }