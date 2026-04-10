
import Router from "express"
import { UserControllers } from "./user.controller"


const router = Router()

router.post('/register', UserControllers.createUser)
router.get('/allUsers', UserControllers.getALlUsers )






export const UserRoutes = router