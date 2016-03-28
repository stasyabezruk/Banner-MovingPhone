window.onload = function() {

	(function () {
		var phone = document.querySelector('#phone-wrapper'),
			dragBar = document.querySelector('#dragBar');

		dragBar.addEventListener('change', function () {
			var valueDragBar = dragBar.value,
				/*_tmp = window.getComputedStyle(phone,null).backgroundPosition.trim().split(/\s+/),
				positions = {
			        'left' : _tmp[0],
			        'top' : _tmp[1]
			    },*/
			    newBgPos = -Number(221*valueDragBar);
			    console.log(newBgPos);
			phone.style.backgroundPositionY = newBgPos + 'px';
		})
	})();
}