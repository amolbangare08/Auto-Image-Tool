# Auto Image 📸
**A Seamless Bridge Between Chrome and Adobe Premiere Pro.**

![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)
![Platform](https://img.shields.io/badge/Platform-Windows-blue)
![Adobe](https://img.shields.io/badge/Adobe-Premiere%20Pro-purple)

Auto Image is a workflow automation tool designed for video editors who frequently source images from the web. It eliminates the tedious "Download -> Show in Folder -> Drag to Premiere -> Create Bin" cycle.

With Auto Image, you simply **right-click an image in Chrome**, and it instantly appears in your **Premiere Pro project bin**, converted and ready to edit.

## ✨ Features
* **One-Click Import:** Right-click any image in Chrome -> "Send to Premiere Pro".
* **Universal Format Support:** Automatically handles **WebP, AVIF, JPEG, and PNG**.
* **Smart Conversion:** Natively converts all web formats to **PNG** so Premiere never complains about "unsupported formats."
* **Auto-Organization:** Creates and sorts images into an "Auto Image" bin automatically.
* **Project Awareness:** Detects your active project file and saves images next to it (keeps your file structure clean).
* **Modern Dashboard:** A clean, dark-mode panel inside Premiere Pro to track download history and status.

## ⚖️ License
This project is licensed under the **CC BY-NC 4.0** License. See the [LICENSE](LICENSE) file for details.

---

## 🛠️ Installation Guide

This tool consists of two parts: a **Chrome Extension** and a **Premiere Pro Extension**.

### Prerequisites
* Windows 10 or 11.
* Adobe Premiere Pro (2020 or newer recommended).
* Google Chrome (or Brave/Edge).

### Part 1: Install the Premiere Pro Extension
1.  Download or Clone this repository.
2.  Copy the entire `premiere_extension` folder.
3.  Navigate to your Adobe Extensions folder:
    * Press `Windows Key + R`
    * Paste this: `%AppData%\Adobe\CEP\extensions`
    * Click **OK**.
4.  **Paste** the `premiere_extension` folder here.
    * *Final path should look like:* `...\AppData\Roaming\Adobe\CEP\extensions\premiere_extension`

### Part 2: Enable "Debug Mode" (Crucial Step)
Since this is a custom tool (not from the Adobe Store), you must tell Windows to allow it to run.

1.  Open the `enable_debug_mode.reg` file included in this repo.
2.  Double-click it and select **Yes** to confirm.
3.  **Restart Premiere Pro** if it is open.

### Part 3: Install the Chrome Extension
1.  Open Google Chrome and go to `chrome://extensions`.
2.  Toggle **Developer mode** (top right corner switch).
3.  Click the **Load unpacked** button (top left).
4.  Select the `chrome_extension` folder from this repository.
5.  (Optional) Pin the "Auto Image" icon to your browser toolbar for easy access.

---

## 🚀 How to Use

1.  **Open Adobe Premiere Pro** and open your project.
2.  Go to the top menu: **Window** > **Extensions** > **Auto Image**.
3.  A panel will open. Wait for the status indicator to turn **Green** (Server Running).
    * *Note: If Windows Firewall asks for permission, click "Allow". This is required for Chrome to talk to Premiere.*
4.  **Go to Chrome**, find any image on the web.
5.  **Right-click** the image and select **"Send to Premiere Pro"**.
6.  Switch back to Premiere. The image will appear in an **"Auto Image"** folder, highlighted and ready to use!

---

## ❓ Troubleshooting

**"Connection Refused" / Red Error in Chrome**
* Make sure Premiere Pro is OPEN.
* Make sure you have opened the extension panel (`Window > Extensions > Auto Image`). The server only runs when that panel is active.

**Extension not showing in Window > Extensions menu**
* You likely skipped **Part 2 (Debug Mode)**. Run the `.reg` file and restart Premiere.
* Check that the folder is exactly in `%AppData%\Adobe\CEP\extensions`.

**"Download Error" in the Panel**
* The panel logs will tell you if a download failed.
* Check your internet connection.
* If the image is protected (e.g., some stock photo sites block downloads), the tool may not be able to access it.

---

## 👨‍💻 Tech Stack
* **Backend:** Node.js (running inside Adobe CEP environment).
* **Frontend:** HTML5, CSS3, JavaScript.
* **Communication:** Localhost HTTP Server (Port 8088).
* **Image Processing:** HTML5 Canvas (Native Browser Conversion).

---

**Made with ❤️ for Editors.**