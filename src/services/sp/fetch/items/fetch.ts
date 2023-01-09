/**
 * Originally from Drilldown - EasyPages
 */

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";

// sp is only used if you are getting the local web... I think :)
// import { sp } from "@pnp/sp";

import { IItemsErrorObj } from "./Interface";
import { IMinFetchProps } from "./Interface";
import { check4Gulp } from "../../CheckGulping";

export async function fetchAnyItems( fetchProps: IMinFetchProps, ) : Promise<IItemsErrorObj> {

  const { webUrl, listTitle, orderByBoolean, alertMe, consoleLog, fetchCount } = fetchProps;

  // let errorInfo: IHelpfullOutput = null;
  const result: IItemsErrorObj = {
    status: 'Unknown',
    items: [],
    e: null,
  };

  if ( !listTitle ) {
    result.status = 'NoList';
    result.e = 'NoList';

  } else {

    try {
      const selectThese = fetchProps.selectThese ? fetchProps.selectThese.join(',') : '*';
      const expandThese = fetchProps.expandThese ? fetchProps.expandThese.join(',') : '';
      const restFilter = fetchProps.restFilter ? fetchProps.restFilter : '';

      const fetchWeb = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);
      let items : any[]= [];

      const topCount = !fetchCount || fetchCount < 1 ? 200 : fetchCount;

      if ( orderByBoolean ) {
        //This does NOT DO ANYTHING at this moment.  Not sure why.
        items = await fetchWeb.lists.getByTitle( listTitle ).items.select(selectThese).expand(expandThese)
          .top(topCount).filter(restFilter).orderBy( orderByBoolean.prop, orderByBoolean.asc ).get();

      } else {
        items = await fetchWeb.lists.getByTitle( listTitle ).items
        .select(selectThese).expand(expandThese).top(topCount).filter(restFilter).get();
      }

      result.items = items;
      result.status = 'Success';

      if ( check4Gulp() === true ) { console.log( `fps-Pnp2 Success: fetchAnyItems ~ 56`, result ) };

    } catch (e) {

      if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: fetchAnyItems ~ 60`, e ) };
      
      result.status = 'Error';
      result.e = e;

    }
  }

  return result;

}
