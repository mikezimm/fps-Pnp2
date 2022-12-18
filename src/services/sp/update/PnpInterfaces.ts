
/**
 * Portions of interfaces copied from Pnp
 * node_modules\@pnp\sp\items\types.d.ts
 */

export interface IResourcePath {
  DecodedUrl: string;
  __metadata: {
      type: "SP.ResourcePath";
  };
}

export interface IItemAddResult {
  item: any;  // IItem in actual interface
  data: any;
}

export interface IItemUpdateResult {
  item: any;  // IItem in actual interface
  data: IItemUpdateResultData;
}

export interface IItemUpdateResultData {
  "odata.etag": string;
}

export interface IItemImageUploadResult {
  Name: string;
  ServerRelativeUrl: string;
  UniqueId: string;
}

export interface IItemDeleteParams {
  /**
   * If true, delete or recycle a file when the LockType
   * value is SPLockType.Shared or SPLockType.None.
   * When false, delete or recycle the file when
   * the LockType value SPLockType.None.
   */
  BypassSharedLock: boolean;
}

export interface IItemParentInfos {
  Item: {
      Id: string;
  };
  ParentList: {
      Id: string;
      Title: string;
      RootFolderServerRelativePath: IResourcePath;
      RootFolderServerRelativeUrl: string;
      RootFolderUniqueId: string;
  };
  ParentWeb: {
      Id: string;
      ServerRelativePath: IResourcePath;
      ServerRelativeUrl: string;
      Url: string;
  };
}