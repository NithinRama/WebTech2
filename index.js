var express = require("express");
var app = express();

app.use(express.static("wwwroot"));

app.get("/", function(req, res){
    res.redirect("/index.html");
    res.end();
}
);

app.listen(3000, function(){
    console.log("node app is running on 3000");
})