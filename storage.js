//Switch
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
//WeebModel link
const confirmLink = document.getElementsByClassName('linkConfirm')[0];
confirmLink.addEventListener('click', function() {imgLink();})
function imgLink(){
	let modelLink = document.getElementById('linkModel');
	if(modelLink.value){
		let imgLink = {};
		imgLink['imgLink'] = modelLink.value;
		chrome.storage.local.set(imgLink);
	}
}