const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true }))

app.get("/", function(req, res) {
   res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    // console.log(req.body.cityName);

    const query = req.body.cityName;
    const apiKey = "6ecb497d0e90c91c767bfd6656137866";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ units;
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            // console.log(data); hexadecimal code ajaiga

            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const urlImage = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>Temp of " + query + " " + temp + "<h1>");
            res.write("<img src=" + urlImage +">");
            res.send();

            // const object = {
            //     name: "param",
            //     age: "20"
            // }

            // console.log(JSON.stringify(object));
        });
    });
});

// const query = "India";
// const apiKey = "6ecb497d0e90c91c767bfd6656137866";
// const units = "metric";
// const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ units +"";
// https.get(url, function(response) {
//     console.log(response.statusCode);

//     response.on("data", function(data) {
//         // console.log(data); hexadecimal code ajaiga

//         const weatherData = JSON.parse(data);
//         // console.log(weatherData);
//         const temp = weatherData.main.temp;
//         const icon = weatherData.weather[0].icon;
//         const urlImage = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
//         res.write("<h1>India's Temp " + temp + "<h1>");
//         res.write("<img src=" + urlImage +">");
//         res.send();

//     //     const object = {
//     //         name: "param",
//     //         age: "20"
//     //     }

//     // console.log(JSON.stringify(object));
//     });
// });

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});