getTripData = function(user,trip, returnFunction) {
    var url = "/user/" + user + "/trip/" + trip;
    $.getJSON(url)
        .done(returnFunction);
}

function getDashboardData(user, returnFunction) {
    var url = "/user/" + user;
    $.getJSON(url)
        .done(returnFunction);
}

getAllTripsData = function(user, returnFunction) {
    var url = "/user/" + user + "/trip";
    $.getJSON(url)
        .done(returnFunction);
}

