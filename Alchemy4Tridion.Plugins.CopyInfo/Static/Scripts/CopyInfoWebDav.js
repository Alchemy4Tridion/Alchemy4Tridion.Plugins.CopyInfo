/**
 * Command for copying the webdav url to the clipboard.
 */
Alchemy.command("Copy_Info", "CopyInfoWebDav", {

    /**
     * The zero clipboard client for the given element.
     */
    client: null,

    /**
     * Whether or not the command is available.
     */
    isAvailable: function (selection) {
        var self = this,
            selectedItem = selection && selection.getItems().length > 0 ? selection.getItems()[0] : null,
            item = selectedItem != null ? $models.getItem(selectedItem) : null,
            hasNoWebDav = true;
    
        if (this.isEnabled(selection)) {
            this.item = item;
            this._loadWebDavUrl(item, function () {
                if (self.client == null) {
                    self.client = new ZeroClipboard(document.getElementById("cm_copyinfo_webdav"));

                    self.client.on("ready", function (event) {
                        self.client.on("copy", function (event) {
                            self.client.setText(self.item.getWebDavUrl());
                        });
                    });
                }
            });
            return true;
        }

        return false;
    },

    /**
     * Whether or not the command is enabled.
     */
    isEnabled: function (selection) {
        var selectedItem = selection && selection.getItems().length > 0 ? selection.getItems()[0] : null,
            item = selectedItem != null ? $models.getItem(selectedItem) : null,
            hasNoWebDav;

        if (selectedItem == null || item == null) {
            return false;
        }

        hasNoWebDav = (item.getItemType().indexOf("tcm:") !== 0);

        if (hasNoWebDav) {
            return false;
        }

        return true;
    },

    /**
     * Executes the command.
     */
    execute: function (selection) {
        var selectedItem = selection.getItems()[0],
            item = $models.getItem(selectedItem),
            hasNoWebDav = true;

        // we'll just keep it simple for now, assume anything with tcm: has webdav.
        hasNoWebDav = (item.getItemType().indexOf("tcm:") !== 0);

        if (!hasNoWebDav) {
            this._loadWebDavUrl(item, function () {
                setTimeout(function () {
                    prompt("Copy using Ctrl/Cmd + C:", item.getWebDavUrl());
                }, 0);
            });
        }
    },

    /**
     * Loads the webdavurl if not already loaded then calls the cb, otherwise just calls the cb immediately if it is.
     * @private
     */
    _loadWebDavUrl: function (item, cb) {
        var hasNoWebDav = (item.getItemType().indexOf("tcm:") !== 0),
            loadHandler;

        if (!hasNoWebDav) {
            try {
                if (item.getWebDavUrl()) {
                    cb();
                    return;
                }

                loadHandler = function () {
                    $evt.removeEventHandler(item, "loadwebdavurl", loadHandler);
                    cb();
                };
                $evt.addEventHandler(item, "loadwebdavurl", loadHandler);
                item.loadWebDavUrl();
            } catch (e) {
                console.error("Error loading webdavurl:", e);
            }
        }
    }
});