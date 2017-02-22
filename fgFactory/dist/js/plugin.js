// shift slider on hover
;(function ($){
	$(window).on('load', function (){
		function ShiftSlide(){
			this.prev = $('.slick-prev');
			this.next = $('.slick-next');
		};

		ShiftSlide.prototype.init = function() {
			var self = this;
			this.actionUi(self);
		};
		ShiftSlide.prototype.actionUi = function(self){
			this.shiftFunc = function (element, transVal, someSlide) {
				self.parent = $(element).closest('.slick-carousel');
				self.currentSlide = $(self.parent).find('.slick-current');
				self.nextSlide = $(self.currentSlide).next('.slick-slide');
				self.prevSlide = $(self.currentSlide).prev('.slick-slide');
				self.currentSlide.css('transform', 'translateX(' + transVal +')');
				self[someSlide].css('transform', 'translateX(' + transVal +')');
			};

			this.shiftFuncMouseout = function(someSlide){
				self.currentSlide.css('transform', 'translateX(0)');
				self[someSlide].css('transform', 'translateX(0)');
			}

			this.prev.mouseover(function(){
				self.shiftFunc(this, '10%', 'prevSlide');				
			});

			this.prev.mouseout(function(){
				self.shiftFuncMouseout('prevSlide');
			});

			this.next.mouseover(function(){
				self.shiftFunc(this, '-10%', 'nextSlide');				
			});

			this.next.mouseout(function(){
				self.shiftFuncMouseout('nextSlide');
			});
		};

		var shift = new ShiftSlide();
		shift.init();

	});
})(jQuery);
// play pause video
(function ($){
	$(window).on('load', function (){
		var windowSize = $(window).width();
		$('.slick-carousel').on('afterChange beforeChange', function(event, slick, currentSlide, nextSlide){
			if(windowSize < 1024) return false;
			var video = $('video');
			var current = $(this).find('.slick-current');
			var currentVideo = current.find('video');

			currentVideo.each(function(i, value){
				if(value && event['type'] == 'afterChange'){
					value.play();
				} else{
					value.pause();
				}
			});
		});
	});
})(jQuery);

//project list mobile
;(function ($){
	$(window).on('load', function(){
		var projectList = $('.project-list');
		var projectListActiveElem = projectList.find('li.active');
		var mobileProjectList = '<div class="mobile-list">' + 
									'<div class="curent">' + 
										'<span class="current-text">' +
											projectListActiveElem.text() + 
										'</span>'+
										'<span class="close">CLOSE</span>' +
										'<span class="dropdown__toggle"></span>' +
									'</div>' +

									'<div class="dropdown-list">' +
										'<ul>' + 
											projectList.html() +
										'</ul>' +
									'</div>'+
								'</div>';
		$(mobileProjectList).insertAfter(projectList);

		var curent = $('.curent');
		var dropdownList = $('.dropdown-list');

		curent.on('click', function(){
			$(this).toggleClass('selected');
			dropdownList.slideToggle();
		});

		var dropdownListElement = $('.dropdown-list li');
		var currentText = $('.current-text');

		dropdownListElement.on('click', function(){
			dropdownListElement.each(function(){
				if ($(this).hasClass('active')){
					$(this).removeClass('active');
				};
			});
			$(this).addClass('active');
			currentText.text($(this).text());
			// dropdownList.slideUp();
			// curent.toggleClass('selected');

			curent.trigger('click');

		});



	});
	
})(jQuery);


// data-animate sections
;(function($){
 	$(window).on('load', function(){
 		var windowWidth = $(window).width();
 		var sections = $('*[data-animate="animate"]');
 		var sectionsOnLoad = $('*[data-animate="onload"]');

 		if(sectionsOnLoad){
 			sectionsOnLoad.addClass('animate');
 		};
 		if( windowWidth < 1024){
 			sections.addClass('animate');
 		}else{
 			$(window).on('scroll', function(){
				sections.each(function(i, value){
					if ($(document).scrollTop() + $(window).height() > $(value).offset().top && $(document).scrollTop() - $(value).offset().top < $(value).height()){ 
				    	$(value).addClass("animate");
				    };
				});
			});
		};		
	});
})(jQuery);

//onLoad img on scroll


//вариант для того когда у блоков фиксированная высота
// ;(function($){
//  	$(window).on('load', function(){

//  		var img = $('img[data-src]');

// 		$(window).on('scroll', function(){
// 			img.each(function(i, value){

// 				if ($(document).scrollTop() + $(window).height() > $(value).offset().top && $(document).scrollTop() - $(value).offset().top < $(value).height()){ 
// 					$(value).attr('src', value.attr('data-src'));
// 				};
// 			});
// 		});
//  	});
// })(jQuery);



;(function($){
 	$(window).on('load', function(){

 		var img = $('img[data-src]');

		$(window).on('scroll', function(){
			img.each(function(i, value){

				if ($(document).scrollTop() + $(window).height() > $(value).offset().top && $(document).scrollTop() - $(value).offset().top < $(value).height()){ 
					$(value).attr('src', value.attr('data-src'));
				};
			});
		});
 	});
})(jQuery);