app.models.SubscriberPage = Backbone.Model.extend({

//    idAttribute:'_id',

    url: function(){
        return app.domain+"/api/subscriber/page/"+this.get('subscriberID');
    },

    defaults:{
        title:"Subscriber Name",
        description:"description",
        hours:"hours",
        address:"address",
        facebook:"facebook",
        twitter:"twitter"
    },

    initialize:function () {
		_.bindAll(this,'updateImageURI');
        this.col = new app.models.AdCollection();
        this.set('imgUrl', app.domainRoot+"/"+this.get('imageURI'));
//        this.set('imgUrl', "http://i.imgur.com/3NcnuUZ.gif");
// 		this.name = "goodbye";

//         this.bind('change', this.update);
    },

    updateImageURI:function() {
        this.set('imgUrl', app.domainRoot+"/"+this.get('imageURI'));
    }

});