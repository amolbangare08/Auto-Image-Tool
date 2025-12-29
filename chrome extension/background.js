// 1. Create the Context Menu Item when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "send-to-premiere",
    title: "Send to Premiere Pro",
    contexts: ["image"] // Only show this option when right-clicking images
  });
});

// 2. Listen for the click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "send-to-premiere") {
    
    const imageUrl = info.srcUrl;
    console.log("Sending URL:", imageUrl);

    // 3. Send the URL to the Local Server (Premiere Extension)
    // We are assuming the server runs on Port 8088
    fetch("http://localhost:8088/import", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: imageUrl })
    })
    .then(response => {
      if (response.ok) {
        console.log("Success! Image sent to Premiere.");
      } else {
        console.error("Server received request but returned error.");
      }
    })
    .catch(error => {
      console.error("Error connecting to Premiere Pro:", error);
      console.log("Make sure Premiere Pro is open and the extension is running!");
    });
  }
});