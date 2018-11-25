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
		// var columns = "<th><span class='text'>Farmer</span></th>" +
  //               "<th><span class='text'>Cost</span></th>" +
  //               "<th><span class='text'>Country</span></th>" +
  //               "<th><span class='text'>Amount</span></th>" +
  //               "<th><span class='text'>Shipping</span></th>" +
  //               "<th><span class='text'>Quality</span></th>";

		$("table tbody").remove();

		//$("#farmers tr").append(columns);

	    for(var i=0; i<data["posts"].length; i++) {
	    	var x = data["posts"][i];

		    var markup = "<tr><td>" + x["name"] + "</td><td>" + x["cost"] + "</td><td>" + x["country"] + "</td>"
		    				+ "<td>" + x["amount"] + "</td><td>" + x["shipping"] + "</td><td>" + x["quality"] + "</td></tr>";
		    $("table tbody").append(markup);
	    }
	});
}