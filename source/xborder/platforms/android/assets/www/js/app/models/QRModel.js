app.models.QRModel = Backbone.Model.extend({


    initialize:function(){
//        this.uuid = window.device.uuid;

    }


});

app.views.QRModelView = Backbone.View.extend({


    initialize:function(){
        this.template = _.template(tpl.get("QRModelViewTemplate"));
    },

    render:function(){

        console.log(this.model);
        this.$el.html(this.template(this.model.attributes));



        return this;
    }

});

app.models.DoormanModel = Backbone.Model.extend({

});

app.views.DoormanView = Backbone.View.extend({

    events:{
        "click #doormanButton" : "validate"
    },

    initialize:function(){
        this.template = _.template(tpl.get("DoormanViewTemplate"));

        this.model.on("change",this.render);
        this.model.on("change:ad",this.updateAd);

        this.adResponse = new app.models.RedemptionResponseModel({ad:this.model.get('ad')});
        this.adResponse.on("sync",this.render);
    },

    validate:function(){
        var self = this;
        this.adResponse.fetch({
//            wait: true,
//            reset:true,
            success: function(model, response, options) {
                console.log("got response");
                console.log(model);
                console.log(response);
//                if(response.accepted == 'TRUE'){
//                    self.adResonse.set('color','green');
//                } else if(response.accepted == 'FALSE'){
//                    self.adResonse.set('color','red');
//                }

            },
            error: function(model, response, options) {
                console.log('An error occured while fetching the response...');
            }
        });
        console.log("validate");
    },

    updateAd:function(){
//        this.adResponse.set()
        console.log('adupdate');
    },

//    prevent:function(event){
//        event.preventDefault();
//        console.log("prevent");
//        return false;
//    },

    render:function(){
        console.log('doorman render');

//        this.delegateEvents();

        this.$el.html(this.template(this.model.attributes));
        var view = new app.views.AdModelView({model:this.model.get('ad')});
        view.undelegateEvents();
        $('#extra',this.el).append(view.render().el);
        $('button.topcoat-button--cta.redeem-button',this.el).remove();

        if(this.adResponse.get('color')=='green'){
            $('#doormanButton',this.el).css('background-color','green');
        }


        return this;
    }
});

app.models.RedemptionResponseModel = Backbone.Model.extend({

    defaults:{
        color:"none"
    },

    url:function(){
        return app.domain+"/api/ads/redeem/"+app.uuid+"/"+this.get('ad').get('_id').$id+"/"+this.get('ad').get('frequency');
    }
});