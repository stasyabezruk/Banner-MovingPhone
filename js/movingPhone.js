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

		this.dropsWrapper = this.root.querySelector('.rainDrops-wrapper');
		this.startDrops = null;
		
		this.loadBanner();
		this.scrollPhone();
		this.closeBanner();
	}

	Constructor.prototype.scrollPhone = function () {
		var self = this,
			oldValRange = self.dragBar.value;

		helper.addEvent('input', self.dragBar, function () {
			var newValRange = self.dragBar.value,
			    newBgPos = -Number(221*newValRange);
			    
			    //console.log(newValRange);			    
				
				self.phone.style.backgroundPosition = '-30px ' + newBgPos + 'px';

				//check the direction of input-range
				if ( newValRange > oldValRange ) {	//to bottom
					
					if (newValRange === '3') {						
						self.fadeText('1');
						self.renderDrops();
					} else if (newValRange === '22') {						
						self.fadeText('2');
						self.stopDrops();
					} else if (newValRange === '47') {						
						self.fadeText('3');
					}					
				
				} else if ( newValRange < oldValRange ) {	//to top
					
					if ( newValRange === '1' ) {
						self.stopDrops();
					} else if ( newValRange === '3' ) {						
						self.fadeText('0');						
					} else if (newValRange === '22') {						
						self.fadeText('1');
						self.renderDrops();
					} else if (newValRange === '47') {						
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
			}, 25);	
		if (el.offsetTop == 15) {			
			window.clearTimeout(animate);
			
			var timeout1 = window.setTimeout(function () {self.dragText.style.opacity = '1'}, 500);
			var timeout2 = window.setTimeout(function () {self.buyBtn.style.opacity = '1'}, 1100);
		}
	};

	Constructor.prototype.loadBanner = function () {
		var self = this,
			timerLoadBanner;
		
		this.dragBar.value = '0'; //for Firefox
		this.moveEl(this.phone);
		
		timerLoadBanner = window.setTimeout(function () {self.moveEl(self.dragBarWrapper)}, 400);
		this.textContent.style.opacity = '1';
	};

	/*change right bottom text*/
	Constructor.prototype.fadeText = function (showdNumEl) {
		var texts = this.textContent.getElementsByTagName('img'),
			timeoutFadeText,
			i;
		
		for (i = 0; i < texts.length; i++) {
			if ( texts[i].classList.contains('text-active') ) {				
				texts[i].classList.remove('text-active');				
			}
			timeoutFadeText = window.setTimeout(function () {
				texts[showdNumEl].classList.add('text-active')
			}, 100);
		}
	};

	/*flash*/
	Constructor.prototype.fadeInFlash = function () {
		var self = this,
			timeoutAnimation,
			timeoutAnimationWeblit;

		this.flash.style.animation = 'fadeInFlash .4s ease-in-out';
		this.flash.style.WebkitAnimation = 'fadeInFlash .4s ease-in-out';
		
		timeoutAnimation = window.setTimeout ( function () { self.flash.style.animation = ''}, 400),
		timeoutAnimationWeblit = window.setTimeout ( function () { self.flash.style.WebkitAnimation = ''}, 400);

	};

	Constructor.prototype.closeBanner = function () {
		var self = this;

		this.closeBtn.addEventListener ('click', function () {
			self.root.parentNode.removeChild(self.root);
		});
	};

	/*RAIN DROPS*/
	Constructor.prototype.renderDrops = function (isRaining) {
		var self = this,
			i;
		
		this.startDrops = setInterval ( function () { self.renderOneDrop(); }, 80);
		
		setTimeout ( function () { 
			clearInterval (self.startDrops);
		}, 8000);
	};
	
	Constructor.prototype.stopDrops = function () {
		var isRaining = this.dropsWrapper.childNodes.length > 0;

		if(isRaining) {
			clearInterval(this.startDrops);
			while (this.dropsWrapper.firstChild) {
			    this.dropsWrapper.removeChild(this.dropsWrapper.firstChild);
			}
		}
		this.startDrops = null;
	};

	Constructor.prototype.renderOneDrop = function () {		
		var self = this,
			newImg = document.createElement("img"),
			dropContainer = document.createElement("div"),
			dropType = this.randomType(),
			imgUrl,
			timerFallDown;

		//check for quality of image		
		if (dropType == 'Big') {
			imgUrl = this.randomImage(1, false);
		} else {
			imgUrl = this.randomImage(1, 3);
		}		
    	
    	newImg.setAttribute("src", imgUrl);
    	newImg.classList.add('drop', 'drop' + dropType);
    	dropContainer.classList.add('dropContainer');

    	dropContainer.style.left = this.randomPosX();
    	dropContainer.style.top = this.randomPosY();

    	dropContainer.appendChild(newImg);
    	this.dropsWrapper.appendChild(dropContainer); 
    	
    	if (dropType == 'Big') {
    		timerFallDown = window.setTimeout(function () {
    			newImg.style.width = self.randomWidth(20, 35);
    			newImg.style.opacity = '1';
    		}, 5);    		
    	} else {
    		timerFallDown = window.setTimeout(function () {
    			newImg.style.width = self.randomWidth(5, 20);
    			newImg.style.opacity = '1';
    		}, 5);
    	}     	
    	
    	setTimeout ( function () {
    		timerFallDown = setInterval ( function () { self.dropFallDown(dropContainer, dropType); }, 60);
    	}, 1000);
    	setTimeout ( function () {self.dropReduce(newImg)}, 1300); //drop will reduce at the end of the fall
	};

	Constructor.prototype.dropFallDown = function (dropContainer, dropType) {		
		var self = this,
			fallSpeed;
		
		if (dropType == 'Big') {
			fallSpeed = this.randomSpeed(4, 10);  //big drops - slow
		} else {
			fallSpeed = this.randomSpeed(5, 15); //small drops - fast
		}
		var newY = dropContainer.offsetTop + fallSpeed;	

		if ( dropContainer.parentElement ) {
			if (newY > dropContainer.parentElement.offsetHeight) {
	            dropContainer.parentNode.removeChild(dropContainer);
	        }
	        else {
	            dropContainer.style.top = newY + 'px';
	        }
		}
		
	};

	Constructor.prototype.dropReduce = function (drop) {
		drop.style.width = '0px';
		drop.style.transition = 'width 3s';
		drop.style.WebkitTransition = 'width 3s';

		var heightEl = drop.offsetHeight + 'px';
		drop.style.height = heightEl;
	};


	Constructor.prototype.randomPosX = function () {
		var wW = this.dropsWrapper.clientWidth,			
			num = Math.round(Math.random() * wW - 100) + 'px'
  			return num;
	};
	Constructor.prototype.randomPosY = function () {
		var wH = this.dropsWrapper.clientHeight,
			num = Math.round(Math.random() * wH - 100) + 'px'
  				return num;
	};
	Constructor.prototype.randomWidth = function (min, max) {
		var rand = min + Math.random() * (max + 1 - min);
		    rand = Math.floor(rand) + 'px';
		    return rand;
	};
	Constructor.prototype.randomImage = function (min, max) {		
		var randUrl = null;
		
		//check for quality of image
		if (max) {
			randUrl = min + Math.random() * (max + 1 - min);
		    randUrl = 'img/effects/raindrop_' + Math.floor(randUrl) + '.png';
		} else {
			randUrl = 'img/effects/raindrop_' + min + '.png';
		}		
		return randUrl;
	};
	Constructor.prototype.randomType = function () {
		var arr = ['Big', 'Middle', 'Small'],
			randomType = arr[Math.floor(Math.random()*arr.length)];
			return randomType;
	};
	Constructor.prototype.randomSpeed = function (min, max) {
		var randSpeed = Math.floor(min + Math.random() * (max + 1 - min));
		return randSpeed;
	};

	return Constructor;
})();

