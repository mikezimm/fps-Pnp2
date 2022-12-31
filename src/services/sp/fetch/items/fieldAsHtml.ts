
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
// Added after testing and finding issue:  https://github.com/mikezimm/drilldown7/issues/302

import { Web } from "@pnp/sp/webs";

import { check4Gulp } from "../../CheckGulping";
import { IItemsErrorObj } from "./Interface";
import { IMinItemFetchProps } from "./attachments";

export interface IMinFetchItemAsXMLProps extends IMinItemFetchProps {
  webUrl: string;
  listTitle: string;
  Id: number;
  selectThese?: string[];
  expandThese?: string[];
  context?: any; //Not needed until Pnpjs v3
}

export async function fetchItemAsHTML( fetchProps: IMinFetchItemAsXMLProps, ) : Promise<IItemsErrorObj> {

  const { webUrl, listTitle, Id, selectThese, expandThese  } = fetchProps;

  const result: IItemsErrorObj = {
    status: 'Unknown',
    items: [],
    e: null,
  };

  if ( !listTitle ) {
    result.status = 'NoList';

  } else {

    try {

      const selectTheseStr = selectThese ? selectThese.join(',') : '';
      const expandTheseStr = expandThese ? expandThese.join(',') : '';
      const fetchId = typeof Id === 'string' ? parseInt( Id ) : Id;
      const fetchWeb = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);
      const item = await fetchWeb.lists.getByTitle( listTitle ).items.select(selectTheseStr).expand(expandTheseStr).getById( fetchId ).fieldValuesAsHTML()
      result.items = [ item ];
      result.status = 'Success';

      if ( check4Gulp() === true ) { console.log( `fps-Pnp2 Success: fetchItemAsHTML ~ 48`, result ) };

    } catch (e) {

      if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: fetchItemAsHTML ~ 52`, e ) };

      result.status = 'Error';
      result.e = e;

    }
  }

  return result;

}
