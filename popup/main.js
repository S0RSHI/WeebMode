//Onclick event
const left = document.getElementById('left');
const right = document.getElementById('right');
left.addEventListener('click', function() {changeOptions(false);});
right.addEventListener('click', function() {changeOptions(true);});


//Refresh page
document.getElementById("refresh").onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
};

function changeOptions(next){
	let images = document.querySelectorAll('.logo');
	let pages = document.querySelectorAll('.page');
	//Check current img
	images.forEach( (el, index) => {
		if(el.classList == 'logo')
			current = index;
	});
	//Hide current img and page
	images[current].classList = 'logo hide';
	pages[current].classList = 'page hide';

	//Check next img and page
	if(next){
		page = pages[current+1] || pages[0];
		image = images[current+1] || images[0];
	}else{
		page = pages[current-1] || pages[pages.length - 1];
		image = images[current-1] || images[images.length - 1];
	}

	//Show next img and page
	page.classList = 'page';
	image.classList = 'logo';
}