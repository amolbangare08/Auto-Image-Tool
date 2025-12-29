# Auto Image 📸
**The Ultimate Chrome to Adobe Premiere Pro Image Importer & Workflow Automation Tool.**

![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)
![Platform](https://img.shields.io/badge/Platform-Windows-blue)
![Adobe](https://img.shields.io/badge/Adobe-Premiere%20Pro-purple)
![Browsers](https://img.shields.io/badge/Browsers-Chrome%20|%20Brave%20|%20Edge%20|%20Opera-green)

**Auto Image** is a powerful, free **Adobe Premiere Pro extension** designed to revolutionize your video editing workflow. It acts as a seamless bridge between your web browser and your timeline, eliminating the tedious "Download -> Show in Folder -> Drag to Premiere -> Create Bin" cycle.

Whether you are a documentary editor, YouTuber, or content creator, Auto Image allows you to **right-click any image on the web** and instantly import it into your active **Premiere Pro project**, fully converted and ready to edit.

## ✨ Key Features
* **🚀 Instant One-Click Import:** Simply right-click an image in your browser and select "Send to Premiere Pro".
* **🌐 Universal Browser Support:** Works perfectly with **Google Chrome**, **Brave**, **Microsoft Edge**, **Opera**, **Arc**, and all other Chromium-based browsers.
* **🖼️ Auto-Convert WebP & AVIF:** Natively converts modern web formats (WebP, AVIF) into editor-friendly **PNG** files automatically. No more "File Format Not Supported" errors in Premiere.
* **📂 Intelligent Organization:** Automatically creates an "Auto Image" bin in your project and sorts your downloads there, keeping your workspace clutter-free.
* **💾 Smart Project Detection:** Detects your currently open `.prproj` file and saves downloaded images in the same directory, maintaining a clean file structure on your hard drive.
* **📊 Modern Dashboard:** Includes a sleek, dark-mode panel inside Premiere Pro to track download history, status, and logs in real-time.

## ⚖️ License
This project is licensed under the **CC BY-NC 4.0** License. See the [LICENSE](LICENSE) file for details.
*(Free for personal use. Commercial use prohibited).*

---

## 🛠️ Installation Guide

This tool consists of two components: a **Browser Extension** (Frontend) and a **Premiere Pro Panel** (Backend).

### Prerequisites
* **OS:** Windows 10 or 11.
* **Software:** Adobe Premiere Pro (2020 or newer recommended).
* **Browser:** Any Chromium-based browser (Google Chrome, Brave, Microsoft Edge, Opera, Vivaldi, Arc, etc.).

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
Since this is a custom open-source tool (not from the Adobe Store), you must allow unsigned extensions to run.

1.  Open the `enable_debug_mode.reg` file included in this repo.
2.  Double-click it and select **Yes** to confirm.
3.  **Restart Premiere Pro** if it is currently open.

### Part 3: Install the Browser Extension
1.  Open your browser (Chrome, Brave, Edge, etc.) and go to your extensions page:
    * **Chrome/Brave:** `chrome://extensions`
    * **Edge:** `edge://extensions`
2.  Toggle **Developer mode** (usually a switch in the top right or bottom left).
3.  Click the **Load unpacked** button.
4.  Select the `chrome_extension` folder from this repository.
5.  (Optional) Pin the "Auto Image" icon to your toolbar for easy access.

---

## 🚀 How to Use

1.  **Open Adobe Premiere Pro** and load your project.
2.  Go to the top menu: **Window** > **Extensions** > **Auto Image**.
3.  The Auto Image panel will open. Wait for the status indicator to turn **Green** (Server Running).
    * *Note: If Windows Firewall asks for permission, click "Allow". This is required for the browser to communicate with Premiere Pro locally.*
4.  **Go to your Browser**, and find any image on the web.
5.  **Right-click** the image and select **"Send to Premiere Pro"**.
6.  Switch back to Premiere. The image will appear in an **"Auto Image"** folder, highlighted and ready to use!

---

## ❓ Troubleshooting

**"Connection Refused" / Red Error in Browser Console**
* Ensure Premiere Pro is **OPEN**.
* Ensure you have opened the panel (`Window > Extensions > Auto Image`). The local server only runs when that panel is active.

**Extension not showing in Window > Extensions menu**
* You likely skipped **Part 2 (Debug Mode)**. Run the `.reg` file and restart Premiere Pro.
* Verify the folder path is exactly `%AppData%\Adobe\CEP\extensions`.

**"Download Error" in the Panel**
* The panel logs will provide details.
* Check your internet connection.
* Some stock photo sites block programmatic downloads; try a different image to verify the tool is working.

---

## 👨‍💻 Tech Stack
* **Backend:** Node.js (Integrated within Adobe CEP environment).
* **Frontend:** HTML5, CSS3, JavaScript.
* **Communication:** Localhost HTTP Server (Port 8088).
* **Image Processing:** HTML5 Canvas (Native Browser Conversion for WebP/AVIF support).

---

**Made with ❤️ for Video Editors & Creators.**