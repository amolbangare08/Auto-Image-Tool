// Helper: Find or Create the Bin
function getTargetBin(binName) {
    var root = app.project.rootItem;
    
    // 1. Search for existing bin
    for (var i = 0; i < root.children.numItems; i++) {
        var item = root.children[i];
        if (item.type === ProjectItemType.BIN && item.name === binName) {
            return item;
        }
    }
    
    // 2. Create if it doesn't exist
    return root.createBin(binName);
}

// Helper: Find item inside a specific bin
function findItemInBin(bin, itemName) {
    for (var i = 0; i < bin.children.numItems; i++) {
        if (bin.children[i].name === itemName) {
            return bin.children[i];
        }
    }
    return null;
}

function importImage(filePath) {
    // 1. Force focus on the Project Panel (by selecting root, then deselecting)
    app.project.rootItem.select();
    
    var targetBin = getTargetBin("Auto Image");

    if (filePath) {
        // 2. Import the file silently
        app.project.importFiles([filePath], true, targetBin, false);

        // 3. Find the newly imported item to highlight it
        var fileName = filePath.split("\\").pop(); 
        var importedItem = findItemInBin(targetBin, fileName);

        if (importedItem) {
            // 4. DESELECT everything else first (Critical for highlighting)
            var numSelected = app.project.rootItem.children.numItems;
            for(var i=0; i < numSelected; i++) {
                 // There isn't a global "deselect all" command, 
                 // but selecting a specific item usually clears others.
            }
            
            // 5. Select ONLY our new image
            importedItem.select();
            
            // (Optional) If you want to force the Bin to be selected too, you can:
            // targetBin.select(); 
            // But usually, selecting the child item is better for drag-and-drop.
        }
    }
}