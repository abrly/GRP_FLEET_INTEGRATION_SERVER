import app from './app.js';

const PORT = process.env.Server_Port;

app.listen(PORT, (error) =>{
    if(!error)        
        console.log("Server is Successfully Running, and App is  listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);