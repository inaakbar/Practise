const translateBtn = document.querySelector("button")
const fromText = document.querySelectorAll(".btn btn-outline-dark btn-lg")
const toText = document.querySelectorAll(".btn btn-outline-dark btn-lg")

translateBtn.addEventListener("click", () => {
    let text = fromText.value;
    let translateFrom = English
    let translateTo = document.querySelector(".btn btn-outline-light nav-btn").value

    if(!text){
        return
    }
    

    let apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=English|${translateTo}`
    fetch(apiURL).then(res => res.json()).then(data => {
        console.log(data)
        toText.value = data.responseData.translatedText
        toText.setAttribute("placeholder", "Translation")
    });
  //  console.log(text)
})