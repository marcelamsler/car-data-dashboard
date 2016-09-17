/**
 * Created by severin on 17.09.16.
 */

Trips = new function(){
   var these = this;
    these.getJourneys = function(){
      var journeys = [
          {
              id: 1,
              name: "blaa",
              started: "2016-09-01T16:06:04.000",
              rating: 1 //0=green, 1=yellow, 2=red
          }, {
              id: 2,
              name: "meintitel2",
              started: "2016-09-01T16:26:10.000",
              rating: 0 //0=green, 1=yellow, 2=red
          },
      ]
        return journeys
    };

    these.renderTable = function(table){
        var journeys = these.getJourneys();
        journeys.forEach(function(element){
            if(element.rating === 0){
                var circle = "<div class='circleGreen'/>";
            } else if(element.rating === 1){
                var circle = "<div class='circleYellow'/>";
            }else if(element.rating === 2){
                var circle = "<div class='circleRed'/>";
            }


            var row = "<tr><td>" + element.id + "</td><td><a href='trip_detail.html?id=" + element.id + "'>" +
                element.name + "</a></td><td>" + element.started + "</td><td>" + circle + "</td></tr>";
           table.append(row)
        });
    };
    these.getParameterByName = function(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };
    these.getTripDetails = function(tripId){
        var trip_detail =
            {
                id: tripId,
                name: "blaa",
                started: "2016-09-01T16:06:04.000",
                ended: "2016-09-01T16:07:35.220",

                rpm: {
                    mean: 20,
                    std: 10,
                    med: 21
                },
                acc: {
                    mean: 20,
                    std: 10,
                    med: 21
                },
                break: {
                    mean: 20,
                    std: 10,
                    med: 21
                },
                accSide: {
                    mean: 20,
                    std: 10,
                    med: 21
                }
            };
        return trip_detail;
    };
    these.renderDetail = function (tripId, title, timestamp, rpmCanvas, accCanvas, breakCanvas, accSideCanvas) {
        var details = these.getTripDetails(tripId);
        title.text(details.name);
        timestamp.text(details.started + " - " + details.ended);
        ChartPlot.plot(rpmCanvas, details.rpm.mean, "RPM", " ");
        ChartPlot.plot(accCanvas, details.acc.mean, "Acceleration", " ");
        ChartPlot.plot(breakCanvas, details.break.mean, "Break", " ");
        ChartPlot.plot(accSideCanvas, details.accSide.mean, "Side acceleration", " ");
    };

};