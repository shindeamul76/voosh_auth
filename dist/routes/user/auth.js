"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
require("@voosh/lib/service-providers/google");
require("@voosh/lib/service-providers/twitter");
const router = express_1.default.Router();
/* Google Authentication */
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/_health');
});
/* Twitter Authentication */
router.get('/twitter', passport_1.default.authenticate('twitter'));
router.get('/twitter/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/_health');
});
/* Logout Session */
router.get('/logout', (req, res) => {
    req.logout(() => { });
    res.redirect('/');
});
exports.default = router;
