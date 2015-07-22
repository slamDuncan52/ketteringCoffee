/*----Requires----*/
var express = require('express');
var parser = require('body-parser');
var tunnel = require('localtunnel');
//var gpio = require('pi-gpio');

/*----Global Vars----*/
var http = express();
var tunnelCli;
var cPin = 16; //For now
//Simplify accessing requests
http.use(parser.json());
http.use(parser.urlencoded({
        extended: true
}));
http.use(express.static('page'));

//Start Server!!!
tunnelCli = tunnel(7542, {
        subdomain: "ketteringcoffee"
}, function(err, tunnelCli) {
        var server = http.listen(7542, function() {
                console.log(tunnelCli.url);
                console.log("Server started at: " + tunnelCli.url);
        });
});

//Handle Requests
http.get('/', function(req, res) {
        res.redirect("/home.html");
});

http.post('home.html', function(req, res) {
        if (res.setCoffee === 1) {
                doCoffee(1);
        } else if (res.setCoffee === 0) {
                doCoffee(0);
        }
});

//Coffee Function
function doCoffee(highLow) {
        /*       gpio.open(cPin, "output", function(err) {
                       gpio.write(cPin, highLow, function() {
                               gpio.close(cPin);
                       });
               });*/
        if (highLow) {
                console.log("YES!");
        } else {
                console.log("NO!");
        }
}
