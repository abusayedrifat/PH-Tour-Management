
import  express, { Request, Response }  from 'express';
import cors from "cors"
import { router } from './Routes';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import routeNotFound from './errorHelper/notFound';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import expressSession from 'express-session'
import '../app/config/passport'
import { envVars } from './config/env';


const app = express()

app.use(expressSession({
    secret:envVars.EXPRESS_SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use('/api/v1', router)

app.get('/', (req:Request, res:Response)=>{
    res.json({
        message:"ph tour server is running"
    })
})

app.use(globalErrorHandler)
app.use(routeNotFound)

export default app