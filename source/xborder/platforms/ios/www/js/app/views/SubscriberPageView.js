app.views.SubscriberPageView = Backbone.View.extend({


//    el: $('body'),

    initialize: function() {
        _.bindAll(this,'submit','add');

        this.model.on("change",this.render,this);

        this.template = _.template(tpl.get("SubscriberPageViewTemplate"));
//        this.model.on("change",this.render,this);
        this.model.col.on("add",this.add,this);


    },

    events: {
        "click .back-button": "back",
        "click a#submitButton":"submit",
        "click button.topcoat-button--cta.redeem-button":"redeem",
        "click li#ad" : "prevent"
    },

    prevent:function(event){
        event.preventDefault();
        console.log("prevent");
        return false;
    },
    
    redeem:function(event){
        console.log('redeem');    
    },
    
    back: function(event) {
        event.preventDefault();
        window.history.back();
        return false;
    },
    
    add:function(){
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));

        var self = this;

//        <img src="https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=http%3A%2F%2Fwww.google.com%2F&choe=UTF-8" title="Link to Google.com" />

//        _(this.model.col.models.where({location:app.city.get('name')})).each(function(ad){
//            self.renderAd(ad);
//        },this);
        this.temp = this.model.col.where({location:app.city.get('name')});
        _(this.temp).each(function(ad){
            self.renderAd(ad);
        },this);

        return this;
    },

    renderAd: function(ad){
        var view = new app.views.AdModelView({
            model:ad
        });
        view.undelegateEvents();
        $('#adsList',this.el).append(view.render().el);
    },

    submit:function(){

//        alert($('textarea#newComment',this.el).value());

        var b = $('#newComment');
        alert(b.val());
    }


});