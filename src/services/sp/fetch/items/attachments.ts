
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
// Added after testing and finding issue:  https://github.com/mikezimm/drilldown7/issues/302
import "@pnp/sp/attachments";

import { Web } from "@pnp/sp/webs";
import { IAttachmentInfo } from "@pnp/sp/attachments";
// sp is only used if you are getting the local web... I think :)
// import { sp } from "@pnp/sp";

import { check4Gulp } from "../../CheckGulping";
import { IItemsErrorObj } from "./Interface";

export interface IMinItemFetchProps {
  webUrl: string;
  listTitle: string;
  Id: number;
  context?: any; //Not needed until Pnpjs v3
}

export interface IAttachmentsErrorObj extends IItemsErrorObj  {
  items: IAttachmentInfo[];
}

export async function fetchItemAttachments( fetchProps: IMinItemFetchProps, ) : Promise<IAttachmentsErrorObj> {

  const { webUrl, listTitle, Id  } = fetchProps;

  const result: IAttachmentsErrorObj = {
    status: 'Unknown',
    items: [] ,
    e: null,
  };

  if ( !listTitle ) {
    result.status = 'NoList';
    result.e = 'NoList';

  } else {

    try {
      const fetchWeb = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);
      const thisListObject = fetchWeb.lists.getByTitle( listTitle );

      const items = await thisListObject.items.getById( Id ).attachmentFiles();
      result.items = items;
      result.status = 'Success';

      if ( check4Gulp() === true ) { console.log( `fps-Pnp2 Success: fetchItemAttachments ~ 47`, result ) };

    } catch (e) {

      if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: fetchItemAttachments ~ 51`, e ) };
      
      result.status = 'Error';
      result.e = e;

    }
  }

  return result;

}
