$(document).ready(function() {
        $("#coffeeOn").click(function() {
                $.post("home.html", {
                                setCoffee: 1,
                        },
                        function(data, status) {
                                alert("Data: " + data + "\nStatus: " + status);
                        });
        });
        $("#coffeeOff").click(function() {
                $.post("home.html", {
                                setCoffee: 0,
                        },
                        function(data, status) {
                                alert("Data: " + data + "\nStatus: " + status);
                        });
        });
});
