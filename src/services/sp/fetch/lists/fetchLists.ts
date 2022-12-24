
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import { Web, } from "@pnp/sp/webs";

import { IItemsErrorObj } from "../items";
import { check4Gulp } from "../../CheckGulping";
import { IMinFetchListProps } from "./fetchListProps";

// export async function clickFetchFields(  list: IMinListProps, setState: any, updatePerformance: any ) : Promise<void> {
export async function fetchLists(  fetchProps: IMinFetchListProps ) : Promise<IItemsErrorObj> {

  const { webUrl, listTitle, selectThese, expandThese, restFilter } = fetchProps ;

  const result: IItemsErrorObj = {
    status: 'Unknown',
    items: [],
    e: null,
  };

  try {
    const selectTheseStr = selectThese ? selectThese.join(',') : '*';
    const expandTheseStr = expandThese ? expandThese.join(',') : '';
    const restFilterStr = restFilter ? restFilter : '';

    const fetchWeb = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);

    const lists : any[] = await fetchWeb.lists.expand( expandTheseStr ).select(selectTheseStr).filter(restFilterStr)();

    result.items = lists;
    result.status = 'Success';

    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 Success: fetchLists ~ 38`, result ) };

  } catch (e) {
    // If it's being run locally, always console.log the error
    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: fetchLists ~ 42`, e ) };
    result.e = e;
    result.status = 'Error';
  }

  return result;

}