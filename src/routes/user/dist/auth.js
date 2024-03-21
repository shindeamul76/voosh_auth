"use strict";
exports.__esModule = true;
var express_1 = require("express");
var passport_1 = require("passport");
require("@voosh/lib/service-providers/google");
require("@voosh/lib/service-providers/twitter");
var router = express_1["default"].Router();
/* Google Authentication */
router.get('/google', passport_1["default"].authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport_1["default"].authenticate('google', { failureRedirect: '/' }), function (req, res) {
    res.redirect('/success');
});
/* Twitter Authentication */
router.get('/twitter', passport_1["default"].authenticate('twitter'));
router.get('/twitter/callback', passport_1["default"].authenticate('google', { failureRedirect: '/' }), function (req, res) {
    res.redirect('/success');
});
/* Logout Session */
router.get('/logout', function (req, res) {
    req.logout(function () { });
    res.redirect('/');
});
exports["default"] = router;
