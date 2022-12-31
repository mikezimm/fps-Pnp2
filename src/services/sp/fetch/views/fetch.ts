
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/views";
import { Web, } from "@pnp/sp/webs";
import { IViewInfo, } from "@pnp/sp/views/types";

import { IItemsErrorObj } from "../items";
import { check4Gulp } from "../../CheckGulping";
import { IMinFetchListProps } from "../lists/fetchListProps";

export interface IViewsErrorObj extends IItemsErrorObj {
  items: IViewInfo[];
}

export async function fetchViews(  fetchProps: IMinFetchListProps ) : Promise<IViewsErrorObj> {

  const { webUrl, listTitle, } = fetchProps ;

  const result: IViewsErrorObj = {
    status: 'Unknown',
    items: [],
    e: null,
  };

  if ( !listTitle ) {
    result.status = 'NoList';

  } else {

    try {
      const selectThese = fetchProps.selectThese ? fetchProps.selectThese.join(',') : '*';
      const restFilter = fetchProps.restFilter ? fetchProps.restFilter : '';

      const fetchWeb = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);

      const views = await fetchWeb.lists.getByTitle(listTitle).views.select(selectThese).filter(restFilter)();

      result.items = views;
      result.status = 'Success';

      if ( check4Gulp() === true ) { console.log( `fps-Pnp2 Success: fetchViews ~ 40`, result ) };

    } catch (e) {

      if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: fetchViews ~ 44`, e ) };
      result.status = 'Error';
      result.e = e;
    }
  }

  return result;

}