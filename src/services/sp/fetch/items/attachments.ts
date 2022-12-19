/**
 * Originally from Drilldown - EasyPages
 */

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";
import { IAttachmentInfo } from "@pnp/sp/attachments";
// sp is only used if you are getting the local web... I think :)
// import { sp } from "@pnp/sp";

import { check4Gulp } from "../../CheckGulping";
import { IFPSResultStatus } from "../../IFPSResultStatus";

export interface IMinItemFetchProps {

  webUrl: string;
  listTitle: string;
  Id: number;
  context?: any; //Not needed until Pnpjs v3

}

export interface IFPSItemAttachmentsReturn {
  status: IFPSResultStatus;
  items: IAttachmentInfo[];
  e: any;
}

export async function fetchItemAttachments( fetchProps: IMinItemFetchProps, ) : Promise<IFPSItemAttachmentsReturn> {

  const { webUrl, listTitle, Id  } = fetchProps;

  // let errorInfo: IHelpfullOutput = null;
  const result: IFPSItemAttachmentsReturn = {
    status: 'Unknown',
    items: [] ,
    e: null,
  };

  try {
    const web = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);
    const thisListWeb = Web( web );
    const thisListObject = thisListWeb.lists.getByTitle( listTitle );

    const items: IAttachmentInfo[] = await thisListObject.items.getById( Id ).attachmentFiles();
    result.items = items;
    result.status = 'Success';

    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 Success: fetchItemAttachments ~ 55`, result ) };

  } catch (e) {

    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: fetchItemAttachments ~ 59`, e ) };

    result.e = e;

  }

  return result;

}
