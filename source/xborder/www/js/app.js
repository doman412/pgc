var app = {
    views: {},
    models: {},
    routers: {},
    utils: {},
    adapters: {}
};

function onSuccess(pos) {

//	app.position = {coords:{latitude:"latitude",longitude:"longitude"}};
//    console.log('geo');
//    console.log(pos);
	app.homeView.geo(pos);

    app.homeView.fetchAds();
	
}

function onError(err) {

//	app.position = {coords:{latitude:"ERR",longitude:"ERR"}};
    alert("Could not obtain GPS Location");
	console.log("ERR");
}

$(function() {
    FastClick.attach(document.body);
//    document.addEventListener("backbutton", function(event){
//        app.router.backPressed(event)
////        console.log('back');
////        alert('back');
//    }, false);
    
});



function tfWin() {
       
}

function tfFail() {
}

function doPlatform(){
    if(device.platform == 'iOS'){
//        StatusBar.overlaysWebView(false);
//        $('body').css('margin-top','20px').css('height','-=20px');
//        $('body').css('height','-=20px');
        $('body').css('border-top-style','solid').css('border-width','20px').css('height','-=20px');
    }
    app.uuid = device.uuid;
}

function readyToGo(){
    
    
    
    tpl.loadTemplates([ 'HomeView','AdModelView','SubscriberPageViewTemplate','ExploreViewTemplate',
                        'CityView','AdRedemptionPageViewTemplate','QRModelViewTemplate','DoormanViewTemplate'],
    function() {
//        var tf = new TestFlight();
//        if(device.platform == 'iOS'){
//            tf.takeOff(tfWin,tfFail,'f50f5724-15d5-4190-a357-02e4d7bbd76b');   
//        } else if(device.platform == 'Android') {
//            tf.takeOff(tfWin,tfFail,'7da041f2-0d7f-44db-a5bd-be70ad7e7d4b');
//        }
        
//        app.position = {coords:{latitude:"lat",longitude:"long"}};

        app.uuid = "123456789";

        app.domainRoot = "http://www.clitter.net";
        app.domain = app.domainRoot+"/index.php";
        app.city = new app.models.City({name:"Montreal"});
//        console.log(app.city.get('name'));

        // get the gps location
        

        doPlatform();

        app.router = new app.routers.AppRouter();
        Backbone.history.start();

    });
}

function splash(){
    
    var myDiv = document.getElementById("splash");

    var taco;
    var show = function(){
        myDiv.style.display = "block";
        taco = setInterval(hide, 2500);
//        taco = setInterval(hide, 1);
        //setTimeout(hide(), 5000);  // 5 seconds
        
    }

    var hide = function(){
        myDiv.style.display = "none";
        clearInterval(taco);
        readyToGo();
    }

    show();
}

//$(document).on("ready", splash);
$(document).on("deviceready", splash); 



