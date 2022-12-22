
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";
import { check4Gulp } from "../CheckGulping";

export function saveThisLogItem ( web: string, list: string, saveItem: any, muteConsole: boolean = false ): 'success' | any {

  const fullWebUrl : string = web.indexOf('/sites/') === 0 ? `${window.location.origin}${web}` : web;
  let saveWeb = Web( fullWebUrl );
  saveWeb.lists.getByTitle( list ).items.add( saveItem ).then((response) => { 
    if ( muteConsole === false && window.location.href.toLowerCase().indexOf('clickster.sharepoint') > 0 ) {
      console.log('+++ saveThisLogItem response:', web, list, saveItem, response );
    }
    return 'success';

  }).catch((e) => {
    // If it's being run locally, always console.log the error
    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: saveThisLogItem ~18`, e ) };
    return e;

  });

}


