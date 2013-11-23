app.views.AdRedemptionPageView = Backbone.View.extend({


    events:{
        "click .back-button": "back",
        "click li" : "prevent"
    },

    initialize:function(){
        this.template = _.template(tpl.get("AdRedemptionPageViewTemplate"));

    },

    back: function(event) {
        event.preventDefault();
        window.history.back();
        return false;
    },

    prevent:function(event){
        event.preventDefault();
        console.log("prevent.");
        return false;
    },

    render:function(){

        this.$el.html(this.template());

//        console.log(this.model);
        $('body').css('background-color','#000000');

        if(this.model.get('type')=='QR Code'){
            var qr = new app.models.QRModel();
            qr.set('domain',app.domain);
            qr.set('url',"/api/ads/redeem/");
            qr.set('uuid',app.uuid);
            qr.set('adId',this.model.get('_id').$id);
            qr.set('frequency',this.model.get('frequency'));

//            console.log(qr);
            this.$el.append(new app.views.QRModelView({model:qr}).render().el);
        } else if(this.model.get('type')=='Door man'){
            var dm = new app.models.DoormanModel();
            dm.set('ad',this.model);


            this.$el.append(new app.views.DoormanView({model:dm}).render().el);
        }
        this.delegateEvents();
        return this;
    }


});