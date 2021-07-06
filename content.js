//Load from local storage setting on popup
let activeSwitch = [];
for (let i = 0; i <= 5; i++) {
	chrome.storage.local.get('activeSwitch' + i, function (data) {
		activeSwitch[i] = data['activeSwitch' + i];
	});
}
//Center scroll on reddit
function RedditCenterScroll(i) {
	document.getElementsByClassName("_1oQyIsiPHYt6nx7VOmd1sz")[i].scrollIntoView({
		behavior: "smooth",
		block: "center",
		inline: "center"
	});
}
//Get url
let url = window.location.toString();
//Wait for load local storage
setTimeout(function () {
	//Reddit
	if (url.includes("reddit.com") && activeSwitch[0]) {
		document.addEventListener('keydown', (a) => {
			a.preventDefault();
		})
		document.getElementsByTagName("html")[0].setAttribute("style", "scroll-behavior: smooth;");
		let counter = 0;
		document.addEventListener('keyup', (e) => {
			//Scroll | "W" = 87
			if ((e.keyCode == 87 || e.keyCode == 38) && counter > 0) {
				e.preventDefault();
				counter--;
				RedditCenterScroll(counter);
				//Scroll | "S" = 83
			} else if ((e.keyCode == 83 || e.keyCode == 40) && typeof (document.getElementsByClassName("_1oQyIsiPHYt6nx7VOmd1sz")[counter]) != 'undefined') {
				e.preventDefault();
				counter++;
				RedditCenterScroll(counter);

			}
		})
	}
	//Manganelo
	if (url.includes("manganelo.com/chapter/") && activeSwitch[1]) {
		document.addEventListener('keydown', (e) => {
			//Switch page - next | Right arrow = 39 / "D" = 68
			if (e.keyCode == 39 || e.keyCode == 68)
				document.getElementsByClassName("navi-change-chapter-btn-next")[0].click();
			//Switch page - previous | Left arrow = 37 / "A" = 65
			else if (e.keyCode == 37 || e.keyCode == 65)
				document.getElementsByClassName("navi-change-chapter-btn-prev")[0].click();
		})
		var ads = document.createElement('style');
		ads.innerHTML = "iframe{display: none !important;} .container-chapter-reader div{display: none !important};"
		document.body.appendChild(ads);
	}
	//Manganelo WebManga
	if (url.includes("https://manganelo.com/chapter/") && activeSwitch[2]) {
		var sheet = document.createElement('style');
		sheet.innerHTML = ".container-chapter-reader img{margin-top: 0 !important;margin-bottom: 0 !important;padding-bottom: 0 !important;padding-top: 0 !important;}"
		document.body.appendChild(sheet);
	}
	//MangaKatana
	if (url.includes("https://mangakatana.com/manga") && activeSwitch[3]) {
		document.addEventListener('keydown', (e) => {
			//Switch page - next | Right arrow = 39 / "D" = 68
			if (e.keyCode == 39 || e.keyCode == 68)
				document.getElementsByClassName("next")[0].click();
			//Switch page - previous | Left arrow = 37 / "A" = 65
			else if (e.keyCode == 37 || e.keyCode == 65)
				document.getElementsByClassName("prev")[0].click();
		})
	}
	//WeebModel
	if (activeSwitch[4]) {
		var img = document.createElement("img");
		img.src = "https://cdn.discordapp.com/attachments/730271005049618506/822136386521792532/Character_S.png";
		if (activeSwitch[5])
			img.style.cssText = "position: fixed; bottom: -5px; left: 20px; width: 200px; z-index: 2147483648; filter: none"
		else
			img.style.cssText = "position: fixed; bottom: -5px; right: 20px; width: 200px; z-index: 2147483648; filter: none"
		document.body.appendChild(img);
	}
}, 0)

//https://mangakatana.com/manga