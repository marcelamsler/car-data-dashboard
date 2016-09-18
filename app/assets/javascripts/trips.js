Trips = new function () {
		var these = this;

		these.renderTable = function (table) {
				var returnFunction = function (result) {
						result = result.sort(function (a, b) {
								return new Date(b.recorded_at) - new Date(a.recorded_at);
						});
						result.forEach(function (element) {
								if (element.rating_overall === 0) {
										var circle = "<div class='circleGreen'/>";
								} else if (element.rating_overall === 1) {
										var circle = "<div class='circleYellow'/>";
								} else if (element.rating_overall === 2) {
										var circle = "<div class='circleRed'/>";
								}

								var date = new Date(element.recorded_at);

								var day = date.getDate();
								var monthIndex = date.getMonth();
								var year = date.getFullYear();


								var formattedDate = day + '.' + (monthIndex + 1) + '.' + year;

								var row = "<tr><td>" + formattedDate + "</td><td>" +
												getHtml(element.engine_cond) + "</a></td><td>" + getHtml(element.brake_cond, false) + "</td><td>" + getHtml(element.chassis_cond) + "</td><td>" + getHtml(element.overall_cond, true) + "</td></tr>";

								element.created_at + "</a></td><td>" + circle + "</td></tr>";
								table.append(row);
						});
				};

				new requests().getAllTripsData("1", returnFunction);
		};

		these.getParameterByName = function (name) {
				var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
				return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
		};

		these.renderDetail = function (tripId, title, timestamp, rpmCanvas, accCanvas, breakCanvas, accSideCanvas) {
				var returnFunction = function (result) {
						ChartPlot.plot(rpmCanvas, result.rpm.mean, "RPM", " ");
						ChartPlot.plot(accCanvas, result.acc.mean, "Acceleration", " ");
						ChartPlot.plot(breakCanvas, result.break.mean, "Break", " ");
						ChartPlot.plot(accSideCanvas, result.accSide.mean, "Side acceleration", " ");
				};

				new requests().getTripData("1", tripId, returnFunction);
		};

		function getHtml(cond, big) {
				if (big) {
						return "<div class='circle-" + cond + " big '/>"
				} else {
						return "<div class='circle-" + cond + "'/>"
				}
		}

};