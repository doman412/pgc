app.models.SubscriberPage = Backbone.Model.extend({

    url: function(){
        return app.domain+"/api/subscriber/page/"+this.get('subscriberID');
    },

    defaults:{
        title:"Subscriber Name",
        description:"description",
        hours:"hours",
        address:"address"
    },

    initialize:function () {
        this.col = new app.models.AdCollection();
        this.set('imgUrl', app.domainRoot+"/images/pages/"+this.get('subscriberID'));
//        this.set('imgUrl', "http://i.imgur.com/3NcnuUZ.gif");
// 		this.name = "goodbye";
// 		_.bindAll(this,"update");
//         this.bind('change', this.update);
    }

});