//Set Up Project
var express = require('express');
var app = express();
var admin = require('firebase-admin');

//Database
var db;
//Start up firestore
initFirebase();
//Add a sample piece of info
addDummyData();

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
	db.collection("STOCK").doc("2411183204").set(generateFakeData());
}

function generateFakeData() {
	return {"name": "Fillipo",
			"location": "Indonesia"};
}

//Listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});