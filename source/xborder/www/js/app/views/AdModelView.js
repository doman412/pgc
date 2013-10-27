app.views.AdModelView = Backbone.View.extend({

	tagName:'li',

	events: {
        "click button.topcoat-button--cta.redeem-button":"redeem",
        "click table":"gotoSubscriberPage"

    },


//    blah:{
//        ""
//    },
    
    
    initialize: function() {
    	_.bindAll(this,'gotoSubscriberPage','redeem');
    	this.template = _.template(tpl.get("AdModelView"));
    	this.model.on("change",this.render,this);
//        this.model.on('add',this.update);
//		this.model.bind('all',this.render,this);
    },

    render: function () {
//class="topcoat-list__item" id="ad"
//        this.delegateEvents();
        this.$el.attr("class","topcoat-list__item");
        this.$el.attr("id","ad");
//        console.log($('.adModelViewRedeem'));
//        $('.adModelViewRedeem',this.el).html("<button class='topcoat-button--cta redeem-button'>Redeem</button>");
//        console.log($('.adModelViewRedeem'));

        this.$el.html(this.template(this.model.attributes));

        if(this.model.get('type')=='none'){
            $('button.topcoat-button--cta',this.el).remove();
        }


        return this;
    },

    update:function(){
        this.model.update();
        this.render();
    },

    gotoSubscriberPage: function(event){
        console.log("click to "+this.model.get('subscriberID'));
        window.location = "#subscriber/"+this.model.get('subscriberID');
//        app.router.navigate("#subscriber/"+this.model.get('subscriberID'),{trigger:true});
//        app.slider.slidePage(new app.views.SubscriberPageView().render().el);
//        this.undelegateEvents();
        return false;
   	},

    redeem:function(){
        console.log("redeem!");
//        console.log(this);
        app.ad = this.model;
        window.location = "#redeem";
        return false;
    }

   //  back: function(event) {
//         window.history.back();
//         return false;
//     }

});