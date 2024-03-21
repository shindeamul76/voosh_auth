"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_twitter_1 = require("passport-twitter");
const passport_1 = __importDefault(require("passport"));
const create_user_controller_1 = require("@voosh/controllers/user/create-user-controller");
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.use(new passport_twitter_1.Strategy({
    consumerKey: "zwfGjILS0DVbQ5IDfkejxB5Pv",
    consumerSecret: "9yHoaG733GPpb3iEVdueFREB0tDNGNCPTkKBjNV066OweELZav",
    callbackURL: "http://localhost:8080/auth/twitter/callback",
    passReqToCallback: true
}, function (request, accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(profile, "profile");
        if (profile.emails) {
            try {
                let user = yield (0, create_user_controller_1.CreateUser)(profile, accessToken, refreshToken);
                done(null, user);
            }
            catch (error) {
                done(error, false);
            }
        }
    });
}));
