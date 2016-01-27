
var main =  function($) {
	
	var a = {
		init : function() {
			main.jumpTarget();

		},
		
		bindEvents : function() {
			main.jumpAnchor();
				
		}
	}
	
	return {
		onReady : function() {
			a.init();
			a.bindEvents();
		},

		queryparams : function(){
			var p = window.location.search.substr(1).split(/\&/), l = p.length, kv, r = {};
			while(l--){
				kv = p[l].split(/\=/);
				r[kv[0]] = kv[1] || ''; //if no =value just set it as true
			}
			return r;
		},

		jumpAnchor : function() {
			//This will look at each anchor if it's got a data-target
			$("a").each(function() {
				if ($(this).attr("data-target") !== undefined) {
					$(this).on("click", function(event) {
						event.preventDefault(); //prevent to go to link
						var pageUrl = $(this).attr("href"); //retrieve it's destination page
						var pageTarget = $(this).attr("data-target"); //retrieve it's target
						var targetUrl = pageUrl+"?target="+pageTarget; //create url with query param
						window.location.href=targetUrl;					
					});
				}
			});
		},

		jumpTarget : function() {
			//This function uses the query parameters to determine the target
			//window.load because all images needs to be loaded first
			$(window).load(function(){
				if (main.queryparams().target !== undefined ){
					var targetId = main.queryparams().target; //retrieve the target's id
					var targetPos = $(document.body).find("[data-id='" + targetId +"']").position().top; //retrieve target's position
					var navHeight = $("header").height();	// get height of the navbar 
					var scrollPos = targetPos - navHeight ; // target’s position + navbar height. you can add extra margin if you want here like + 30
					window.scrollTo(0, scrollPos); //scrolls the window to this position
				}			
			});
		}
	}
		
	
}(jQuery);


$(document).ready(function () {
   main.onReady();
});



// jumpAnchor : function() {
// 			//This will look at each anchor if it's got a data-target
// 			$("a").each(function() {
// 				if ($(this).attr("data-target") !== undefined) {
// 					$(this).on("click", function(event) {
// 						event.preventDefault(); //prevent to go to link
// 						var pageUrl = $(this).attr("href"); //retrieve it's destination page
// 						var pageTarget = $(this).attr("data-target"); //retrieve it's target
// 						var targetUrl = pageUrl+"?target="+pageTarget; //create url with query param
// 						window.location.href=targetUrl;					
// 					});
// 				}
// 			});

// if ($(this).attr("data-bind") !== undefined) {
 

