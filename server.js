//Set Up Project
var express = require('express');
var app = express();
var admin = require('firebase-admin');
var randomstring = require("randomstring");
const util = require('util');
var moment = require('moment');
const nodeRequest = require('request');

//Database
var db;
var NO_CUSTOMERS = 10;
var NAMES = ["Susilo", "Albertus", "Abdurrahman", "Soetomo", "Boedino", "Ranomi"];
var json = { "posts":[] };
//Start up firestore
initFirebase();
//Add a sample piece of info
for(var i=0; i<NO_CUSTOMERS; i++) { addDummyData(); } 
//Load the current stock
updateJson();

//Takes the user to the index page
app.use(express.static('public'));
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

function initFirebase() {
	//initialises a firebase app with the credential
	admin.initializeApp({
	  credential: admin.credential.cert({
	    "private_key": JSON.parse(process.env.FIREBASE_PRIVATE_KEY)["key"],
	    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
	    "project_id": process.env.FIREBASE_PROJECT_ID,
	    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID
	  }),
	  databaseURL: "https://socialapp-575bc.firebaseio.com"
	});

	admin.firestore().settings( { timestampsInSnapshots: true })
	db = admin.firestore();
}

function addDummyData() {
	db.collection("STOCK").doc(randomstring.generate()).set(generateFakeData());
}

function generateFakeData() {
	return {"name": NAMES[Math.floor(Math.random() * 5)],
			"country": "Indonesia",
			"amount":  ((Math.floor(Math.random() * 5)+1) * 100),
			"quality": Math.floor(Math.random() * 5) + 1,
			"shipping": Math.round(Math.random() * 100) / 10,
			"cost": Math.round(Math.random() * 100)/100 + 2
		};
}

app.get("/data/getdata/", function(request, response) {
	response.send(JSON.stringify(json));
});

function updateJson() {
	var query = db.collection('STOCK').orderBy('quality', 'desc').limit(50);

	query.get().then(snapshot => {
	    snapshot.forEach(doc => {
	    	console.log("one more stock added");
		 	json.push({"amount": post.get("amount"), "cost": post.get("cost"),
		  		"country": post.get("country"), "name": post.get("name"), 
		  		"quality": post.get("quality"), "shipping": post.get("shipping")});
	    });
	})
	.catch(err => {
		console.log('Error getting documents', err);
	});
}

//Listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});