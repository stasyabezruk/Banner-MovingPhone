var BannerPhone = (function () {
	function Constructor (root) {
		this.root = document.querySelector(root);
		this.phone = this.root.querySelector('#phone-wrapper');
		this.dragBar = this.root.querySelector('#dragBar');
		this.dragBarWrapper = this.root.querySelector('.dragBar-wrapper');		
		this.dragText = this.root.querySelector('.label-wrapper');
		this.buyBtn = this.root.querySelector('.buyBtn');		
		this.textContent = this.root.querySelector('.text-content');
		this.flash = this.root.querySelector('.flash img');
		this.closeBtn = this.root.querySelector('.close-wrapper');
		this.internal = this.root.querySelector('.internal');
		
		this.loadBanner();
		this.scrollPhone();
		this.closeBanner();		
	}

	Constructor.prototype.scrollPhone = function () {
		var self = this,
			oldValRange = self.dragBar.value;			

		this.dragBar.addEventListener('input', function () {
			var newValRange = self.dragBar.value,				
			    newBgPos = -Number(221*newValRange);
			    
			    //console.log(newValRange);			    
				
				self.phone.style.backgroundPositionY = newBgPos + 'px';

				//check the direction of input-range
				if ( newValRange > oldValRange ) {	//to bottom
					
					if (newValRange === '3') {						
						self.fadeText('1');
					}
					if (newValRange === '22') {						
						self.fadeText('2');
					}
					if (newValRange === '47') {						
						self.fadeText('3');
					}					
				
				} else if ( newValRange < oldValRange ) {	//to top
					
					if ( newValRange === '3' ) {						
						self.fadeText('0');
					}
					if (newValRange === '22') {						
						self.fadeText('1');
					}
					if (newValRange === '47') {						
						self.fadeText('2');
					}
					
				}
				oldValRange = newValRange;

				if ( newValRange === '28' ) {
					self.fadeInFlash();								
				}

				if ( newValRange === '59' ) {
					self.internal.style.transition = 'all .5s';
					self.internal.style.WebkitTransition = 'all .5s';	
					self.internal.style.opacity = '1';

				} else {
					self.internal.style.transition = 'all 0s';
					self.internal.style.WebkitTransition = 'all 0s';	
					self.internal.style.opacity = '0';
				}
		});
	};

	/*elements come in to banner*/
	Constructor.prototype.moveEl = function (el) {
		el.style.top = parseInt(el.offsetTop) + (-5) + 'px';

		var self = this,
			animate = window.setTimeout ( function () {
				self.moveEl(el);
			}, 12);	
		if (el.offsetTop == 15) {			
			window.clearTimeout(animate);
			
			var timeout1 = window.setTimeout(function () {self.dragText.style.opacity = '1';}, 500);
			var timeout2 = window.setTimeout(function () {self.buyBtn.style.opacity = '1'}, 1100);
		}
	};

	Constructor.prototype.loadBanner = function () {
		var self = this;
		
		this.moveEl(this.phone);
		var timeoutID = window.setTimeout(function () {self.moveEl(self.dragBarWrapper)}, 400);
		this.textContent.style.opacity = '1';
	};

	/*change right bottom text*/
	Constructor.prototype.fadeText = function (showdNumEl) {
		var texts = this.textContent.getElementsByTagName('img'),
			i;
		
		for (i = 0; i < texts.length; i++) {
			if ( texts[i].classList.contains('text-active') ) {				
				texts[i].classList.remove('text-active');				
			}
			var timeoutID = window.setTimeout(function () {texts[showdNumEl].classList.add('text-active')}, 100);
		}
	};

	/*flash*/
	Constructor.prototype.fadeInFlash = function () {
		var self = this;

		this.flash.style.animation = 'fadeInFlash .4s ease-in-out';
		this.flash.style.WebkitAnimation = 'fadeInFlash .4s ease-in-out';
		
		var timeoutID1 = window.setTimeout(function () {self.flash.style.animation = ''}, 400),
			timeoutID1 = window.setTimeout(function () {self.flash.style.WebkitAnimation = ''}, 400);

	};

	Constructor.prototype.closeBanner = function () {
		var self = this;

		this.closeBtn.addEventListener ('click', function () {
			self.root.parentNode.removeChild(self.root);
		});
	};
	

	return Constructor;
})();

window.onload = function() {
	var banner1 = new BannerPhone('#moving-phone');	
}