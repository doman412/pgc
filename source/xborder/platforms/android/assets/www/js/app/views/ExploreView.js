app.views.ExploreView = Backbone.View.extend({

    events:{
        "click .back-button": "back"
    },

    initialize:function(){
        this.template = _.template(tpl.get("ExploreViewTemplate"));
        this.collection = new app.models.CityCollection();
        this.collection.fetch({
//            wait: true,
            reset:true,
            success: function(model, response, options) {
                console.log("cities fetch success!");
                console.log(model);
                console.log(response);

            },
            error: function(model, response, options) {
                console.log('An error occured while fetching cities data...');
            }
        });
        this.collection.on('sync',this.render,this);

        app.city.on('change:name',this.render,this);
    },

    back: function(event) {
        event.preventDefault();
        window.history.back();
        return false;
    },

    render:function(){
        this.delegateEvents();
//        console.log("explore render");

        var self = this;

        this.$el.html(this.template());
//        console.log("cites!");
//        console.log(this.collection.models);
        this.collection.each(function(model){
//            console.log('render city');
            self.renderCity(model);
        },this);

        return this;
    },

    renderCity:function(item){
        var view = new app.views.CityView({model:item});
        console.log(view);
        $('#extra',this.el).append(view.render().el);
    }


});

app.views.CityView = Backbone.View.extend({

    tagName:'li',

    events:function(){
        return {
            "click":"changeCity",
            "click .back-button": "back"
        };
    },

    initialize:function(){
        this.template = _.template(tpl.get("CityView"));
    },

    render: function () {
        console.log("render;delegate events");
        this.delegateEvents();
        this.$el.attr("class","topcoat-list__item");
        this.$el.attr("id","city");
        this.$el.html(this.template(this.model.attributes));
        if(this.model.get('name')==app.city.get('name')){
//            console.log("they match");
            this.$el.attr("style","background-color:#3879D9;");
//            $('p').css("color","#000000");
//            console.log($('p',this.el));
            $('p',this.el).attr("style","color:#000000");
//            console.log(this.$el.css("background-color"));
        }

        return this;
    },

    back: function(event) {
        window.history.back();
        return false;
    },

    changeCity:function(event){
//        event.preventDefault();
        console.log("click works");
        app.city.set('name',this.model.get('name'));
        return true;
    }
});

app.models.City = Backbone.Model.extend({

    defaults:{
        name:"City Name"
    }

});

app.models.CityCollection = Backbone.Collection.extend({

    model:app.models.City,

    url: function(){
        return app.domain+"/api/locations";
    }


});