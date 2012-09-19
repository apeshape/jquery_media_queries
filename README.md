jQuery media queries
====================

jQuery plugin that fires an event when the screen is resized. Useful when testing/developing responsive sites.

#Usage:

```javascript
var opts = {
	sizes:[700,800],
	useMqSizes : true
}

$(window).mq(opts);

$(window).on('sizechange',function(e){
	console.log(e.new_size);
});
```





