for (let i = 0; i <= 2; i++) {
	let option = document.getElementsByTagName('input')[i];
	chrome.storage.local.get('activeSwitch' + i, function (data) {
		console.log(data);
		if (!data.hasOwnProperty('activeSwitch' + i) || typeof data["activeSwitch" + i] === 'undefined')
			data["activeSwitch" + i] = true;
		option.checked = data["activeSwitch" + i];
	});
	option.addEventListener('change', function () {
		let switchState = option.checked;
		let xd = {};
		xd["activeSwitch" + i] = switchState;
		console.log("xd", xd);
		chrome.storage.local.set(xd, function () {
			console.log('activeSwitch saved');
		});
	});
}
document.getElementById("refresh").onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
};
/*document.getElementById("logo").onclick = function() {
	document.getElementById("content").classList.add("hide")
};*/