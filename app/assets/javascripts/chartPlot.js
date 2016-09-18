/**
	* Created by severin on 17.09.16.
	*/


ChartPlot = new function () {
		var these = this;

		these.plot = function (canvas, value, title, description) {
				var context = canvas;

				var engineState = 0;
				var brakeState = 0;
				var chassisState = 0;

				var data = null;

				new requests().getDashboardData("2", function (response) {
						data = response[0];
						var userEngineValue = data.RPMCar;
						engineState = 100 / data.RPMRedTop * userEngineValue;
						var userBreakValue = data.BrakeCar;
						brakeState =  100 / data.BreakRedTop * userBreakValue;
						var userLatValue = data.LatCar;
						chassisState = 100 / data.LatRedTop * userLatValue;

						$('#engine-progressbar').css('width', engineState);
						$('#brake-progressbar').css('width', brakeState);
						$('#chassis-progressbar').css('width', chassisState);

						console.log(engineState);

						var overAllState = (50 * engineState + 30 * chassisState + 20 * brakeState) / 100;
                        console.log(overAllState);

						var greenTop = (50 * (100 / data.RPMRedTop * (data.RPMGreenTop-1000)) + 30 * (100 / data.BreakRedTop * (data.BreakGreenTop)) + 20 * (100 / data.LatRedTop * (data.LatGreenTop))) / 100;
                        var orangeTop = (50 * (100 / data.RPMRedTop * data.RPMOrangeTop) + 30 * (100 / data.BreakRedTop * data.BreakOrangeTop)+ 20 * (100 / data.LatRedTop * data.LatOrangeTop)) / 100;
						var redTop = (50 * (100 / data.RPMRedTop * data.RPMRedTop) + 30 * (100 / data.BreakRedTop * data.BreakRedTop) + 20 * (100 / data.LatRedTop * data.LatRedTop)) / 100;


						var barChartData = {
								labels: ["", " ", ""],
								datasets: [{
										label: "Your Car Condtion",
										//new option, type will default to bar as that what is used to create the scale
										type: "line",
										fillColor: "rgba(240, 0, 184, 1)",//"rgba(220,220,220,0.2)",
										strokeColor: "rgba(100, 100, 184, 1)",// "rgba(220,220,220,1)",
										pointColor: "rgba(240, 100, 184, 1)",// "rgba(220,220,220,1)",
										pointStrokeColor: "rgba(240, 0, 184, 1)",//"rgba(80, 168, 215, 0.69)",//"#fff",
										pointHighlightFill: "rgba(240, 0, 184, 1)",//"#fff",
										pointHighlightStroke: "rgba(240, 100, 184, 0.2)",//"rgba(220,220,220,1)",
										backgroundColor: "rgba(54, 162, 235, 0.2)",
										data: [overAllState, overAllState, overAllState]
								}, {
										label: 'Gentle',
										backgroundColor: "rgb(26, 187, 156)",
										data: [0, greenTop , 0]
								}, {
										label: 'Average',
										backgroundColor: "rgba(255, 206, 86, 1)",
										data: [0, orangeTop - greenTop, 0]
								}, {
										label: 'Agressiv',
										backgroundColor: "rgba(231, 76, 60, 1)",
										data: [0, redTop - orangeTop, 0]
								}]
						};


						new Chart.Bar(context, {
								type: 'bar',
								data: barChartData,
								options: {
										title: {
												display: true,
												text: title
										},
										tooltips: {
												mode: 'label'
										},
										responsive: false,
										scales: {
												xAxes: [{
														stacked: true
												}],
												yAxes: [{
														stacked: true
												}]
										}

								}
						});
				});
		};


};