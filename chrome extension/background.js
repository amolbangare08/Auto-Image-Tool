let lastImageInfo = {};

// 1. Listen for the info from content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "imageClicked") {
        lastImageInfo = request.payload;
    }
});

// 2. Create Context Menu
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "sendToPremiere",
        title: "Send to Premiere Pro",
        contexts: ["image"]
    });
});

// 3. Handle Click
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "sendToPremiere") {
        
        const imageUrl = info.srcUrl;
        
        // Check if our cached info matches the clicked URL
        // (This ensures we don't use old alt text for a new image)
        let nameSuggestion = "image";
        if (lastImageInfo.src === imageUrl && lastImageInfo.alt) {
            nameSuggestion = lastImageInfo.alt;
        } else {
            // Fallback: Try to get name from URL filename
            const urlParts = imageUrl.split('/');
            const lastPart = urlParts[urlParts.length - 1];
            nameSuggestion = lastPart.split('?')[0].split('#')[0]; // Clean query params
        }

        // Clean up the name (remove weird characters)
        nameSuggestion = nameSuggestion.replace(/[^a-zA-Z0-9-_ ]/g, "").substring(0, 50);

        console.log("Sending URL:", imageUrl);
        console.log("Suggested Name:", nameSuggestion);

        fetch('http://localhost:8088/import', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: imageUrl,
                name: nameSuggestion,
                alt: lastImageInfo.alt
            })
        })
        .then(response => {
            if (!response.ok) throw new Error("Server Error");
            console.log("Success! Image sent.");
        })
        .catch(err => {
            console.error("Failed to send:", err);
            // Optional: Alert the user in Chrome
        });
    }
});