// there's some StackOverflow code for using Google Map (at least I'm honest)
var geocoder;
var map;
var address = "Bruinvisstraat 73";

function initialize() {
    geocoder = new google.maps.Geocoder();
    var myOptions = {
        zoom: 14,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        navigationControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                    map.setCenter(results[0].geometry.location);

                    var marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map,
                        title: address
                    });
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map, marker);
                    });

                } else {
                    alert("No results found");
                }
            }
        });
    }
}
google.maps.event.addDomListener(window, 'load', initialize);
