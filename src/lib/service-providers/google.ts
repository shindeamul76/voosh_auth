import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport, { PassportStatic } from 'passport';
import prisma from '@voosh/lib/prisma'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '@voosh/main/config';
import { User } from '@prisma/client';
import { CreateUser } from '@voosh/controllers/user/create-user-controller';




passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(function (user: User, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback: true
},

    async function (request, accessToken, refreshToken, profile, done) {


        console.log(profile, "profile")
        if (profile.emails) {

            try {
                let user = await CreateUser(profile, accessToken, refreshToken)

                done(null, user);
            } catch (error: any) {
                done(error, false);
            }

        }

    }
));
