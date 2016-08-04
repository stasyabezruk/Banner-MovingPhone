var BannerPhone = (function () {
	function Constructor (root) {
		this.root = document.querySelector(root);
		this.phone = this.root.querySelector('#phone-wrapper');
		this.dragBar = this.root.querySelector('#dragBar');
		this.dragBarWrapper = this.root.querySelector('.dragBar-wrapper');		
		this.dragText = this.root.querySelector('.label-wrapper');
		this.buyBtn = this.root.querySelector('.buyBtn');		
		this.textContent = this.root.querySelector('.text-content');

		
		this.loadBanner();
		this.scrollPhone();		
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
				if (newValRange > oldValRange) {	//to bottom
					
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


	return Constructor;
})();

window.onload = function() {
	var banner1 = new BannerPhone('#moving-phone');	
}