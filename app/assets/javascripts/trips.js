Trips = new function(){
   var these = this;

    these.renderTable = function(table){
        var returnFunction = function(result){
            result.forEach(function(element){
                console.log(element)
                if(element.rating_overall === 0){
                    var circle = "<div class='circleGreen'/>";
                } else if(element.rating_overall === 1){
                    var circle = "<div class='circleYellow'/>";
                }else if(element.rating_overall === 2){
                    var circle = "<div class='circleRed'/>";
                }

                var row = "<tr><td>" + element.id + "</td><td><a href='trip_detail.html?id=" + element.id + "'>" +
                    element.name + "</a></td><td>" + element.started + "</td><td>" + circle + "</td></tr>";

														console.log(element);
                    element.created_at + "</a></td><td>" + circle + "</td></tr>";
                table.append(row)
            });
        };

        new requests().getAllTripsData("1",returnFunction);
    };

    these.getParameterByName = function(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };

    these.renderDetail = function (tripId, title, timestamp, rpmCanvas, accCanvas, breakCanvas, accSideCanvas) {
        var returnFunction = function(result){
            console.log(result)
            ChartPlot.plot(rpmCanvas, result.rpm.mean, "RPM", " ");
            ChartPlot.plot(accCanvas, result.acc.mean, "Acceleration", " ");
            ChartPlot.plot(breakCanvas, result.break.mean, "Break", " ");
            ChartPlot.plot(accSideCanvas, result.accSide.mean, "Side acceleration", " ");
        };

        new requests().getTripData("1",tripId,returnFunction);
    };

};