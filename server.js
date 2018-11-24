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

	const firestore = new Firestore();
	const settings = {timestampsInSnapshots: true};
	firestore.settings(settings);

	db = admin.firestore();
}

function addDummyData() {
	db.collection("STOCK").doc("2411183204").set(generateFakeData());
}

function generateFakeData() {
	return {"name": "Fillipo",
			"location": "Indonesia"};
}