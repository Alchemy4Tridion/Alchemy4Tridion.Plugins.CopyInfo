using Alchemy4Tridion.Plugins.GUI.Configuration;

namespace Alchemy4Tridion.Plugins.CopyInfo.Configuration
{
    /// <summary>
    /// The command set containing all of the copy info commands.
    /// </summary>
    public class CopyInfoCommandSet : CommandSet
    {
        public CopyInfoCommandSet()
        {
            AddCommand("CopyInfoTcmUri");
            AddCommand("CopyInfoTitle");
            AddCommand("CopyInfoWebDav");
            AddCommand("CopyInfoPublishUrl");
        }
    }
}
