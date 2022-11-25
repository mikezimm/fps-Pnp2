
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";

import { getHelpfullError } from './HelpfulLogic'

export function saveThisLogItem ( web: string, list: string, saveItem: any, muteConsole: boolean = false ) {

  const fullWebUrl : string = web.indexOf('/sites/') === 0 ? `${window.location.origin}${web}` : web;
  let saveWeb = Web( fullWebUrl );
  saveWeb.lists.getByTitle( list ).items.add( saveItem ).then((response) => { 
      if ( muteConsole === false && window.location.href.toLowerCase().indexOf('clickster.sharepoint') > 0 ) {
        console.log('+++ saveThisLogItem response:', web, list, saveItem, response );
      }
      return 'success';
    }).catch((e) => {
      if ( muteConsole === false && window.location.href.toLowerCase().indexOf('clickster.sharepoint') > 0 ) {
        console.log('--- saveThisLogItem response:', web, list, saveItem, e );
      }
      console.log('e', getHelpfullError( e, false, true ) );
      return 'failure';
  });

}