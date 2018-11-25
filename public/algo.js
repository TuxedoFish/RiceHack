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
  var url = '/data/getdata';
  $.getJSON(url, function(data) {
    // console.log(data);
    // if (data["ok"] == true) {
    	console.log(data);
        $('#quotes').html(data["posts"][0]["name"]);
    // }
  });
});