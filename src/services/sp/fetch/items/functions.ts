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



export async function fetchAnyItems( fetchProps: IMinFetchProps, ) : Promise<IItemsErrorObj> {

  const { webUrl, listTitle, orderByBoolean, alertMe, consoleLog } = fetchProps;

  const selectThese = fetchProps.selectThese ? fetchProps.selectThese.join(',') : '*';
  const expandThese = fetchProps.expandThese ? fetchProps.expandThese.join(',') : '';
  const restFilter = fetchProps.restFilter ? fetchProps.restFilter : '';
  const web = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);

  // let errorInfo: IHelpfullOutput = null;
  const result: IItemsErrorObj = {
    items: [],
    e: null,
  };

  try {
    let items : any[]= [];
    if ( orderByBoolean ) {
      //This does NOT DO ANYTHING at this moment.  Not sure why.
      items = await web.lists.getByTitle( listTitle ).items
      .select(selectThese).expand(expandThese).filter(restFilter).orderBy( orderByBoolean.prop, orderByBoolean.asc ).getAll();

    } else {
      items = await web.lists.getByTitle( listTitle ).items
      .select(selectThese).expand(expandThese).filter(restFilter).getAll();
    }

    result.items = items;

  } catch (e) {
    // If it's being run locally, always console.log the error
    if ( window.location.search.match(/debugManifestsFile(.*)manifests.js/gmi) ) { console.log( `fps-Pnp2 ERROR: fetchAnyItems ~43`, e ) };
    result.e = e;
    // const errorInput: IHelpfullInput = { e:e, alertMe:alertMe , consoleLog: consoleLog , traceString: 'fetchAnyItems ~ 42' , logErrors:true };
    // errorInfo = convertHelpfullError( errorInput );
    // saveErrorToLog( errorInfo, errorInput );

  }

  return result;

}
