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
    consumerKey: "zwfGjILS0DVbQ5IDfkejxB5Pv",
    consumerSecret: "9yHoaG733GPpb3iEVdueFREB0tDNGNCPTkKBjNV066OweELZav",
    callbackURL: "http://localhost:8080/auth/twitter/callback",
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
