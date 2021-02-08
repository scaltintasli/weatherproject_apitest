const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
});


app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "03a039e131a4394d91a74fa9634f7e7d";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      var imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The tempeture in " + query +" is " + temp +"</h1>" +
    "<h1>The weather is currently " + desc + "</h1>");
      res.write("<img src="+ imgurl + ">");
      res.send();

    });
  });
});




app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
