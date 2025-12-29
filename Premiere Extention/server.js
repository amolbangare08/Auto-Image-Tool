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

function createLogRow() {
    const table = document.getElementById('logTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(0);
    const rowId = 'row-' + Date.now();
    newRow.id = rowId;

    const timeCell = newRow.insertCell(0);
    const nameCell = newRow.insertCell(1);
    const statusCell = newRow.insertCell(2);

    const now = new Date();
    timeCell.innerHTML = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

    nameCell.innerHTML = '<span style="color: #666">Downloading...</span>';
    nameCell.className = "file-name";
    statusCell.innerHTML = '<span class="badge pending">Pending</span>';

    return rowId;
}

function updateLogRow(rowId, fileName, statusType) {
    const row = document.getElementById(rowId);
    if (!row) return;

    const nameCell = row.cells[1];
    const statusCell = row.cells[2];

    nameCell.innerText = fileName;

    if (statusType === "success") {
        statusCell.innerHTML = '<span class="badge success">Success</span>';
    } else if (statusType === "error") {
        statusCell.innerHTML = '<span class="badge error">Failed</span>';
    }
}

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

app.post('/import', async (req, res) => {
    const imageUrl = req.body.url;
    const rowId = createLogRow();

    if (!imageUrl) {
        updateLogRow(rowId, "Unknown URL", "error");
        return res.status(400).json({ error: "No URL" });
    }

    try {
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const pngBuffer = await convertImageToPngBuffer(response.data);

        const projectPath = await getProjectPath();
        let saveDir = projectPath ? path.dirname(projectPath) : os.tmpdir();

        const filename = `img_${Date.now()}.png`;
        const finalFilePath = path.join(saveDir, filename);

        fs.writeFileSync(finalFilePath, pngBuffer);

        console.log("Saved to:", finalFilePath);

        const cleanPath = finalFilePath.replace(/\\/g, "\\\\");
        csInterface.evalScript(`importImage('${cleanPath}')`);

        updateLogRow(rowId, filename, "success");

        res.status(200).json({ status: "success", file: filename });

    } catch (error) {
        console.error("Full Error:", error);
        updateLogRow(rowId, "Download Error", "error");
        res.status(500).json({ error: "Processing Failed", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Premiere Server running on http://localhost:${PORT}`);
});