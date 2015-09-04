/**
 * Copies the tcm uri of an item to the clipboard.
 */
Alchemy.command("Copy_Info", "CopyInfoTcmUri", {

    /**
     * The zero clipboard client.
     */
    client: null,

        /**
     * Whether or not the command is available.
     */
    isAvailable: function (selection) {
        var self = this,
            selectedItem = selection && selection.getItems().length > 0 ? selection.getItems()[0] : null;
        
        if (selectedItem != null) {

            this.selectedItem = selectedItem;

            if (this.client == null) {

                this.client = new ZeroClipboard(document.getElementById("cm_copyinfo_uri"));

                this.client.on("ready", function (event) {
                    self.client.on("copy", function (event) {
                        self.client.setText(self.selectedItem);
                    });
                });
            }
            return true;
        }

        return false;
    },

    /**
     * Whether or not the command is enabled.
     */
    isEnabled: function (selection) {
      
        if (selection.getItems().length !== 1) {
            return false;
        }
        return true;
    },

    /**
     * Executes the command.
     */
    execute: function (selection) {
        var selectedItem = selection.getItems()[0];

        setTimeout(function () {
            prompt("Copy using Ctrl/Cmd + C:", selectedItem);
        }, 0);
    }
});