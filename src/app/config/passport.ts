import bcrypt from "bcryptjs";
/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import { envVars } from "./env";
import {
    Strategy as GoogleStrategy,
    Profile,
    VerifyCallback,
} from "passport-google-oauth20";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";
import { Strategy as localStrategy } from "passport-local";


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
                    return done(null, false, { message: "user doesn't exists" });
                }

                const isGoogleAuthenticated = isUserExists.auths.some(providerObjects=> providerObjects.provider == "google")

                if (isGoogleAuthenticated && !isUserExists.password) {
                    return done(null, false, {message:" You authenticated with google log in. if u want to login with credentials then logIn with google and set ur password"})
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

                let user = await User.findOne({ email });

                if (!user) {
                    user = await User.create({
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

                return done(null, user);
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
