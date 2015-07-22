$(document).ready(function() {
        $("#coffeeOn").click(function() {
                coffeeSet(1);
        });
        $("#coffeeOff").click(function() {
                coffeeSet(0);
        });

        function coffeeSet(onOff) {
                $.post("/home", {
                        setCoffee: onOff,
                });
        }
});
