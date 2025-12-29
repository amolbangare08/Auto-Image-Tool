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

function importImage(filePath) {
    app.project.rootItem.select();

    var targetBin = getTargetBin("Auto Image");

    if (filePath) {
        app.project.importFiles([filePath], true, targetBin, false);

        var fileName = filePath.split("\\").pop();
        var importedItem = findItemInBin(targetBin, fileName);

        if (importedItem) {
            var numSelected = app.project.rootItem.children.numItems;
            for(var i=0; i < numSelected; i++) {
            }

            importedItem.select();

        }
    }
}