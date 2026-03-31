import {Server} from 'http'
// import dns from 'dns'
import mongoose from 'mongoose';
import app from './app';
import { envVars } from './config/env';
// import { promise } from 'zod';
// import { error } from 'console';

let server:Server;
// dns.setServers(["1.1.1.1", "8.8.8.8"])

// const port =  process.env.PORT || 5000



const startServer = async() =>{

    try {
        
        
        await mongoose.connect(envVars.DB_URL)

        // console.log("connceted to mongodb");

        server = app.listen(envVars.PORT, ()=>{
            // console.log("listening from ph tour server");
            
        })
        
    } catch (error) {
        console.log(error);
        
        
    }

}

startServer()

//todo => signal termination SIGTERM
 process.on("SIGTERM",()=>{

    // console.log("sigterm signal detected. Server is shutting down", err);
    

    if (server) {
        server.close(()=>{ //* server.close() will close the app server

            process.exit(1) //* this part will close nodejs terminal 
        })
    }
    process.exit(1)
 })

//todo => unhandled Rejection error
 process.on("unhandledRejection",()=>{

    // console.log("unhandled rejection detected. Server is shutting down", err);
    

    if (server) {
        server.close(()=>{ //* server.close() will close the app server

            process.exit(1) //* this part will close nodejs terminal 
        })
    }
    process.exit(1)
 })

 //* unhandledRejection error
//  Promise.reject(new Error("i forgot to catch this promise"))



//todo => uncaught rejection error
 process.on("uncaughtException",(err)=>{

    console.log("uncaught exception detected. Server is shutting down", err);
    

    if (server) {
        server.close(()=>{ //* server.close() will close the app server

            process.exit(1) //* this part will close nodejs terminal 
        })
    }
    process.exit(1)
 })
//*uncaughtException error
//  throw new Error("i forgot to handle this local error")