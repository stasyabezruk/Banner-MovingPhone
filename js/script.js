var BannerPhone = (function () {
	function Constructor (root) {
		this.root = document.querySelector(root);
		this.phone = this.root.querySelector('#phone-wrapper');
		this.dragBar = this.root.querySelector('#dragBar');
		this.scrollPhone();
	}

	Constructor.prototype.scrollPhone = function () {
		var self = this;

		this.dragBar.addEventListener('input', function () {
			var valueDragBar = self.dragBar.value,				
			    newBgPos = -Number(221*valueDragBar);
			    console.log(newBgPos);			    
				self.phone.style.backgroundPositionY = newBgPos + 'px';
		});
	}

	return Constructor;
})();

window.onload = function() {
	var banner1 = new BannerPhone('#moving-phone');	
}