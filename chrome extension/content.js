// content.js
// Listens for right-clicks to capture the 'alt' text before the menu opens
document.addEventListener("contextmenu", (event) => {
    if (event.target.tagName === "IMG") {
        const altText = event.target.alt || event.target.title || "";
        // Send this info to the background script immediately
        chrome.runtime.sendMessage({
            type: "imageClicked",
            payload: {
                alt: altText,
                src: event.target.src
            }
        });
    }
}, true);