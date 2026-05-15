import { Router } from "express";
import { GuideController } from "./guides.controller";
import { checkAuthorization } from "../../middlewares/checkAuthorization";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { guideApplyZodSchema } from "./guides.validation";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post("/apply",
    checkAuthorization(Role.USER),
    multerUpload.array("files"),
    validateRequest(guideApplyZodSchema),
    GuideController.applyGuides
);

router.get("/",
    checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN),
    GuideController.getALLGuidesApplicants);

router.post("/approve/:id", 
    checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN),
    GuideController.approveAsGuide);


export const GuideRoutes = router;
