
import Router from "express"
import { UserRoutes } from "../modules/user/user.routes"
import { AuthRoutes } from "../modules/auth/auth.routes"
import { TourRoutes } from "../modules/tour/tour.Routes"
import { DivisionRoutes } from "../modules/divisions/division.routes"
import { BookingRoutes } from "../modules/Booking/booking.routes"
import { PaymentRoutes } from "../modules/payment/payment.routes"
import { GuideRoutes } from "../modules/guides/guides.routes"
import { OTProutes } from "../modules/otp/otp.routes"

export const router = Router()


const moduleRoutes = [
    {
        path:"/user",
        route: UserRoutes
    },
    {
        path:'/auth',
        route: AuthRoutes
    },
    {
        path:'/division',
        route:DivisionRoutes
    },
    {
        path:'/tour',
        route:TourRoutes
    },
    {
        path:'/booking',
        route:BookingRoutes
    },
    {
        path:'/payment',
        route:PaymentRoutes
    },
    {
        path:'/guide',
        route:GuideRoutes
    },
    {
        path:'/otp',
        route:OTProutes
    }
]


moduleRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})



