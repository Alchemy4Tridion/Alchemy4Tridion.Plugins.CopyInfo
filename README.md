# Alchemy4Tridion.Plugins.CopyInfo

Source repository for the Alchemy4Tridion Copy Info plugin. To see or download the actual plugin, please check out http://www.alchemywebstore.com/plugins/555e2ed73913f516a090e5ca.

This plugin uses zeroclipboard to copy item info straight to the clipboard if flash is available, else it'll open up a prompt dialog with the text selected so that you can use manually do a ctrl-c to copy.

Due to zeroclipboard client initialization, there is a potential race condition where if the menu item was clicked too soon, you'll get a prompt for manual copy to clipboard.