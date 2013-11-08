app.models.AdModel = Backbone.Model.extend({

//    idAttribute: 'id_event',

    url: function(){
        return app.domain+"api/ads/";
    },

//    imgUrl: function(){
//        return app.domainRoot+"/images/ads/"+this.get('_id').$id;
//    },

    defaults:{
		name:"hello, world!",
        title:"default title",
		description:"Here goes the description",
        imgUrl:"",
        thing:"thing",
        type:"none",
        clubTitle:"club",
        clubAddress:"blah"
	},

    initialize:function () {
//        _.bindAll(this,'update');
//        console.log(this.get('_id').$id);

        this.set('imgUrl',app.domainRoot +"/"+this.get('imagesURI'));
//        this.set('imgUrl',"http://i.imgur.com/3NcnuUZ.gif");
//        this.imgUrl = app.domainRoot+"/images/ads/"+this.get('_id').$id;
// 		this.name = "goodbye";
// 		_.bindAll(this,"update");
//         this.bind('change', this.update);
    }



});