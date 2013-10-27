app.views.AdModelView = Backbone.View.extend({

	tagName:'li',

	events: {
        "click div":"alert"
    },
    
    
    initialize: function() {
    	_.bindAll(this,'alert');
    	this.template = _.template(tpl.get("AdModelView"));
    	this.model.on("change",this.render,this);
//        this.model.on('add',this.update);
//		this.model.bind('all',this.render,this);
    },

    render: function () {
//class="topcoat-list__item" id="ad"
        this.delegateEvents();
        this.$el.attr("class","topcoat-list__item");
        this.$el.attr("id","ad");
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    update:function(){
        this.model.update();
        this.render();
    },

  	alert: function(event){
//   		alert(this.model.get("name"));
        console.log("click to "+this.model.get('subscriberID'));
        window.location = "#subscriber/"+this.model.get('subscriberID');
//        app.router.navigate("#subscriber/"+this.model.get('subscriberID'),{trigger:true});
//        app.slider.slidePage(new app.views.SubscriberPageView().render().el);
//        this.undelegateEvents();
   	}

   //  back: function(event) {
//         window.history.back();
//         return false;
//     }

});