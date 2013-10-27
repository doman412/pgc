var app = {
    views: {},
    models: {},
    routers: {},
    utils: {},
    adapters: {}
};

function onSuccess(pos){

	app.position = {coords:{latitude:"latitude",longitude:"longitude"}};

	app.homeView.geo(pos)

	
}

function onError(err){

	app.position = {coords:{latitude:"ERR",longitude:"ERR"}};

	console.log("ERR");
}

$(function() {
    FastClick.attach(document.body);
});

function readyToGo(){
    tpl.loadTemplates(['HomeView','AdModelView','SubscriberPageViewTemplate','ExploreViewTemplate','CityView'], function () {

        app.position = {coords:{latitude:"lat",longitude:"long"}};

        app.domainRoot = "http://24.59.122.101";
        app.domain = app.domainRoot+"/index.php";
        app.city = new app.models.City({name:"Montreal"});
        console.log(app.city.get('name'));

        // get the gps location
//        navigator.geolocation.getCurrentPosition(onSuccess, onError);



        app.router = new app.routers.AppRouter();
        Backbone.history.start();

    });
}

$(document).on("ready", readyToGo);
$(document).on("deviceready", readyToGo);


