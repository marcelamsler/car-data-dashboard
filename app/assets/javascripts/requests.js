
function requests(){
    var these = this;

    these.getTripData = function(user,trip, returnFunction) {
        var url = "/user/" + user + "/trip/" + trip;
        $.getJSON(url)
            .done(returnFunction);
    };

    these.getDashboardData = function (user, returnFunction) {
        var url = "/user/" + user;
        $.getJSON(url)
            .done(returnFunction);
    };


    these.getAllTripsData = function(user, returnFunction) {
        var url = "/user/" + user + "/trip";
        $.getJSON(url)
            .done(returnFunction);
    };
}









