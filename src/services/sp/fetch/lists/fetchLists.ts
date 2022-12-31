
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import { Web, } from "@pnp/sp/webs";
import { IListInfo, } from "@pnp/sp/lists/types";

import { IItemsErrorObj } from "../items";
import { check4Gulp } from "../../CheckGulping";
import { IMinFetchListProps } from "./fetchListProps";

export interface IListsErrorObj extends IItemsErrorObj {
  items: IListInfo[];
}

export async function fetchLists(  fetchProps: IMinFetchListProps ) : Promise<IListsErrorObj> {

  const { webUrl, listTitle, selectThese, expandThese, restFilter } = fetchProps ;

  const result: IListsErrorObj = {
    status: 'Unknown',
    items: [],
    e: null,
  };

  try {
    const selectTheseStr = selectThese ? selectThese.join(',') : '*';
    const expandTheseStr = expandThese ? expandThese.join(',') : '';
    const restFilterStr = restFilter ? restFilter : '';

    const fetchWeb = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);

    const lists = await fetchWeb.lists.expand( expandTheseStr ).select(selectTheseStr).filter(restFilterStr)();

    result.items = lists;
    result.status = 'Success';

    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 Success: fetchLists ~ 38`, result ) };

  } catch (e) {

    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: fetchLists ~ 42`, e ) };
    result.status = 'Error';
    result.e = e;
  }

  return result;

}