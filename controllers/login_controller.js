
import  loginOpsOps  from '../data/login_data.js';

export default class LoginController {
 
    static doLogin(req,res){

      const { username, password } = req.body;

      loginOpsOps.login(username,password).then((data) => {

        const response = {
          statusCode: 200,
          message: 'Ok',
          data: data[0][0]
        };
      
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.send(JSON.stringify(response)); 
       
            
      });
    }

  }