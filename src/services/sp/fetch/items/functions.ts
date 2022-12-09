/**
 * Originally from Drilldown - EasyPages
 */

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";
// sp is only used if you are getting the local web... I think :)
// import { sp } from "@pnp/sp";

import { IHelpfullOutput, IHelpfullInput, convertHelpfullError } from '@mikezimm/fps-js/lib/indexes/HelpfullErrors';

import { saveErrorToLog } from '../../logging/SaveErrorToLog';
import { IItemsError } from "./Interface";
import { IMinFetchProps } from "./Interface";

export async function fetchAnyItems( fetchProps: IMinFetchProps, ) : Promise<IItemsError> {

  const { webUrl, listTitle, orderByBoolean, alertMe, consoleLog } = fetchProps;
  let items : any[]= [];

  const selectThese = fetchProps.selectThese ? fetchProps.selectThese.join(',') : '*';
  const expandThese = fetchProps.expandThese ? fetchProps.expandThese.join(',') : '';
  const restFilter = fetchProps.restFilter ? fetchProps.restFilter : '';
  const web = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);

  let errorInfo: IHelpfullOutput = null;

  try {
    if ( orderByBoolean ) {
      //This does NOT DO ANYTHING at this moment.  Not sure why.
      items = await web.lists.getByTitle( listTitle ).items
      .select(selectThese).expand(expandThese).filter(restFilter).orderBy( orderByBoolean.prop, orderByBoolean.asc ).getAll();

    } else {
      items = await web.lists.getByTitle( listTitle ).items
      .select(selectThese).expand(expandThese).filter(restFilter).getAll();
    }

  } catch (e) {
    const errorInput: IHelpfullInput = { e:e, alertMe:alertMe , consoleLog: consoleLog , traceString: 'getPagesContent ~ 83' , logErrors:true };
    errorInfo = convertHelpfullError( errorInput );
    saveErrorToLog( errorInfo, errorInput );

  }

  return { items: items, errorInfo: errorInfo };

}
