var express = require("express");
var app = express();
const Wreck = require('wreck')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var FacebookStrategy = require('passport-facebook').Strategy;

app.use(express.static("wwwroot"));

app.get("/", function(req, res){
    res.redirect("/index.html");
    res.end();
}
);

app.listen(3000, function(){
    console.log("node app is running on 3000");
});