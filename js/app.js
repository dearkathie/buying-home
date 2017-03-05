$(document).ready(function() {

    var url = "http://partnerapi.funda.nl/feeds/Aanbod.svc/json/detail/005e7c1d6f6c4f9bacac16760286e3cd/koop/17514cba-f712-428c-936b-ce336861d7c3/"
    fetch(url)
        .then((response) => {
            response.json().then((data) => {
                $("#broker").html(data.Makelaar);
                $("#phone").html(data.MakelaarTelefoon);
                document.getElementById("main-photo").innerHTML = '<img src="' + data.HoofdFoto + '" />';



                $("#description").html(data.VolledigeOmschrijving);

                // making lenght of property descriptional optional
                var minimized_elements = $('#description');

                minimized_elements.each(function() {
                    var t = $(this).text();
                    if (t.length < 500) return;

                    $(this).html(
                        t.slice(0, 500) + '<span>... </span><a href="#" class="more">Read more</a>' +
                        '<span style="display:none;">' + t.slice(500, t.length) + ' <a href="#" class="less">Read less</a></span>'
                    );

                });

                $('a.more', minimized_elements).click(function(event) {
                    event.preventDefault();
                    $(this).hide().prev().hide();
                    $(this).next().show();
                });

                $('a.less', minimized_elements).click(function(event) {
                    event.preventDefault();
                    $(this).parent().hide().prev().show().prev().show();
                });

                // create list with property description
                data.Kenmerken.forEach(function(item) {
                    var kenmerkenName = item.Kenmerken.map(function(a) {
                        return "<dt>" + a.Naam + "</dt>" + "<dd>" + a.Waarde + "</dd>";
                    });

                    var nameListDl = document.createElement("dl");
                    var nameList = document.createTextNode(item.Titel);
                    nameListDl.appendChild(nameList)

                    $("#list-header").append(nameListDl).append(kenmerkenName)
                });
            });
        });

});
