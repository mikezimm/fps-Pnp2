
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import { Web, } from "@pnp/sp/webs";
import { IFieldInfo, } from "@pnp/sp/fields/types";

import { IItemsErrorObj } from "../items";
import { check4Gulp } from "../../CheckGulping";
import { IMinFetchListProps } from "../lists/fetchListProps";

export interface IFieldsErrorObj extends IItemsErrorObj {
  items: IFieldInfo[];
} 

export async function fetchFields(  fetchProps: IMinFetchListProps ) : Promise<IFieldsErrorObj> {

  const { webUrl, listTitle, selectThese, expandThese, restFilter } = fetchProps ;

  const result: IFieldsErrorObj = {
    status: 'Unknown',
    items: [],
    e: null,
  };

  if ( !listTitle ) {
    result.status = 'NoList';

  } else {

    try {
      const selectTheseStr = selectThese ? selectThese.join(',') : '*';
      const restFilterStr = restFilter ? restFilter : '';

      const fetchWeb = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);
      const fields = await fetchWeb.lists.getByTitle(listTitle).fields.orderBy("Title", true).select(selectTheseStr).filter(restFilterStr)();

      result.items = fields;
      result.status = 'Success';

      if ( check4Gulp() === true ) { console.log( `fps-Pnp2 Success: fetchFields ~ 41`, result ) };

    } catch (e) {

      if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: fetchFields ~ 45`, e ) };
      result.e = e;
      result.status = 'Error';
    }

    }

    return result;

}