app.models.AdCollection = Backbone.Collection.extend({

    url: function(){
        return app.domain+"/api/ads/location/"+app.city.get('name')+"/"+app.uuid+"/"+app.pos.coords.latitude+"/"+app.pos.coords.longitude;
    },

	model: app.models.AdModel,

    initialize:function () {
		_.bindAll(this,'geo','parse');
        this.comparator = 'distance';
    },
    
    geo:function(pos){
    	this.each(function(i){
//     		console.log(i);
//    		i.set("name",pos.coords.latitude);
//     		console.log(i.get("name"));
    	});
    },

    parse:function(resp,xhr){
//        console.log("parse");
//        console.log(resp);
//        console.log(xhr);
//        this.set("models",resp);
        return resp;
    }

});