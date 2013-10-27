app.views.HomeView = Backbone.View.extend({

// 	var temp = _.template($("#homeview").html());
// 	var t = tpl.get("homeview");
    
// 	template: _.template(tpl.get('HomeView').html()),

//	el: $('div#main'),

	events: {
    	"click a#alert":"onclick"
    },

    initialize: function () {
    	_.bindAll(this, 'render', 'onclick','geo', 'renderAd','fetchAds');
    	this.h = tpl.get("HomeView");

//        Backbone.sync = function(method, model){
//            console.log(method);
//            console.log(model);
//        }

    	this.te = _.template(this.h);

//        temp.id = 2;
//        temp.fetch({
////            wait: true,
//            success: function(model, response, options) {
//                console.log("!");
//                console.log(model);
//                console.log(response);
//                console.log(options);
//
//            },
//            error: function(model, response, options) {
//                console.log('An error occured while fetching the data...');
//            }
//        });


        this.col = new app.models.AdCollection();


        this.col.on("sync",this.render);

//        this.fetchAds();

        // will pull city from storage/explore page after re-choosing.

    },

    fetchAds:function(){
        console.log('fetch ads');
        this.col.fetch({
//            wait: true,
            reset:true,
            success: function(model, response, options) {
//                console.log("!");
//                console.log(model);
//                console.log(response);
//                console.log(options);
//                console.log(response.models);

            },
            error: function(model, response, options) {
                console.log('An error occured while fetching the data...');
            }
        });
    },
    
    geo:function(pos){
//     	console.log(pos);
		this.col.geo(pos);
    },
	
    render: function () {
        console.log("render");
        this.$el.html(this.te({title:"Clitter",city:app.city.get('name')}));
//         var m = new app.models.AdModel({name:"hello"});
//         var v = new app.views.AdModelView({model:m});
//         $('#extra').html(v.render().el);
		var self = this;
		_(this.col.models).each(function(ad){
			self.renderAd(ad);
		},this);
		// _.each(this.col.models, function(item){
// // 			console.log(item);
// // 			console.log($('#extra'));
// 			$('#extra').append(new app.views.AdModelView({model:item}).render().el);
// 		},this);
        return this;
    },
    
    renderAd: function(ad){
    	var view = new app.views.AdModelView({
    			model:ad
    		});
    	
    	$('#extra',this.el).append(view.render().el);
    },


	onclick: function(event){
// 		event.prev
        console.log('click ad');
// 		alert("omg button");
	}

});