import { Router } from "express";
import { TourServices } from "./tour.service";
import { checkAuthorization } from "../../middlewares/checkAuthorization";
import { Role } from "../user/user.interface";

const router = Router()

//todo================= TOUR  ========================================

router.post('/create-tour', TourServices.createTour)

//*=========== getAll tour ============
router.get('/', checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN), TourServices.getAllTour)

//*=========== update tour ============
// router.patch('/:id')

//*=========== delete tour ============
// router.delete('/:id')





//todo================= TOUR TYPES ====================================

// router.post('/create-tour-types')

// //*=========== getAll tour types ============
// router.get('/tour-types')

// //*=========== update tour type ============
// router.patch('/tour-type/:id')

// //*=========== delete tour type ============
// router.delete('/tour-type/:id')



export const TourRoutes = router