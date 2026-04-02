
import  express, { Request, Response }  from 'express';
import { UserRoutes } from './modules/user/user.routes';
import cors from "cors"
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1/user', UserRoutes)


app.get('/', (req:Request, res:Response)=>{
    res.json({
        message:"ph tour server is running"
    })
})

export default app