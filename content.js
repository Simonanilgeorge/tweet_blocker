// insert elements to the dom

let body = document.querySelector("body")

let container = document.createElement("div")
container.classList.add("container")
body.appendChild(container)

let popup = document.createElement("div")
popup.classList.add("popup")
container.appendChild(popup)

let inputbox = document.createElement("div")
inputbox.classList.add("inputbox")
popup.appendChild(inputbox)

let tag = document.createElement("div")
tag.classList.add("tag")
tag.innerText = "|||"
inputbox.appendChild(tag)

let input = document.createElement("div")
input.classList.add("input")
inputbox.appendChild(input)

let textInput = document.createElement("input")
textInput.classList.add("textInput")
input.appendChild(textInput)

let buttonInputBox = document.createElement("div")
buttonInputBox.classList.add("input")
inputbox.appendChild(buttonInputBox)

let button = document.createElement("button")
button.classList.add("button")
buttonInputBox.appendChild(button)
button.innerText = "Add";

let filterBox = document.createElement("div")
filterBox.classList.add("filter-box")
popup.appendChild(filterBox)
// by default popup is closed

let openTag = false
// tweets are blurred if any of the tweets contain a certain set of keywords

let keywords = new Set()
// event listener for tag;
tag.addEventListener("click", () => {
    popup.classList.toggle("visible")
    openTag = !openTag
    if (openTag) {
        tag.innerText = "x"
    }
    else {
        tag.innerText = "|||"
    }
})
// event listener for button
button.addEventListener("click", () => {
    // if keyword already exists or empty keyword is provided then return
    if (keywords.has(textInput.value) || !textInput.value.trim()) {
        return
    }
    if (textInput.value.trim()) {
        // add keyword to set
        keywords.add(textInput.value)
        // add it to the DOM

        let p = document.createElement("p")

        let closeButton = document.createElement("button")

        let filter = document.createElement("div")
        filter.classList.add("filter")
        closeButton.classList.add("close")
        closeButton.addEventListener("click", (e) => {
            close(e)
        });
        p.innerText = textInput.value;
        closeButton.innerText = `x`;
        filter.appendChild(p)
        filter.appendChild(closeButton)
        filterBox.appendChild(filter)
    }
})
// remove keywords
function close(e) {
    keywords.
        delete(e.target.parentNode.childNodes[0].innerText)
    e.target.parentNode.remove()
}

// set mutation observer

let config = { attributes: true, childList: true, subtree: true }

let observer = new MutationObserver(callback)
// observe the document
observer.observe(document, config)

function callback(mutations, observer) {
    // fetch all tweets

    let tweets = [...document.querySelectorAll("div[data-testid='cellInnerDiv']")]
    tweets = Array.from(new Set(tweets))
    // loop through all the tweets
    tweets.forEach((tweet) => {
        // if any of the tweets match the keywords then blur the tweets
        if (Array.from(keywords).some(word => tweet.innerText.toLowerCase().includes(word.toLowerCase()))) {
            tweet.style.filter = `blur(20px)`
            tweet.style.pointerEvents = "none"
        }
    })
}
