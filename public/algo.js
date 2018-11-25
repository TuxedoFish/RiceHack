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

		$("#farmers main").empty();

	    for(var i=0; i<data["posts"].length; i++) {
	    	var x = data["posts"][i];

		    var markup = "<tr><td>" + x["name"] + "</td><td>" + x["cost"] + "</td><td>" + x["country"] + "</td>"
		    				+ "<td>" + x["amount"] + "</td><td>" + x["shipping"] + "</td><td>" + x["quality"] + "</td></tr>";
		    $("#farmers man").append(markup);
	    }
	});
}