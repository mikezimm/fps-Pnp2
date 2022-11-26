
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";

import { getHelpfullError, IHelpfullOutput, IHelpfullInput } from '@mikezimm/fps-js/lib/indexes/HelpfullErrors';
import { getUrlVars, getCurrentPageLink } from './LogFunctions';

/**
 * 
 * @param returnResult 
 * @param alertMe 
 * @param consoleLog 
 * @param traceString :  Format = webpart|analyticsWeb|analyticsList|result|text1|text2|text3|number1|number2
 */

 export function saveErrorToLog ( errorInfo : IHelpfullOutput, errorInput: IHelpfullInput ) {

  const muteConsole = true;
  const { traceString, e, alertMe, consoleLog, logErrors } = errorInput;

  let trace: string[] =  traceString ? traceString.split('|') : [];

  let getParams = JSON.stringify( getUrlVars() ) ;
  let parsedMessage = errorInfo.returnMess.split('-- FULL ERROR MESSAGE:') ;
  let zzzRichText1 = parsedMessage.length > 0 ? parsedMessage[0]: 'No friendly error';
  let zzzRichText2 = parsedMessage.length > 0 ? parsedMessage[1]: errorInfo.returnMess;

  let saveItem: any = {
    Title: trace[0],

    Result: trace[3] ? trace[3] : null,

    zzzText1: trace[4] ? trace[4] : null,
    zzzText2: trace[5] ? trace[5] : null,
    zzzText3: trace[6] ? trace[6] : null,

    zzzText6: typeof alertMe === 'string' ? alertMe : alertMe.toString() ,
    zzzText7: typeof consoleLog === 'string' ? consoleLog : consoleLog.toString() ,

    zzzNumber1: trace[7] ? trace[7] : null,
    zzzNumber2: trace[8] ? trace[8] : null,

    getParams: getParams,
    PageLink: getCurrentPageLink(),
    zzzRichText1: zzzRichText1,
    zzzRichText2: zzzRichText2,

  }

  let webUrl = trace[1] ? trace[1] : '/sites/SecureCDNalytics/';
  let list = trace[2] ? trace[2] : 'GeneralErrorLog';

  saveThisLogItem( webUrl, list, saveItem, muteConsole );

}

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