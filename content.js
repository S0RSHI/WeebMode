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
	if (url.includes("reddit.com") && activeSwitch[0]) reddit(counterPost);
	if (url.includes("mangakatana.com/manga") && activeSwitch[1]) mangaKatana();
}, 0);


function reddit(counterPost){
	redditUrl(counterPost);
	document.addEventListener('keyup', e => {
		if((e.keyCode === 83 || e.keyCode === 40) && document.querySelectorAll('._1oQyIsiPHYt6nx7VOmd1sz')[counterPost] != 'undefined'){
			document.addEventListener('keydown', a => {a.preventDefault();})
			counterPost++;
			redditScroll(counterPost);
		}
		if((e.keyCode === 87 || e.keyCode === 38) && counterPost > 0){
			document.addEventListener('keydown', a => {a.preventDefault();})
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

//Scroll function - reddit
function redditScroll(counter){
	let posts = document.querySelectorAll('._1oQyIsiPHYt6nx7VOmd1sz');
	posts.forEach((el, index)=> {
		if(index == counter) el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center"});
	});
}
//Check url change function - reddit
function redditUrl(counterPost){
	let lastUrl = location.href; 
	new MutationObserver(() => {
		const nowUrl = location.href;
		if (nowUrl !== lastUrl) {
			lastUrl = nowUrl;
			counterPost =  0;;
		}
	}).observe(document, {subtree: true, childList: true});
}