
import  express, { Request, Response }  from 'express';
import cors from "cors"
import { router } from './Routes';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import routeNotFound from './errorHelper/notFound';
import cookieParser from 'cookie-parser';




const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use('/api/v1', router)

app.use(globalErrorHandler)

app.use(routeNotFound)


app.get('/', (req:Request, res:Response)=>{
    res.json({
        message:"ph tour server is running"
    })
})

export default app