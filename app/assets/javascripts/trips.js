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
              started: "2016-09-01T16:06:04.000"
          }, {
              id: 2,
              name: "meintitel2",
              started: "2016-09-01T16:26:10.000"
          },
      ]
        return journeys
    };

    these.renderTable = function(table){
        var journeys = these.getJourneys();
        journeys.forEach(function(element){
            var row = "<tr><td>" + element.id + "</td><td><a href='trip_detail.html?id=" + element.id + "'>" + element.name + "</a></td><td>" + element.started + "</td>"
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
    these.renderDetail = function (tripId, rpmCanvas, accCanvas, breakCanvas, accSideCanvas) {
        var details = these.getTripDetails(tripId);
        ChartPlot.plot(rpmCanvas, details.rpm.mean, "RPM", " ");
        ChartPlot.plot(accCanvas, details.acc.mean, "Acceleration", " ");
        ChartPlot.plot(breakCanvas, details.break.mean, "Break", " ");
        ChartPlot.plot(accSideCanvas, details.accSide.mean, "Side acceleration", " ");
    };

};