chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "send-to-premiere",
    title: "Send to Premiere Pro",
    contexts: ["image"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "send-to-premiere") {
    const imageUrl = info.srcUrl;
    console.log("Sending URL:", imageUrl);
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