import  poOps_LogData  from '../data/po_log_data.js';


export default class LogsController {


    //#endregion posting logs

    static getPostingLogs(req,res){

      
      const { fromdate, todate , SortColumn = 'PostingMainTrxID', SortDirection = 'ASC', PageNumber = 1, PageSize = 10, postingTypeId='ALL',lpoRef=''} = req.query;
    

      poOps_LogData.GetPostingLogs(fromdate,todate,SortColumn,SortDirection,PageNumber,PageSize,postingTypeId,lpoRef).then((resp) => {

      
      const response = {
          statusCode: 200,
          message: 'Ok',
          data: resp.data,
          totalItems: resp.totalItems       
        };

        console.log('wja rep');

        console.log(response);
              
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(response); 

      });
    }


    static GetResetLogs(req,res){

      
      const { fromdate, todate , SortColumn = 'PostingMainTrxID', SortDirection = 'ASC', PageNumber = 1, PageSize = 10, postingTypeId='ALL',lpoRef=''} = req.query;
    

      poOps_LogData.GetResetLogs(fromdate,todate,SortColumn,SortDirection,PageNumber,PageSize,postingTypeId,lpoRef).then((resp) => {

      
      const response = {
          statusCode: 200,
          message: 'Ok',
          data: resp.data,
          totalItems: resp.totalItems        
        };
              
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(response); 

      });
    }


    //#region 


  }