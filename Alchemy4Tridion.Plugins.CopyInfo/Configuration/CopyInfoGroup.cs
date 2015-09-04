using Alchemy4Tridion.Plugins.GUI.Configuration;

namespace Alchemy4Tridion.Plugins.CopyInfo.Configuration
{
    public class CopyInfoGroup : ResourceGroup
    {
        public CopyInfoGroup()
            : base("CommandFiles")
        {
            AddFile("CopyInfoTcmUri.js");
            AddFile("CopyInfoTitle.js");
            AddFile("CopyInfoWebDav.js");
            AddFile("CopyInfoPublishUrl.js");
            AddFile("copy-info.css");
            AddFile<CopyInfoCommandSet>();

            Dependencies.AddLibraryZeroClipboard();
        }
    }
}
