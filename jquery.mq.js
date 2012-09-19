(function( $ ){
	var settings = {};
	var defaults = {
		sizes : [0,768,960,1024],
		current_size : 0,
		useMqSizes : false
	};
	
	$.fn.mq = function( options ) {
		if(options == undefined){
			options = defaults;
		}
		settings.sizes = $.merge(options.sizes,defaults.sizes);
		settings = $.extend({},defaults,options);
		if(settings.useMqSizes){
			var mqSizes = getMediaQuerySizes();
			$.merge(settings.sizes,mqSizes);
		}

		
		$(this).resize(function(){
			var w = $(this).width();
			sizeTest(w);
		});
		
		sizeTest($(this).width());
		return settings.current_size;
	};

	function sizeTest(w){
		var tmp = oldsize = settings.current_size;
		var sizes = settings.sizes.sort(function(a,b){return a - b;});
		
		$.each(sizes, function(i){
			var size = settings.sizes[i];
			if(w >= size){
				tmp = size;
			}
		});
		if(settings.current_size != tmp){
			settings.current_size = tmp;
			$(this).trigger({type:"sizechange",new_size:settings.current_size, old_size:oldsize});
		}
	}
	
	function getMediaQuerySizes(){
		var styles = document.styleSheets || document.rules;
		var sizes = [];
		$.each(styles,function(i){
			$.each(styles[i].cssRules,function(j){
				if(this.cssText.indexOf("@media") != -1){
					var mediaText = this.media.mediaText.split(":");
					var size = parseInt(mediaText[1],10);
					sizes.push(size);
				}
			})
		})
		return sizes;
	}
})( jQuery );
