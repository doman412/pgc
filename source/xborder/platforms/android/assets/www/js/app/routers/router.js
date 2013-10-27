app.routers.AppRouter = Backbone.Router.extend({

    routes: {
        "": "home",
        "subscriber/:name": "subscriber",
        "explore":"explore",
        "redeem":"redemption"
    },

    initialize: function () {
        app.slider = new PageSlider($('body'));

    },

    home: function () {
        // Since the home view never changes, we instantiate it and render it only once
        if (!app.homeView) {
            app.homeView = new app.views.HomeView();
//            app.homeView.render();
//            app.homeView.render();
        } else {
//            console.log('reusing home view');
//            app.homeView.delegateEvents(); // delegate events when the view is recycled
        }
        app.homeView.fetchAds();
        app.slider.slidePage(app.homeView.render().$el);
    },

    subscriber:function(id){
        var sub = new app.models.SubscriberPage({subscriberID:id});
        sub.set('subscriberID',id);
//        sub.subscriberID = id;

        // Would do sub.fetch(); after setting the sub id.
//        Backbone.sync = function(method, model){
//            console.log("sync "+model.url());
//        }
        sub.fetch({
//            wait: true,
            success: function(model, response, options) {
                console.log("subscriber fetch success!");
//                console.log(model);
                sub.updateImageURI();
//                console.log(response);
            },
            error: function(model, response, options) {
                console.log('An error occured while fetching the data...');
            }
        });

        sub.col.url = function(){
            return app.domain+"/api/ads/subscriberID/"+id;
        };

        sub.col.fetch({
//            wait: true,
            success: function(model, response, options) {
                console.log("subscriber ads fetch success!");
            },
            error: function(model, response, options) {
                console.log('An error occured while fetching the data...');
            }
        });

        // Can do same as home function if needed. cache instance of page
        // and view and use .set to acquire info.

        app.slider.slidePage(new app.views.SubscriberPageView({model: sub}).render().$el);
    },

    explore:function(){
        if(!app.exploreView){
//            console.log("new explore view");
            app.exploreView = new app.views.ExploreView();
//            app.exploreView.render();
        } else {
//            console.log("reuse explore view");
//            app.exploreView.delegateEvents();
        }
        app.slider.slidePage(app.exploreView.render().$el);
    },

    redemption:function(){


        var a = new app.views.AdRedemptionPageView({model:app.ad});

//        console.log(app.ad);

        app.slider.slidePage(a.render().$el);
    },


    backPressed:function(event) {
        console.log("back pressed: "+event);
        alert(event);
    }

});