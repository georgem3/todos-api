var express = require("express"),
	bodyParser = require("body-parser"),
	app = express(),
	port = process.env.PORT || 4444;

var apiRoutes = require("./routes/todos");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/", function(req, res) {
	res.sendFile("index.html");
});

app.use("/api/todos", apiRoutes);

app.listen(port, function() {
	console.log("listening on", port);
});