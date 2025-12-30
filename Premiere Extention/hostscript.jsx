function getTargetBin(binName) {
    var root = app.project.rootItem;

    for (var i = 0; i < root.children.numItems; i++) {
        var item = root.children[i];
        if (item.type === ProjectItemType.BIN && item.name === binName) {
            return item;
        }
    }

    return root.createBin(binName);
}

function findItemInBin(bin, itemName) {
    for (var i = 0; i < bin.children.numItems; i++) {
        if (bin.children[i].name === itemName) {
            return bin.children[i];
        }
    }
    return null;
}

function importImage(filePath, altText) {
    // 1. Get the Bin
    var targetBin = getTargetBin("Auto Image");

    if (filePath) {
        // 2. Import the file
        // suppressUI = true, targetBin = our bin, importAsNumberedStills = false
        app.project.importFiles([filePath], true, targetBin, false);

        // 3. Determine the filename Premiere uses
        var f = new File(filePath);
        var fileName = f.name;

        // 4. Find the newly imported item
        var importedItem = findItemInBin(targetBin, fileName);

        if (importedItem) {
            // 5. Rename it if altText is provided
            if (altText && altText !== "undefined" && altText !== "") {
                importedItem.name = altText;
            }

            // 6. Focus Logic
            // First, select the item in the Project Panel
            importedItem.select();

            // Second, open it in the Source Monitor
            // This forces Premiere to show the image, even if the bin is visually collapsed
            if (app.sourceMonitor) {
                app.sourceMonitor.openProjectItem(importedItem);
            }
        }
    }
}

function renameProjectItem(oldName, newName) {
    var targetBin = getTargetBin("Auto Image");
    var item = findItemInBin(targetBin, oldName);
    
    if (item) {
        item.name = newName;
        return true;
    }
    return false;
}