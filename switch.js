for (let i = 0; i < document.querySelectorAll('input').length ; i++) {	
	let option = document.getElementsByTagName('input')[i];
	//Check if switch exist
	chrome.storage.local.get('Switch' + i, function (data) {
		if (!data.hasOwnProperty('Switch' + i) || typeof data["Switch" + i] === 'undefined')
			data["Switch" + i] = false;
		option.checked = data["Switch" + i];
	});

	//Change switch 
	option.addEventListener('change', function () {
		let switchState = option.checked;
		let currentSwitch = {};
		currentSwitch["Switch" + i] = switchState;
		chrome.storage.local.set(currentSwitch);
	});
}