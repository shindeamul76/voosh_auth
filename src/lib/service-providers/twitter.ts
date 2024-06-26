import { Strategy as TwitterStrategy } from 'passport-twitter';
import passport, { PassportStatic } from 'passport';
import { User } from '@prisma/client';
import { CreateUser } from '@voosh/controllers/user/create-user-controller';
import { TWITTER_CLIENT_SECRET, TWITTER_CLIENT_ID } from '@voosh/main/config';




passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(function (user: User, done) {
    done(null, user);
});

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CLIENT_ID,
    consumerSecret: TWITTER_CLIENT_SECRET,
    callbackURL: "https://voosh-auth.onrender.com/auth/twitter/callback",
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
