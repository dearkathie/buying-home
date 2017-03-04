$(document).ready(function() {

    var url = "http://partnerapi.funda.nl/feeds/Aanbod.svc/json/detail/005e7c1d6f6c4f9bacac16760286e3cd/koop/17514cba-f712-428c-936b-ce336861d7c3/"
    fetch(url)
        .then((response) => {
            response.json().then((data) => {
                $("#broker").html(data.Makelaar);
                $("#phone").html(data.MakelaarTelefoon);
                var  description = data.VolledigeOmschrijving;

                if (description.length > 500) {
                   var newText = description.substring(0, 500) + '\.\.\.';
                  $("#full-description").html(newText);
                } else {
                  $("#full-description").html(description);
                }

                document.getElementById("main-photo").innerHTML = '<img src="' + data.HoofdFoto + '" />';
                data.Kenmerken.forEach(function(item) {
                  var result = item.Kenmerken.map(function(a) {return a.Naam + a.Waarde;});
                  var kenmerkenData = document.getElementById("kenmerken");
                  kenmerkenData.innerHTML = kenmerkenData.innerHTML  + item.Titel + result+"<br>";




                    // var stuffData = document.getElementById("stuff");
                    // stuffData.innerHTML = stuffData.innerHTML + result;

                });
            });
        });

});
