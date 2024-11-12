

import commonOps from '../data/common_data.js';


export default class Common_Controller {


  //#region "common"

     
    static GetPostingDataTotalRecs(req,res){

      
      const poNo = req.params.pono;

      const { postingTypeId, isReset } = req.query;


      commonOps.GetPostingDataTotalRecs(poNo,postingTypeId,isReset).then((resp) => {

      const response = {
          statusCode: 200,
          message: 'Ok',
          totalItems: resp
         };
              
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(response); 

      });
    }


   //#endregion "common"


    
    

  }