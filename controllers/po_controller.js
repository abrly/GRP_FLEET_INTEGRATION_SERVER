import  poOps  from '../data/po_data.js';

import grpDBOps from '../data/grpDBOps.js'; 

import lpo_posting_lpo_line from '../models/lpo_posting_lpo_line.js';

import lpo_posting_main_info from '../models/lpo_posting_main_info.js';

import reset_lpo_info from '../models/reset_lpo_info.js';

import lpo_posting_cml_line from '../models/lpo_posting_cml_line.js';

import cml_posting_main_info from '../models/cml_posting_main_info.js';


export default class POController {


  //#region "Receipts Posting"

     
    static getPODetails4ReceiptXport(req,res){

      const poNo = req.params.pono;

      const { SortColumn = 'LineNo', SortDirection = 'ASC', PageNumber = 1, PageSize = 10 } = req.query;
    

      poOps.GetPODetailsFromFleet4ReceiptXport(poNo,SortColumn,SortDirection,PageNumber,PageSize).then((resp) => {

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


    static postReceipts(req,res){


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

        
          poOps.MarkUpdates_AddLogs_Receipts_Posting_ToGRP(posting_info).then((resp) => {


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


    //#endregion "Receipts Posting"

    //#region "Receipts Reset"


    static getPODetails4ResetReceiptXport(req,res){

      const poNo = req.params.pono;

      const { SortColumn = 'LineNo', SortDirection = 'ASC', PageNumber = 1, PageSize = 10 } = req.query;
    

      poOps.GetPODetailsFromFleet4ResetReceiptXport(poNo,SortColumn,SortDirection,PageNumber,PageSize).then((resp) => {

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


      console.log('am i get this reset  ');

      console.log(rest_info)

      poOps.MarkUpdates_AddLogs_Receipts_Reset_Posting_ToGRP(rest_info).then((resp) => {


        console.log('what ra resp  ');
        console.log(resp);


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



    //#region CMLs


    static getPODetails4CMLsXport(req,res){

      const poNo = req.params.pono;

      const { SortColumn = 'LineNo', SortDirection = 'ASC', PageNumber = 1, PageSize = 10 } = req.query;
    

      poOps.GetPODetailsFromFleet4CMLsXport(poNo,SortColumn,SortDirection,PageNumber,PageSize).then((resp) => {

        console.log('what ya res');

        console.log(resp);

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

      console.log('what do dyou receive after post cml');

      console.log(req.body);
  
     
      const postedCMLs = lpo_posting_cml_lines.map(lpoData => new lpo_posting_cml_line(
        lpoData.SupplierNo,
        lpoData.SupplierName,
        lpoData.LineNo,
        lpoData.VAT,
        lpoData.Site,
        lpoData.TotalCost,
        lpoData.RowId
      ));


      console.log('tell me posted cml');
      console.log(postedCMLs);


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

      console.log('so what ra posted cmls main for and so');
      console.log(cml_posting_info);


      grpDBOps.postCMLs2GRP(cml_posting_info).then((data)=>{


        if (data.responseCode=='1'){

        
          poOps.MarkUpdates_AddLogs_CMLs_ToGRP(cml_posting_info).then((resp) => {


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


    //#region  CML Reset

    static getPODetails4ResetCMLsXport(req,res){

      const poNo = req.params.pono;

      const { SortColumn = 'LineNo', SortDirection = 'ASC', PageNumber = 1, PageSize = 10 } = req.query;
    

      poOps.GetPODetailsFromFleet4ResetCMLsXport(poNo,SortColumn,SortDirection,PageNumber,PageSize).then((resp) => {

        console.log('what ya res');

        console.log(resp);

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

      
      console.log('am i get this reset CMLs body here  ');

      console.log(req.body)

  
     
       // Create an instance of LPOPostingInfo with the received data
      const rest_info = new reset_lpo_info(
        PONo,
        Remarks,
        CreatedBy,
        RowIds      
      );


      console.log('am i get this reset CMLs here  ');

      console.log(rest_info)

      poOps.MarkUpdates_AddLogs_CMLs_Reset_Posting_ToGRP(rest_info).then((resp) => {


        console.log('what ra resp  ');
        console.log(resp);


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


    //#endregion posting logs

    static getPostingLogs(req,res){

      
      const { fromdate, todate , SortColumn = 'PostingMainTrxID', SortDirection = 'ASC', PageNumber = 1, PageSize = 10 } = req.query;
    

      poOps.GetPostingLogs(fromdate,todate,SortColumn,SortDirection,PageNumber,PageSize).then((resp) => {

        console.log('what ya res');

        console.log(resp);

      const response = {
          statusCode: 200,
          message: 'Ok',
          data: resp.data       
        };
              
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(response); 

      });
    }


    //#region 


  }