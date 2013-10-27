app.views.SubscriberPageView = Backbone.View.extend({


//    el: $('body'),

    initialize: function() {
        _.bindAll(this,'submit');

        this.model.on("change",this.render,this);

        this.template = _.template(tpl.get("SubscriberPageViewTemplate"));
//        this.model.on("change",this.render,this);
        this.model.col.on("add",this.render,this);

    },

    events: {
        "click .back-button": "back",
        "click a#submitButton":"submit",
        "click ul#adsList" : "prevent"
    },

    prevent:function(event){
        event.preventDefault();
        console.log("prevent");
        return false;
    },

    back: function(event) {
        window.history.back();
        return false;
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));

        var self = this;
        _(this.model.col.models).each(function(ad){
            self.renderAd(ad);
        },this);

        return this;
    },

    renderAd: function(ad){
        var view = new app.views.AdModelView({
            model:ad
        });

        $('#adsList',this.el).append(view.render().el);
    },

    submit:function(){

//        alert($('textarea#newComment',this.el).value());

        var b = $('#newComment');
        alert(b.val());
    }


});