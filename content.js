//Loading setting from storage
let activeSwitch = [];
for (let i = 0; i <= 2; i++) {
	chrome.storage.local.get('Switch' + i, function (data) {
		activeSwitch[i] = data['Switch' + i];
	});
}
//Calling functions
setTimeout(function () {
	let url = location.href;
	let counterPost = 0;
	if (url.includes('reddit.com') && activeSwitch[0]) reddit(counterPost);
	if (url.includes('mangakatana.com/manga') && activeSwitch[1]) mangaKatana();
	if (activeSwitch[2]) weebModel();
}, 0);

function reddit(counterPost){
	//Check url change
	let lastUrl = location.href; 
	new MutationObserver(() => {
		const nowUrl = location.href;
		if (nowUrl !== lastUrl) {
			lastUrl = nowUrl;
			counterPost =  0;
		}
	}).observe(document, {subtree: true, childList: true});
	//Prevent scroll down/up arrow key
	if(!lastUrl.includes('settings'))
		document.addEventListener('keydown', a => {
			if(a.keyCode === 40 || a.keyCode === 38) a.preventDefault();
		});
	//Check press key
	document.addEventListener('keyup', e => {
		if((e.keyCode === 83 || e.keyCode === 40) && document.querySelectorAll('._1oQyIsiPHYt6nx7VOmd1sz')[counterPost] != 'undefined' && !checkFocus()){
			counterPost++;
			redditScroll(counterPost);
		}
		if((e.keyCode === 87 || e.keyCode === 38) && counterPost > 0 && !checkFocus()){
			counterPost--;
			redditScroll(counterPost);
		}
	});
};

function mangaKatana(){
	let direction = [];
	document.addEventListener('keyup', e => {
		if(e.keyCode === 65 || e.keyCode === 37) direction = document.querySelectorAll('.prev');
		if(e.keyCode === 68 || e.keyCode === 39) direction = document.querySelectorAll('.next');
		direction.forEach( el => { el.click(); });
	})
};

let imgSrc = '';
chrome.storage.local.get('imgLink', function (data) {
	imgSrc = data['imgLink'];
});
function weebModel(){
	let link = imgSrc;
	let img = document.createElement('img');
	img.src = link;
	img.style.cssText = 'position: fixed; bottom: -5px; right: 20px; width: 200px; z-index: 2147483648; filter: none';
	document.body.appendChild(img);
}

//Check if focus is on something important - reddit
function checkFocus(){
	let active =  document.activeElement;
	let searchBard = document.getElementById('header-search-bar');
	let answer = document.querySelectorAll('.public-DraftEditor-content');
	let inputs = document.querySelectorAll('input');
	let check =false;
	answer.forEach(el => {if(el === active) check = true;});
	inputs.forEach(el => {if(el === active) check = true;});
	if(check) return true;
	if(searchBard === active) return true;
	return false;
} 
//Scroll function - reddit
function redditScroll(counter){
	let posts = document.querySelectorAll('._1oQyIsiPHYt6nx7VOmd1sz');
	posts.forEach((el, index)=> {
		if(index == counter) el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center"});
	});
}