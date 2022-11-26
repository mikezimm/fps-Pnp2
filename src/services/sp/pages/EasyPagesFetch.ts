/**
 * Originally from Drilldown - EasyPages
 */

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";
// sp is only used if you are getting the local web... I think :)
// import { sp } from "@pnp/sp";

import { getExpandColumns, getSelectColumns } from '@mikezimm/fps-js/lib/indexes/PnpjsListGetBasic';
import { getHelpfullErrorV2, IHelpfulOutput, IHelpfullInput } from '@mikezimm/fps-js/lib/indexes/HelpfullErrors';

// copied from /EasyPages/epTypes.ts
export interface ISourceProps {
  // [key: string]: string | string[] | boolean | { prop: string; asc: boolean; } | any |undefined ;
    // defType: IDefSourceType;  //Used in Search Meta function
    defType: string;  //Used in Search Meta function
    webUrl: string;
    listTitle: string;
    webRelativeLink: string;
    viewItemLink?: string;
    columns: string[];
    searchProps: string[];
    selectThese?: string[];
    restFilter?: string;
    evalFilter?: string; //Format of eval
    searchSource: string;
    searchSourceDesc: string;
    itemFetchCol?: string[]; //higher cost columns to fetch on opening panel
    isModern: boolean;
    orderBy?: {
        prop: string;
        asc: boolean;
    };
    EasyPageOverflowTab?: string;
    meta0?: string[];    // Used for quick filtering - aka buttons or Pivots - meta0 is used for things like Type
    meta1?: string[];    // Used for quick filtering - aka buttons or Pivots - meta1 is normal button
    meta2?: string[];   // Used for quick filtering - aka buttons or Pivots - meta2 is normal button
    meta3?: string[];   // Used for quick filtering - aka buttons or Pivots - meta3 is normal button
    metaX?: string[];   // Used for quick filtering - For common filters like Modified and Created metadata

    defSearchButtons: string[];  //These are default buttons always on that source page.  Use case for Manual:  Policy, Instruction etc...

}

export interface IItemsError {
  items: any[];
  errorInfo: IHelpfulOutput;
}

export async function fetchEasyPages( sourceProps: ISourceProps, alertMe: boolean | undefined, consoleLog: boolean | undefined,) : Promise<IItemsError> {

  let items : any[]= [];
  const expColumns = getExpandColumns( sourceProps.columns );
  const selColumns = getSelectColumns( sourceProps.columns );

  const expandThese = expColumns.join(",");
  //Do not get * columns when using standards so you don't pull WikiFields
  const baseSelectColumns = sourceProps.selectThese ? sourceProps.selectThese : sourceProps.columns;
  const selectThese = [ baseSelectColumns, ...selColumns].join(",");
  const restFilter = sourceProps.restFilter ? sourceProps.restFilter : '';
  const orderBy = sourceProps.orderBy ? sourceProps.orderBy : null;

  const web = Web(`${sourceProps.webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${sourceProps.webUrl}`);

  let errorInfo: IHelpfulOutput = null;

  try {
    if ( orderBy ) {
      //This does NOT DO ANYTHING at this moment.  Not sure why.
      items = await web.lists.getByTitle( sourceProps.listTitle ).items
      .select(selectThese).expand(expandThese).filter(restFilter).orderBy(orderBy.prop, orderBy.asc ).getAll();

    } else {
      items = await web.lists.getByTitle( sourceProps.listTitle ).items
      .select(selectThese).expand(expandThese).filter(restFilter).getAll();
    }

  } catch (e) {
    errorInfo = getHelpfullErrorV2( e, alertMe, consoleLog, 'getPagesContent ~ 83');
    saveErrorToLog( returnMess, errObj ? errObj : e, alertMe, consoleLog, traceString );

    console.log('sourceProps', sourceProps );
  }

  return { items: items, errorInfo: errorInfo };

}
