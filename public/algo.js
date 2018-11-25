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

function grabQuote(input) {
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

	    mBest = totprices[0]/amounts[0];
	    indexTA = 0;

	    while(mTotal<input) {
		    for(var i=1; i<totprices.length; i++) {
		    	var ratio = totprices[i]/amounts[i];
		    	if(ratio<mBest) {
		    		mBest = ratio;
		    		indexTA = i;
		    	}
		    }

			mTotal += totprices[indexTA];
			mAmount += amounts[indexTA];
			array.splice(indexTA, 1);
		}

		$("#quote").html(mAmount + " at : " + mTotal);
	});
}

