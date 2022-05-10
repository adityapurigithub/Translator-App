const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("button");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchangeIcon = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons")


selectTag.forEach((tag, id) => {
	// console.log(tag);

	// for(key in object){
	// 	console.log(key)
	// }
	for (const country_code in countries) {
		// console.log(country_code);
		// console.log(countries[country_code]);

		// selecting english by default...
		let selected;
		if (id == 0 && country_code == "en-GB") {   //id=0 basically means at 0 index 
			selected = "selected"
		} else if (id == 1 && country_code == "hi-IN") {
			selected = "selected"
		}

		let options = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
		
		//adding options inside select
		tag.insertAdjacentHTML("beforeend", options) //insertAdjacentHTML(position, to_insert)
	}
});
translateBtn.addEventListener("click", () => {
	let text = fromText.value;

	transalteFrom = selectTag[0].value;
	transalteTo = selectTag[1].value;

	// console.log(text,transalteFrom,transalteTo);

	if(text==''){
		return;
	}
	toText.setAttribute("placeholder","Translating, Please Wait....")

	//fetching api response...
	let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${transalteFrom}|${transalteTo}`;
	fetch(apiUrl).then((res) => { return res.json() }).then((data) => {
		console.log(data);
		toText.value = data.responseData.translatedText;
		toText.setAttribute("placeholder","Translation")

	})


});

exchangeIcon.addEventListener("click", () => {
	// console.log('exchangeIcon clicked');

	let tempText = fromText.value;
	fromText.value = toText.value;
	toText.value = tempText;
	let tempLang = selectTag[0].value;
	selectTag[0].value = selectTag[1].value;
	selectTag[1].value = tempLang;
})

icons.forEach((icon) => {
	// console.log(icon);
	icon.addEventListener("click", ({ target }) => {
		// console.log(target)
		if (target.classList.contains("fa-copy")) {
			if (target.id == "from") {
				// console.log("from copy icon clicked");
				navigator.clipboard.writeText(fromText.value)  //for copying the value..

			} else {
				// console.log("to copy icon clicked");

				navigator.clipboard.writeText(toText.value)
			}

		} else {
			// console.log("Speech icon clicked");
			  let utterance;
            if(target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        

		}
		
	})
})


