/**
	* Created by severin on 17.09.16.
	*/


ChartPlot = new function () {
		var these = this

		these.plot = function (canvas, value, title, description) {
				var yourValue = value;
				var context = canvas;

				var barChartData = {
						labels: ["", description, ""],
						datasets: [{
								label: "Your trip",
								//new option, type will default to bar as that what is used to create the scale
								type: "line",
								fillColor: "rgba(240, 0, 184, 1)",//"rgba(220,220,220,0.2)",
								strokeColor: "rgba(240, 0, 184, 1)",// "rgba(220,220,220,1)",
								pointColor: "rgba(240, 0, 184, 1)",// "rgba(220,220,220,1)",
								pointStrokeColor: "rgba(240, 0, 184, 1)",//"rgba(80, 168, 215, 0.69)",//"#fff",
								pointHighlightFill: "rgba(240, 0, 184, 1)",//"#fff",
								pointHighlightStroke: "rgba(240, 0, 184, 1)",//"rgba(220,220,220,1)",
								backgroundColor: "rgba(54, 162, 235, 0.2)",
								data: [yourValue, yourValue, yourValue]
						}, {
								label: 'Gentle',
								backgroundColor: "rgba(161, 255, 66, 1)",
								data: [0, 22, 0]
						}, {
								label: 'Average',
								backgroundColor: "rgba(255, 206, 86, 1)",
								data: [0, 10, 0]
						}, {
								label: 'Agressiv',
								backgroundColor: "rgba(255, 99, 132, 1)",
								data: [0, 20, 0]
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
		};


};