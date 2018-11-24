//Set Up Project
var express = require('express');
var app = express();
var randomstring = require("randomstring");
const util = require('util');
var moment = require('moment');
const nodeRequest = require('request');
var admin = require('firebase-admin');

//Required constants for Database
const client_id = process.env.OAUTH_CLIENT_ID;
const client_secret = process.env.OAUTH_CLIENT_SECRET;
var db;

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
	db = admin.firestore();
}

function addDummyData() {
	db.collection("STOCK").doc("2411183204").set(generateFakeData());
}

function generateFakeData() {
	return {"name": "Fillipo",
			"location": "Indonesia"};
}