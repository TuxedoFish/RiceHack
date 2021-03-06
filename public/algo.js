var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$(document).ready(function() {
	setInterval(updateUI, 500);
});

function updateUI() {
	var url = '/data/getdata/';
	$.getJSON(url, function(data) {
		console.log("loaded : " + data["posts"].length + " data points")

		$("#main").empty();

	    for(var i=0; i<data["posts"].length; i++) {
	    	var x = data["posts"][i];

		    var markup = "<tr><td>" + x["name"] + "</td><td>" + parseFloat(Math.round(x["cost"] * 100) / 100).toFixed(2) + "</td><td>" + x["country"] + "</td>"
		    				+ "<td>" + x["amount"] + "</td><td>" + x["shipping"] + "</td><td>" + x["quality"] + "</td></tr>";
		    $("#main").append(markup);
	    }
	});
}

function grabQuote() {
	input = $("#quoteinput").val();
	console.log("input : " + input);

	var url = '/data/getdata/';
	$.getJSON(url, function(data) {
		totprices=[];
		amounts=[];

	    for(var i=0; i<data["posts"].length; i++) {
	    	var x = data["posts"][i];

	    	var total = (x["amount"] * x["cost"]) + x["shipping"];
	    	var amount = x["amount"];

	    	totprices.push(total);
	    	amounts.push(amount);
	    }

	    mTotal = 0;
	    mAmount = 0;

	    while(mAmount + 99<input) {
	    	if(mAmount+amounts[0] <= input) {
		    	mBest = totprices[0]/amounts[0];
		    	indexTA = 0;
		    } else {
		    	mBest = 0;
		    	indexTA = -1;
		    }

		    for(var i=1; i<totprices.length; i++) {
		    	var ratio = totprices[i]/amounts[i];
		    	if((ratio<mBest || indexTA==-1) && mAmount+amounts[i] <= input) {
		    		mBest = ratio;
		    		indexTA = i;
		    	}
		    }

		    console.log("index : " + indexTA);

		    //awful awful hardcoded bit
		    if(indexTA == -1) {
		    	var started = false;

		    	for(var i=0; i<totprices.length; i++) {
			    	var ratio = totprices[i]/amounts[i];
			    	if((ratio<mBest || started===false) && mAmount+amounts[i] <= input + 100) {
			    		mBest = ratio;
			    		indexTA = i;
			    		started = true;
			    	}
		    	}
		    }

		    if(indexTA==-1) { console.log("ERROR"); }

			mTotal += totprices[indexTA];
			mAmount += amounts[indexTA];
			totprices.splice(indexTA, 1);
			amounts.splice(indexTA, 1);

			console.log("mTotal : " + mAmount);
		}

		var text = mAmount + " at " + parseFloat(Math.round(mTotal * 100) / 100).toFixed(2);
		console.log(text);
		$("#quote").text(text);
	});
}

