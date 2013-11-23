app.views.AdModelView = Backbone.View.extend({

	tagName:'li',

	events: {
        "click button.topcoat-button--cta.redeem-button":"redeem",
        "click #gotoMap":"gotoMap",
        "click #adCanvas":"gotoSubscriberPage"

    },


//    blah:{
//        ""
//    },
    
    
    initialize: function() {
    	_.bindAll(this,'gotoSubscriberPage','redeem','gotoMap');
    	this.template = _.template(tpl.get("AdModelView"));
    	this.model.on("change",this.render,this);
//        this.model.on('add',this.update);
//		this.model.bind('all',this.render,this);
        this.subscriber = new app.models.SubscriberPage({subscriberID:this.model.get('agencyID').$id});
        var that = this;
        this.subscriber.fetch({
//            wait: true,
            success: function(model, response, options) {
                that.model.set('clubTitle',that.subscriber.get('name'));
                that.model.set('clubAddress',that.subscriber.get('location'));
            },
            error: function(model, response, options) {
                console.log('An error occured while fetching the data...');
            }
        });
//        console.log(this.model);
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

        if(this.model.get('type')=='none' || this.model.get('type')=='Banner'){
            $('button.topcoat-button--cta',this.el).remove();
        }

        $('.adModelViewContent',this.el).css('width',$(window).width()-(71+52+30));

        return this;
    },

    update:function(){
        this.model.update();
        this.render();
    },
    
    gotoMap:function(event){
//        event.preventDefault();
        console.log("goto map");
        if(device.platform == 'Android'){
            window.location = "geo:0,0?q="+this.model.get('clubAddress');
        } else if(device.platform == 'iOS'){
            window.location = "maps:q="+this.model.get('clubAddress');
            
        }
        return false;
    },

    gotoSubscriberPage: function(event){
        console.log("click to "+this.model.get('agencyID').$id);
        window.location = "#subscriber/"+this.model.get('agencyID').$id;
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