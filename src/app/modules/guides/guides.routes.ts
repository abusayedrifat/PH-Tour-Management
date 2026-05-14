import { Router } from "express";
import { GuideController } from "./guides.controller";
import { checkAuthorization } from "../../middlewares/checkAuthorization";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/apply", 
    checkAuthorization(...Object.values(Role.USER)),
    GuideController.applyGuides);
router.post("/approve", GuideController.createGuides);
router.get("/", GuideController.getALLGuides);
router.get("/:id", GuideController.getSingleGuide);

export const GuideRoutes = router;
