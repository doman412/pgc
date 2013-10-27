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
    console.log('function!!');
    document.addEventListener("backbutton", function(event){
        app.router.backPressed(event)
//        console.log('back');
//        alert('back');
    }, false);

});

function readyToGo(){
    tpl.loadTemplates([ 'HomeView','AdModelView','SubscriberPageViewTemplate','ExploreViewTemplate',
                        'CityView','AdRedemptionPageViewTemplate','QRModelViewTemplate','DoormanViewTemplate'],
    function() {

        app.position = {coords:{latitude:"lat",longitude:"long"}};

        app.uuid = "123456789";
//        app.uuid = device.uuid;

        app.domainRoot = "http://www.makowaredev.com";
        app.domain = app.domainRoot+"/index.php";
        app.city = new app.models.City({location:"Montreal"});
//        console.log(app.city.get('name'));

        // get the gps location
//        navigator.geolocation.getCurrentPosition(onSuccess, onError);



        app.router = new app.routers.AppRouter();
        Backbone.history.start();

    });
}

function splash(){
    
    var myDiv = document.getElementById("splash");

    var taco;
    var show = function(){
      myDiv.style.display = "block";
        console.log("before timeout");
       taco = setInterval(hide, 2000);
        //setTimeout(hide(), 5000);  // 5 seconds
        console.log("after timeout");
        
    }

    var hide = function(){
      myDiv.style.display = "none";
        clearInterval(taco);
        console.log("in hide");
        readyToGo();
    }

    show();
}

//$(document).on("ready", splash);
$(document).on("deviceready", splash); 



