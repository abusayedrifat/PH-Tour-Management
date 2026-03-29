
import  express, { Request, Response }  from 'express';

const app = express()


app.get('/', (req:Request, res:Response)=>{
    res.json({
        message:"ph tour server is running"
    })
})

export default app