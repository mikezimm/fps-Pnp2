/**
 * Originally from Drilldown - EasyPages
 */

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";
import { IItemUpdateResult } from "@pnp/sp/items";
import { IFPSResultStatus } from "../IFPSResultStatus";
import { check4Gulp } from "../CheckGulping";
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

    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 Success: updateAnyItem ~ 47`, result ) };

  } catch (e) {
    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: updateAnyItem ~ 50`, e ) };

    result.status = 'Error';
    result.e = e;
  }

  return result;

}
