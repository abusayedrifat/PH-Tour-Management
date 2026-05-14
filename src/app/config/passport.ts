/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcryptjs";
import passport from "passport";
import { envVars } from "./env";
import {
    Strategy as GoogleStrategy,
    Profile,
    VerifyCallback,
} from "passport-google-oauth20";
import { User } from "../modules/user/user.model";
import { IsActive, Role } from "../modules/user/user.interface";
import { Strategy as localStrategy } from "passport-local";

//todo ================== credentials logIn ========================
passport.use(
    new localStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email: string, password: string, done) => {

            const isUserExists = await User.findOne({ email });

            try {
                if (!isUserExists) {
                    return done(null, false, { message: "This user doesn't exists" });
                }
                if (!isUserExists.isVarified) {
                    return done(null, false, { message: "This user is not verified" })
                }

                if (
                    isUserExists.isActive === IsActive.BLOCKED ||
                    isUserExists.isActive === IsActive.INACTIVE
                ) {
                    return done(null, false, { message: "This user is BLOCKED either INACTIVE" })
                }

                if (isUserExists.isDeleted) {
                    return done(null, false, { message: "This user has been deleted" })
                }

                const isGoogleAuthenticated = isUserExists.auths.some(providerObjects => providerObjects.provider == "google")

                if (isGoogleAuthenticated && !isUserExists.password) {
                    return done(null, false, { message: " You authenticated with google log in. if u want to login with credentials then logIn with google and set ur password" })
                }

                const isPasswordMatched = await bcrypt.compare(
                    password as string,
                    isUserExists.password as string,
                );

                if (!isPasswordMatched) {
                    return done(null, false, { message: "user password doesn't match" });
                }

                return done(null, isUserExists);

            } catch (error) {
                done(error);
            }
        },
    ),
);

//todo=================== google logIn ======================
passport.use(
    new GoogleStrategy(
        {
            clientID: envVars.GOOGLE_CLIENT_ID,
            clientSecret: envVars.GOOGLE_CLIENT_SECRET,
            callbackURL: envVars.GOOGLE_CALLBACK_URL,
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: VerifyCallback,
        ) => {
            try {

                const email = profile.emails?.[0].value;

                if (!email) {
                    return done(null, false, { message: "no email found" });
                }


                let isUserExists = await User.findOne({ email });

               if (isUserExists && !isUserExists.isVarified) {
                    return done(null, false, { message: "This user is not verified" })
                }
                
                if (
                    isUserExists &&
                   ( isUserExists.isActive === IsActive.BLOCKED ||
                    isUserExists.isActive === IsActive.INACTIVE)
                ) {
                    return done(null, false, { message: "This user is BLOCKED either INACTIVE" })
                } 
                
                


                if (isUserExists && isUserExists.isDeleted) {
                    return done(null, false, { message: "This user has been deleted" })
                }

                if (!isUserExists) {
                    isUserExists = await User.create({
                        email,
                        name: profile.displayName,
                        picture: profile.photos?.[0].value,
                        role: Role.USER,
                        // isVarified: true,
                        auths: [
                            {
                                provider: "google",
                                providerId: profile.id,
                            },
                        ],
                    });
                }


                return done(null, isUserExists);
            } catch (error) {
                console.log(error);
                done(error);
            }
        },
    ),
);



passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user._id);
});

passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        console.log(error);
        done(error);
    }
});
