/**
 * Command for cpoying the publish url to the clipboard.
 */
Alchemy.command("Copy_Info", "CopyInfoPublishUrl", {

    /**
     * Whether or not the command is available. If zeroclipboard is active, will add an event to the actual element
     * that when clicked will automatically copy to the clipboard (thus not actually calling execute).
     */
    isAvailable: function (selection) {
        var self = this,
            selectedItem,
            item;

        if (this.isEnabled(selection)) {

            selectedItem = selection.getItems()[0],
            item = $models.getItem(selectedItem);

            this.item = item;
            this._loadItem(item, function () {
                self.pageTemplate = item.getPageTemplate();
                self._loadPageTemplate(self.pageTemplate, function () {
                    if (self.client == null) {
                        self.client = new ZeroClipboard(document.getElementById("cm_copyinfo_publishurl"));
                        self.client.on("ready", function (event) {
                            self.client.on("copy", function (event) {
                                var pageUrl = self._getPublishUrl(self.item.getPublishPath(), self.item.getFileName(), self.pageTemplate.getFileExtension());

                                self.client.setText(pageUrl);
                            });
                        });
                    }

                });
            });
            return true;
        }
        return false;
    },

    /**
     * Whether or not the command is enabled. This command is only available for pages.
     */
    isEnabled: function (selection) {
        var selectedItem,
            item;

        if (!selection || selection.getItems().length !== 1) {
            return false;
        }

        selectedItem = selection.getItems()[0],
        item = $models.getItem(selectedItem);

        // check if the item is of type page
        if (!item || item.getItemTypeName() != "Page") {
            return false;
        }

        return true;
    },

    /**
     * Executes the command. This only gets called if the flash overlay is not being used.
     */
    execute: function (selection) {

        var self = this,
            selectedItem = selection.getItems()[0],
            item = $models.getItem(selectedItem),
            pageTemplate;

        // get the selected item
        console.log('execute publish url');

        this._loadItem(item, function () {
            pageTemplate = item.getPageTemplate();
            self._loadPageTemplate(pageTemplate, function () {
                // we now know item and pageTemplate has all the info we need
                self._showDialog(item.getPublishPath(), item.getFileName(), pageTemplate.getFileExtension());
            });
        });
    },

    /**
     * Gets the publish url format string.
     */
    _getPublishUrl: function (pagePublishPath, pageFileName, pageTemplateFileExtension) {
        var url = pagePublishPath.replace(/\\/g, '/') + "/" + pageFileName + "." + pageTemplateFileExtension;
        if (url.indexOf("//") === 0) {
            url = url.substring(1);
        }
        return url;
    },

    /**
     * Loads the item if the item is not already loaded.
     * @private
     */
    _loadItem: function (item, cb) {
        var loadHandler;

        // if item is loaded, just call the cb
        if (item.isLoaded()) {
            cb();
            return;
        }

        // set the handler for when the item is loaded
        loadHandler = function (event) {
            $evt.removeEventHandler(item, "load", loadHandler);
            cb();
        };
        $evt.addEventHandler(item, "load", loadHandler);

        // load the item
        item.load(false, $const.OpenMode.VIEW);
    },

    /**
     * Loads the page template if its not already loaded, calls the cb if its already loaded (or after it loads).
     * @private
     */
    _loadPageTemplate: function (pageTemplate, cb) {
        var loadHandler;

        // if the pt is already loaded, just call the cb;
        if (pageTemplate.isLoaded()) {
            cb();
            return;
        }

        loadHandler = function (event) {
            $evt.removeEventHandler(pageTemplate, "load", loadHandler);
            cb();
        };

        $evt.addEventHandler(pageTemplate, "load", loadHandler);
        pageTemplate.load(false, $const.OpenMode.VIEW);
    },

    /**
     * Shows the dialog to copy the page url from.
     * @private
     */
    _showDialog: function (pagePublishPath, pageFileName, pageTemplateFileExtension) {
        var pagePublishUrl = this._getPublishUrl(pagePublishPath, pageFileName, pageTemplateFileExtension);
        setTimeout(function () {
            prompt("Copy using Ctrl/Cmd + C:", pagePublishUrl);
        }, 0);
    }
});