using Alchemy4Tridion.Plugins.GUI.Configuration;

namespace Alchemy4Tridion.Plugins.CopyInfo.Configuration
{
    /// <summary>
    /// The CopyInfo context menu extension.
    /// </summary>
    public class CopyInfoContextMenu : ContextMenuExtension
    {
        public CopyInfoContextMenu()
        {
            AssignId = "CopyInfoContextMenu";
            Name = "CopyInfoContextMenu";
            InsertBefore = Constants.ContextMenuIds.MainContextMenu.Paste;
            
            AddSubMenu("cm_copyinfo", "Copy Info")
                .AddItem("cm_copyinfo_title", "Title", "CopyInfoTitle")
                .AddItem("cm_copyinfo_uri", "Tcm Uri", "CopyInfoTcmUri")
                .AddItem("cm_copyinfo_webdav", "WebDavUrl", "CopyInfoWebDav")
                .AddItem("cm_copyinfo_publishurl", "Publish URL", "CopyInfoPublishUrl");

            Dependencies.Add<CopyInfoGroup>();
            Apply.ToView(Constants.Views.DashboardView);
        }
    }
}
