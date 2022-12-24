
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/views";
import { Web, IWeb } from "@pnp/sp/webs";

import { IItemsErrorObj } from "../items";
import { check4Gulp } from "../../CheckGulping";
import { IMinFetchListProps } from "../lists/fetchListProps";

export async function fetchViews(  fetchProps: IMinFetchListProps ) : Promise<IItemsErrorObj> {

  const { webUrl, listTitle, } = fetchProps ;

  const result: IItemsErrorObj = {
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

      const views : any[] = await fetchWeb.lists.getByTitle(listTitle).views.select(selectThese).filter(restFilter)();

      result.items = views;
      result.status = 'Success';

      if ( check4Gulp() === true ) { console.log( `fps-Pnp2 Success: fetchViews ~ 40`, result ) };

    } catch (e) {
      // If it's being run locally, always console.log the error
      if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: fetchViews ~ 44`, e ) };
      result.e = e;
      result.status = 'Error';
    }
  }

  return result;

}