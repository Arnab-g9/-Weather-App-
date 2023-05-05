const express = require ("express");
const https = require("https");
const bodyParser=require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
   res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
    // console.log(req.body.cityName);
    console.log("post request received");

const query=req.body.cityName;
const apiKey="597f870b4ff451a566f79247d6806cc2";
const unit = "metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+ apiKey +"&units="+unit;

https.get(url, function(response){
    // console.log(response.statusCode);
    response.on("data",function(data){
       const wheatherdata=JSON.parse(data);
       console.log(wheatherdata);
       const temp=wheatherdata.main.temp;
       console.log(temp);
       const weatherDescription = wheatherdata.weather[0].description;
       console.log(weatherDescription);
       const iconData= wheatherdata.weather[0].icon;
       const iconUrl = "https://openweathermap.org/img/wn/" + iconData +"@2x.png"
       res.write("<p>The weather is currently " +weatherDescription +"</p>");
       
       res.write("<h1>The temperature in " + query + " is "+temp+" degrees Calcius.</h1>");
       res.write("<img src="+iconUrl+">");
       res.send()

    //    console.log(wheatherdata);

//     const object = {
//         name: "Arnab",
//         favouriteFood: "MuttonCurry",
//     }
//    console.log( JSON.stringify(object))
    })
});
// res.send("server is up and runnig");
})








app.listen(3000, function(){
    console.log("server is running on port 3000");
});