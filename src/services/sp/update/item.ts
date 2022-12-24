/**
 * Originally from Drilldown - EasyPages
 */

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";
import { IItemUpdateResult } from "@pnp/sp/items";
import { IFPSResultStatus } from "../IFPSResultStatus";
// sp is only used if you are getting the local web... I think :)
// import { sp } from "@pnp/sp";


export interface IMinUpdateProps {
  webUrl: string;
  listTitle: string;
  Id: number;
  itemUpdate: any;
}

export interface IFPSItemUpdateResultObj {
  status: IFPSResultStatus; 
  response?: IItemUpdateResult ;
  e: any;
}

export async function updateAnyItem( updateProps: IMinUpdateProps, ) : Promise<IFPSItemUpdateResultObj> {

  const { webUrl, listTitle, Id, itemUpdate } = updateProps;

  const result: IFPSItemUpdateResultObj = {
    status: 'Unknown',
    e: null,
  };

  try {
    const fetchWeb = Web( webUrl );

    let thisListObject = fetchWeb.lists.getByTitle( listTitle );

    const response: IItemUpdateResult = await thisListObject.items.getById( Id ).update( itemUpdate );
    result.response = response;
    result.status = 'Success';

  } catch (e) {

    result.e = e;
    result.status = 'Error';
  }

  return result;

}
