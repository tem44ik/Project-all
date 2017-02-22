;(function($){
	var defaults = {

	};

	function Magicfilter(options, elements){
		this.config = $.extend({}, defaults, options)
		this.element = elements;
		this.init();
	};

	Magicfilter.prototype.init = function(){
		var self = this;

		 this._categoryArray = [];

		for (var i = 0; i < this.element.length ; i++) {
			this._categoryArray.push($(this.element[i]).attr('data-target'))
			
		}
		// console.log(this._categoryArray);
		this._categoryArray = this._categoryArray.filter(this.unicArrayFilter)
		 this.createObjCategory();
		 this.action(self);

	};

	Magicfilter.prototype.unicArrayFilter = function(value, index, arr){
		return arr.indexOf(value) === index;
	};

	Magicfilter.prototype.createObjCategory = function(){
		this._objCategory = {};

		for(var i = 0; i < this._categoryArray.length; i++){
			this._objCategory[this._categoryArray[i]] = [];
		}
		return this._objCategory;
		//console.log(this._objCategory);

	};

	Magicfilter.prototype.action = function(self){
		$(this.element).on('click', function(){
			var categoryObj = self.createObjCategory();
			var target = $(this).attr('data-target');
			var checkbox = '[data-target='+target+']' + ':checked';

			$(checkbox).each(function() {
				 categoryObj[target].push(this.value);				
			})
			$(target).text(categoryObj[target].join());
			self.sendAjax(categoryObj);
			 // console.log(categoryObj);
		})
	};

	Magicfilter.prototype.sendAjax = function(obj){
		$('.loader').fadeIn('slow');
		setTimeout(function(){
		// $('content-load').load('item.html');
		$.ajax({
			type: 'get',
			url: 'item.html',
			data: JSON.stringify(obj),
			success: function(response) {
				 $('.loader').fadeOut('slow');
				 $('.content-load').html(response);
				},
			})
		}, 1000)
	};

	$.fn.magicfilter = function(options){
		new Magicfilter(options, this);
	};
})(jQuery)