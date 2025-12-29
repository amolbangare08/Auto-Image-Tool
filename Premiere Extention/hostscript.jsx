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
    app.project.rootItem.select();

    var targetBin = getTargetBin("Auto Image");

    if (filePath) {
        // 1. Import the file
        // suppressUI = true, targetBin = our bin, importAsNumberedStills = false
        app.project.importFiles([filePath], true, targetBin, false);

        // 2. Determine the filename Premiere uses
        // Using the File object is safer than string splitting for paths
        var f = new File(filePath);
        var fileName = f.name;

        // 3. Find the newly imported item
        var importedItem = findItemInBin(targetBin, fileName);

        if (importedItem) {
            // 4. Rename it if altText is provided
            if (altText && altText !== "undefined" && altText !== "") {
                importedItem.name = altText;
            }

            // 5. Select it
            importedItem.select();
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