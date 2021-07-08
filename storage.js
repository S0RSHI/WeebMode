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
const modelLink = document.getElementsByClassName('modelLink')[0];
modelLink.addEventListener('click', function() {imgLink();})
function imgLink(){
	if(document.body.offsetHeight > 400){
		let linkModel = prompt("Enter link to your Model img", "");
		if(linkModel){
		let imgLink = {};
		imgLink['imgLink'] = linkModel;
		chrome.storage.local.set(imgLink);
		}
	}else{
		window.open('../options/options.html');
	}
}