
import  loginOpsOps  from '../data/login_data.js';

import utilOps from '../util.js';


export default class LoginController {

    static LogMein(req,res){


    

      const { username, password } = req.body;

      loginOpsOps.login(username,password).then((data) => {


        let token = null;

        if (data.ResponseCode=="1"){

          const payload = {
            userID: data.UserID,
            fullName: data.FullName,
            emailAddress: data.EmailAddress,
            roleID: data.RoleID,
            roleName:data.RoleName
          };
  
          token = utilOps.generateToken(payload);

        }


        const response = {
          statusCode: 200,
          message: 'Ok',
          data: {
            responseCode: data.ResponseCode,
            responseDesc: data.ResponseDesc,
            authToken: token           
          }
        };
      
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.send(JSON.stringify(response)); 
       
            
      });
    }

  }