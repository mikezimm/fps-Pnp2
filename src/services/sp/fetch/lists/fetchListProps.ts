/**
 * Originally from Drilldown - EasyPages
 */

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";
// sp is only used if you are getting the local web... I think :)
// import { sp } from "@pnp/sp";

import { check4Gulp } from "../../CheckGulping";
import { IFPSResultStatus } from "../../IFPSResultStatus";
import { IListInfo } from "@pnp/sp/lists/types";


export interface IMinFetchListProps {
  webUrl: string;
  listTitle: string;
  selectThese?: string[];
  restFilter?: string;
  expandThese?: string[];
  context?: any; //Not needed until Pnpjs v3
}

export interface IListErrorObj {
  status: IFPSResultStatus;
  list: IListInfo | null;
  e: any;
}

export async function fetchListProps( fetchProps: IMinFetchListProps, ) : Promise<IListErrorObj> {

  const { webUrl, listTitle, selectThese, expandThese } = fetchProps;

  // let errorInfo: IHelpfullOutput = null;
  const result: IListErrorObj = {
    status: 'Unknown',
    list: null,
    e: null,
  };

  if ( !listTitle ) {
    result.status = 'NoList';

  } else {

    try {

      const selectTheseStr = selectThese ? selectThese.join(',') : '*';
      const expandTheseStr = expandThese ? expandThese.join(',') : '';

      const fetchWeb = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);

      const thisListObject = fetchWeb.lists.getByTitle(listTitle);
      const list: IListInfo = await thisListObject.expand( expandTheseStr ).select( selectTheseStr ).get();

      result.list = list;
      result.status = 'Success';

      if ( check4Gulp() === true ) { console.log( `fps-Pnp2 Success: fetchListProps ~ 55`, result ) };

    } catch (e) {
      // If it's being run locally, always console.log the error
      if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: fetchListProps ~ 59`, e ) };
      result.e = e;
      result.status = 'Error';

    }
  }

  return result;

}
