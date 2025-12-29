const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');

var csInterface = new CSInterface();
const app = express();
const PORT = 8088;

app.use(cors());
app.use(express.json());

// --- Helper to Sanitize Filenames ---
function sanitizeFilename(name) {
    if (!name) return `img_${Date.now()}`;
    return name.replace(/[^a-z0-9-_ ]/gi, '_').substring(0, 100);
}

// --- PROJECT PATH HELPER ---
function getProjectPath() {
    return new Promise((resolve) => {
        csInterface.evalScript('app.project.path', (result) => {
            if (!result || result === 'undefined' || result === "") {
                resolve(null);
            } else {
                resolve(result);
            }
        });
    });
}

// --- CONVERTER HELPER ---
function convertImageToPngBuffer(inputBuffer) {
    return new Promise((resolve, reject) => {
        const blob = new Blob([inputBuffer]);
        const url = URL.createObjectURL(blob);
        const img = new Image();

        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const dataUrl = canvas.toDataURL('image/png');
                URL.revokeObjectURL(url);
                const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
                resolve(Buffer.from(base64Data, 'base64'));
            } catch (e) {
                reject(e);
            }
        };

        img.onerror = (err) => {
            URL.revokeObjectURL(url);
            reject(new Error("Image Format Not Supported"));
        };
        img.src = url;
    });
}

// --- MAIN ROUTE ---
app.post('/import', async (req, res) => {
    const imageUrl = req.body.url;
    let smartName = req.body.name;
    let altText = req.body.alt || '';

    // 1. Create Row via Global UI Function
    // We access 'window' because we are in the same mixed context
    const rowId = window.createLogRow();

    if (!imageUrl) {
        window.updateLogRow(rowId, "Unknown URL", "error");
        return res.status(400).json({ error: "No URL" });
    }

    try {
        // 2. Download
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        // 3. Convert
        const pngBuffer = await convertImageToPngBuffer(response.data);

        // 4. Determine Path
        const projectPath = await getProjectPath();
        let saveDir = projectPath ? path.dirname(projectPath) : os.tmpdir();

        // 5. Naming Strategy
        let baseName = sanitizeFilename(smartName);
        if (baseName.length < 2) baseName = `img_${Date.now()}`;
        
        // Ensure uniqueness
        let filename = `${baseName}.png`;
        let counter = 1;
        while (fs.existsSync(path.join(saveDir, filename))) {
            filename = `${baseName}_${counter}.png`;
            counter++;
        }

        const finalFilePath = path.join(saveDir, filename);

        // 6. Save & Import
        fs.writeFileSync(finalFilePath, pngBuffer);

        const cleanPath = finalFilePath.replace(/\\/g, "\\\\");

        // Prepare Alt Text (handle quotes to prevent script errors)
        const safeAlt = altText
            ? altText.replace(/'/g, "\\'").replace(/"/g, '\\"')
            : "";

        // Call the updated JSX function with BOTH arguments
        csInterface.evalScript(`importImage('${cleanPath}', '${safeAlt}')`);

        // REMOVED: The separate renameProjectItem block is no longer needed
        // because we passed safeAlt directly to importImage above.

        // 7. Update UI via Global Function
        window.updateLogRow(rowId, filename, "success");

        res.status(200).json({ status: "success", file: filename });

    } catch (error) {
        console.error("Full Error:", error);
        window.updateLogRow(rowId, "Download Error", "error");
        res.status(500).json({ error: "Processing Failed" });
    }
});

app.listen(PORT, () => {
    console.log(`Premiere Server running on http://localhost:${PORT}`);
});