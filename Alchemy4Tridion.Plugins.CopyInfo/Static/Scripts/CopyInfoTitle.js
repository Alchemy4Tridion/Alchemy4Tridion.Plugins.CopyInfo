/**
 * Copies the item's title to the clipboard.
 */
Alchemy.command("Copy_Info", "CopyInfoTitle", {
    
    /**
     * The zero clipboard client.
     */
    client: null,

	/**
     * Whether or not the command is available.
     */
    isAvailable: function (selection) {
        var self = this,
            selectedItem = selection && selection.getItems().length > 0 ? selection.getItems()[0] : null,
            item = selectedItem != null ? $models.getItem(selectedItem) : null;

        if (selectedItem != null && item != null) {
            this.item = item;
			if (this.client == null) {
				this.client = new ZeroClipboard(document.getElementById("cm_copyinfo_title"));
			   
				this.client.on("ready", function (event) {
					self.client.on("copy", function (event) {
						self.client.setText(self.item.getStaticTitle());
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
        var selectedItem = selection.getItems()[0],
            item = $models.getItem(selectedItem);

        setTimeout(function () {
            prompt("Copy using Ctrl/Cmd + C:", item.getStaticTitle());
        }, 0);
    }
});