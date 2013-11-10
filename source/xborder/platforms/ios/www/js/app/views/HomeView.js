app.views.HomeView = Backbone.View.extend({

// 	var temp = _.template($("#homeview").html());
// 	var t = tpl.get("homeview");
    
// 	template: _.template(tpl.get('HomeView').html()),

//	el: $('div#main'),

	events: {
        "click span.topcoat-icon.refresh-icon":"refresh",
        "click #distance":"distance",
        "click #deals":"deals",
        "click #clits":"clits"
    },

    initialize: function () {
    	_.bindAll(this, 'render', 'onclick','geo', 'renderAd','fetchAds','refresh','distance','deals','clits');
    	this.h = tpl.get("HomeView");
    	this.te = _.template(this.h);
        this.filterStatus = 'distance';

        this.col = new app.models.AdCollection();        
        this.col.on("sync",this.render);
        
        this.clitCol = new app.models.ClitCollection();
        this.clitCol.on("sync",this.render);

//        this.fetchAds();

        // will pull city from storage/explore page after re-choosing.
    },
    
    distance:function(event){
        this.filterStatus = 'distance';
        this.fetchAll();
    },
    
    deals:function(event){
        this.filterStatus = 'deals';
        this.fetchAll();
    },
    
    clits:function(event){
        this.filterStatus = 'clits';
        this.fetchAll();
    },

    refresh:function(){
//        console.log('refresh');
        this.fetchAll();
    },
    
    fetchAll:function(){
        var that = this;
        navigator.geolocation.getCurrentPosition(function(pos){
            app.pos = pos;
            that.allFetch();
        }, function(){
            alert('GPS Failed');
        }, {timeout: 5000, enableHighAccuracy: true });
    },
    
    allFetch:function(){
        
        if(this.filterStatus == 'distance'){
            this.fetchAds();
        } else if(this.filterStatus == 'clits') {
            this.fetchClits();
        } else if(this.filterStatus == 'deals') {
            this.fetchAds();
        } 
    },

    fetchAds:function(){
        console.log('fetch ads');
        this.col.fetch({
//            wait: true,
            reset:true,
            success: function(model, response, options) {
//                console.log("!");
//                console.log(model);
//                console.log(response);
//                console.log(options);
//                console.log(response.models);
                console.log("got ads");
            },
            error: function(model, response, options) {
                console.log('An error occured while fetching the data...');
                alert("Error Contacting Server.");
            }
        });
    },
    
    fetchClits:function(){
        console.log('fetch clits');  
        this.clitCol.fetch({
//            wait: true,
            reset:true,
            success: function(model, response, options) {
//                console.log("!");
//                console.log(model);
//                console.log(response);
//                console.log(options);
//                console.log(response.models);
                console.log("got clits");
            },
            error: function(model, response, options) {
                console.log('An error occured while fetching the clits...');
                alert("Error Contacting Server.");
            }
        });
    },
    
    geo:function(pos){
//     	console.log(pos);
		this.col.geo(pos);
    },
	
    render: function () {
        this.delegateEvents();
        this.$el.html(this.te({title:"Clitter: "+app.city.get('name'),city:app.city.get('name')}));
        
		var self = this;
        
        if(this.filterStatus == 'distance'){
            $('#distance',this.el).css('color','#fff');
//            old color #454545 / #3879D9
            _(this.col.models).each(function(ad){
                self.renderAd(ad);
            },this);
        } else if(this.filterStatus == 'clits') {
            $('#clits',this.el).css('color','#fff');
            _(this.clitCol.models).each(function(clit){
                self.renderClit(clit);
            },this);
        } else if(this.filterStatus == 'deals') {
            $('#deals',this.el).css('color','#fff');
        }
        
        $('#homeViewList.topcoat-list',this.el).css('height', parseInt($('body').css('height'),10) - parseInt($('#extra.topcoat-list__container',this.el).css('top'),10));
        console.log('list: ',$('#homeViewList.topcoat-list',this.el).css('height'));
        if(device.platform == 'iOS'){
            $('#homeViewList.topcoat-list',this.el).css('height','+='+$('#homeViewHeader',this.el).css('height'));
        }
        console.log('list: ',$(window).height());
        
        return this;
    },
    
    renderAd: function(ad){
    	var view = new app.views.AdModelView({
    			model:ad
    		});
    	view.delegateEvents();
    	$('#extra',this.el).append(view.render().el);
    },
    
    renderClit:function(clit){
        var view = new app.views.ClitModelView({
    			model:clit
    		});
    	view.delegateEvents();
    	$('#extra',this.el).append(view.render().el);
    },


	onclick: function(event){
// 		event.prev
        console.log('click ad');
// 		alert("omg button");
	}

});