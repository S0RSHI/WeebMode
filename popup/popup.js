let img = 0;
function curent(){
	document.getElementsByClassName('logo')[img].style.display = "none";
	document.getElementsByTagName('section')[img].style.display = "none";
}
function back(){
	document.getElementsByClassName('logo')[img-1].style.display = "inline-block";
	document.getElementsByTagName('section')[img-1].style.display = "inline-block";
}
function next(){
	document.getElementsByClassName('logo')[img+1].style.display = "inline-block";
	document.getElementsByTagName('section')[img+1].style.display = "inline-block";
}
document.getElementsByClassName('left')[0].onclick = function() {
	if (img==0){
		curent();
		img = 3;
		back();
		img = 2;
	}else {
		curent();
		back();
		img--;
	}
}
document.getElementsByClassName('right')[0].onclick = function() {
	if (img==2){
		curent();
		img = -1;
		next();
		img = 0;
}else {
		curent();
		next();
		img++;
	}
}
for (let i = 0; i <= 5; i++) {
	let option = document.getElementsByTagName('input')[i];
	chrome.storage.local.get('activeSwitch' + i, function (data) {
		//console.log(data);
		if (!data.hasOwnProperty('activeSwitch' + i) || typeof data["activeSwitch" + i] === 'undefined')
			data["activeSwitch" + i] = true;
		option.checked = data["activeSwitch" + i];
	});
	option.addEventListener('change', function () {
		let switchState = option.checked;
		let xd = {};
		xd["activeSwitch" + i] = switchState;
		//console.log("xd", xd);
		chrome.storage.local.set(xd, function () {
			//console.log('activeSwitch saved');
		});
	});
}
document.getElementById("refresh").onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
};
document.getElementById('button').onclick= function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, true);
    });
};