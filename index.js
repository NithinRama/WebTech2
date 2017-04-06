var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("WT-2 app");
}
);
app.listen(3000, function(){
    console.log("node app is running on 3000");
})