"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var http_status_codes_1 = require("http-status-codes");
var express_session_1 = require("express-session");
var passport_1 = require("passport");
var auth_1 = require("@voosh/routes/user/auth");
var user_1 = require("@voosh/routes/user/user");
var app = express_1["default"]();
app.set('view engine', 'ejs');
app.use(express_1.json());
app.use(express_1.urlencoded({ extended: true }));
app.use(express_session_1["default"]({
    secret: 'voosh_auth',
    resave: false,
    saveUninitialized: false
}));
app.use(passport_1["default"].initialize());
app.use(passport_1["default"].session());
app.use(cors_1["default"]());
app.use('/auth', auth_1["default"]);
app.use('/api/v1', user_1["default"]);
app.get('/', function (req, res) {
    res.status(200).json({ message: 'Enhanced Authentication API!' });
});
app.get('/success', function (req, res) {
    res.status(200).json({ message: 'Loggged In Successfully' });
});
app.get('/_health', function (req, res) {
    return res.status(200).json({
        uptime: process.uptime(),
        message: "OK",
        timestamp: Date.now()
    });
});
// Handle 404 errors
app.use('*', function (req, res) {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Endpoint not found',
        data: null
    });
});
exports["default"] = app;
