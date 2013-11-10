app.models.ClitModel = Backbone.Model.extend({
    
    defaults:{
        imgUrl:"css/images/chat.svg",
        title:"title",
        clubTitle:"clubTitle"
    }
    
});


app.models.ClitCollection = Backbone.Collection.extend({
    
    url: function(){
        return app.domain+"/api/clits/location/"+app.city.get('name')+"/"+app.uuid+"/"+app.pos.coords.latitude+"/"+app.pos.coords.longitude;
    },

	model: app.models.ClitModel,

    initialize:function () {
		_.bindAll(this,'parse');
        this.comparator = 'distance';
    },

    parse:function(resp,xhr){
//        console.log("parse");
//        console.log(resp);
//        console.log(xhr);
//        this.set("models",resp);
        return resp;
    }
    
});

app.views.ClitModelView = Backbone.View.extend({
   
    tagName:'li',
    
    events: {
        "click #gotoMap":"gotoMap",
        "click #adCanvas":"gotoSubscriberPage"

    },
    
    initialize:function(){
        this.template = _.template(tpl.get("AdModelView"));
    	this.model.on("change",this.render,this);
        
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
    },
    
    render:function(){
        this.$el.attr("class","topcoat-list__item");
        this.$el.attr("id","ad");
        
        this.$el.html(this.template(this.model.attributes));

        $('button.topcoat-button--cta',this.el).remove();
        $('.adModelViewImageRow',this.el).remove();
        $('.adModelViewTitle',this.el).remove();
        
        $('.adModelViewContent',this.el).css('width',$(window).width()-(52+25));
        
        return this;
    },
    
    gotoMap:function(event){
//        event.preventDefault();
        console.log("goto map");
        if(device.platform == 'Android'){
            window.location = "geo:0,0?q="+this.model.get('clubAddress');
        } else if(device.platform == 'iOS'){
            window.location = "maps:?daddr="+this.model.get('clubAddress');
            
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
   	}
    
});