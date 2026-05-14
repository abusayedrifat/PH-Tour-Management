import { NextFunction, Request, Response, Router } from "express";
import { AuthControllers } from "./auth.controller";
import { Role } from "../user/user.interface";
import { checkAuthorization } from "../../middlewares/checkAuthorization";
import passport from "passport";
import { envVars } from "../../config/env";

const router = Router();

router.post("/login", AuthControllers.credentialsLogIn);
router.post("/refresh-token", AuthControllers.getNewAccessToken);
router.post("/logout", AuthControllers.logout);
router.post(
  "/change-password",
  checkAuthorization(...Object.values(Role)),
  AuthControllers.changePassword,
);
router.post(
  "/resetPassword",
  checkAuthorization(...Object.values(Role)),
  AuthControllers.resetPassword,
);
router.post(
  "/setPassword",
  checkAuthorization(...Object.values(Role)),
  AuthControllers.setPassword,
);

router.get(
  "/google",
  async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/";
    passport.authenticate("google", {
      scope: ["profile", "email"],
      state: redirect as string,
    })(req, res, next);
  },
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${envVars.FRONTEND_URL}/login?error=There is something issues with your account.Please contact with our support team` }),
  AuthControllers.googleCallBackController,
);

export const AuthRoutes = router;
