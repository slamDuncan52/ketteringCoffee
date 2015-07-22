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
tunnelCli = tunnel(3001, {
        subdomain: "ketteringcoffee"
}, function(err, tunnelCli) {
        var server = http.listen(3001, function() {
                console.log(tunnelCli.url);
                console.log("Server started at: " + tunnelCli.url);
        });
});

//Handle Requests
http.get('/', function(req, res) {
        res.redirect("/home.html");
});

http.post('/home', function(req, res) {
        var sanitizedCoffee = -1;
        req.body.setCoffee = parseInt(req.body.setCoffee);
        if (req.body.setCoffee === 1) {
                sanitizedCoffee = 1;
        } else if (req.body.setCoffee === 0) {
                sanitizedCoffee = 0;
        }
        doCoffee(sanitizedCoffee, function(status) {
                res.send(status);
        });
});

//Coffee Function
function doCoffee(highLow, cb) {
        /*       gpio.open(cPin, "output", function(err) {
                       gpio.write(cPin, highLow, function() {
                               gpio.close(cPin);
                       });
               });*/
        if (highLow === 1) {
                console.log("YES!");
                cb("Successful on");
        } else if (highLow === 0) {
                console.log("NO!");
                cb("Successful off");
        } else {
                console.log("WHAT?");
                cb("Unsuccessful");
        }
}
