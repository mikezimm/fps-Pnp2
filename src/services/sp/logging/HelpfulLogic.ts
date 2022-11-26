
import { getUrlVars, getCurrentPageLink } from './LogFunctions';

import { saveThisLogItem } from './SaveErrorToLog';
/***
 *    db       .d88b.   d888b   d888b  d888888b d8b   db  d888b  
 *    88      .8P  Y8. 88' Y8b 88' Y8b   `88'   888o  88 88' Y8b 
 *    88      88    88 88      88         88    88V8o 88 88      
 *    88      88    88 88  ooo 88  ooo    88    88 V8o88 88  ooo 
 *    88booo. `8b  d8' 88. ~8~ 88. ~8~   .88.   88  V888 88. ~8~ 
 *    Y88888P  `Y88P'   Y888P   Y888P  Y888888P VP   V8P  Y888P  
 *                                                               

import { getHelpfullErrorV2 } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

 */

/**
 * 
 * @param e 
 * @param alertMe 
 * @param consoleLog 
 * @param traceString :  Format = webpart|analyticsWeb|analyticsList|result|text1|text2|number1|number2
 * @param logErrors :  This will log any unknown errors to generic error log
 */
export function getHelpfullErrorV2(e : any, alertMe = true, consoleLog = true, traceString: string, logErrors: boolean = true ){

  let returnMess = convertHelpfullError( e, alertMe , consoleLog, traceString, logErrors ) ;
  return returnMess;

}

export function getHelpfullError(e : any, alertMe = true, consoleLog = true, logErrors: boolean = true){

  let returnMess = convertHelpfullError( e, alertMe , consoleLog, null, logErrors ) ;
  return returnMess;

}

interface IErrorX {
  returnMess: string;
  errObj: any;
}

export function convertHelpfullError(e : any, alertMe = true, consoleLog = true, traceString: string | null, logErrors: boolean = true ){
  if ( consoleLog === true ) { console.log('convertHelpfullError:',e); }

  /**
   *  If you change result from 'e', be sure to update in if ( errObj === null...
   */
  let result = 'e'; 

  let errObj: any = null;
    if (e.message) {
      let loc1 = e.message.indexOf("{\"");

      if (loc1 > 0) {
        result = e.message.substring(loc1);
        errObj = JSON.parse(result);

      } else if ( e.message.indexOf('Error making HttpClient request in queryable [404]')) {
        result = 'Error making HttpClient request in queryable [404]';

      } else if ( e.message.indexOf('Failed to fetch')) {
        result = 'Failed to fetch';

      } else if ( e.message !== null || e.message !== undefined ) {
        result = e.message;
      }
  }

  if ( result === 'e' ) { //Then it didn't find 404 or Failed to Fetch
    if ( errObj === null ) {
      result = 'Unknown error... Sorry :(';
    } else if ( errObj['odata.error'] ) {
      result = errObj != null ? errObj['odata.error']['message']['value'] : e.message != null ? e.message : e;
    } else if ( errObj['message'] ) {
      result = errObj != null ? errObj['message']['value'] : e.message != null ? e.message : e;
    }
  }

  let friendlyMessage: string | null = null;

  // Error making HttpClient request in queryable [404] ::>

  if ( result.indexOf("A 'PrimitiveValue' node with non-null value was found when trying to read the value of a navigation property") > -1 ) { friendlyMessage = 'Your Item object may have mis-identied a User column.  BE SURE user column is followed by Id such as:  EditorId'; }

  if (result.indexOf('Access denied') > -1 ) { friendlyMessage = 'Double check your access to this resource.'; }
  if (result.indexOf('Failed to fetch') > -1 ) { friendlyMessage = 'This can happen if the web url is not valid.'; }
  if (result.indexOf('A null value was detected in the items of a collection property value') > -1 ) { friendlyMessage= 'This can happen if you are saving a null value where an array is expected... Maybe try saving an empty array instead :).'; }

  if (result.indexOf('An unexpected \'StartObject\' node was found when reading from the JSON reader. A \'PrimitiveValue\' node was expected.') > -1 ) { 
    friendlyMessage = 'Common causes:  Saving a Url Object or JSON Object to string column.';
  }

  if (result.indexOf("The formula contains a syntax error or is not supported.") > -1 ) { 
    friendlyMessage = 'Common causes:  You have a formula that is not valid.';
  }
  if (result.indexOf("The formula contains a circular reference") > -1 ) { 
    friendlyMessage = 'Common causes:  The formula refers to the current column which creates circular reference.';
  }

  if (result.indexOf('An unexpected \'PrimitiveValue\' node was found when reading from the JSON reader. A \'StartObject\' node was expected') > -1 ) { 
    friendlyMessage = 'Common causes:  Saving a string to a URL column, saving text to multi-select choice column.';
  }
  if (result.indexOf('does not exist') > -1 && result.indexOf('Column') > -1) { 
    friendlyMessage = 'Missing column: ' + result.split('\'')[1]; 
  }
  if (result.indexOf('does not exist on type') > -1 ) { 
    friendlyMessage = 'Missing column: ' + result.split('\'')[1]; 
  }

  if (result.indexOf('does not exist.') > -1 && result.indexOf('field or property') > -1 ) { 
    friendlyMessage = 'Missing column: ' + result.split('\'')[1]; 
  }

  if (result.indexOf('does not exist') > -1 && result.indexOf('List') === 0) { 
    friendlyMessage = 'List : ' + result.split('\'')[1] + ' does not exist on this site: ' + result.split('\'')[4]; 
  }

  if (result.indexOf('Cannot index this column because') > -1 && result.indexOf('maximum number of columns is currently being indexed') > -1) { 
    friendlyMessage = 'Over Indexing : You already have the maximum number of columns indexed on the list.  Not all settings (like choices) will be set properly because of this error.'; 
  }

  if (result.indexOf('document library with the specified title already exists') > -1 ) { friendlyMessage = 'List with title already exists.'; }
  if (result.indexOf('Item does not exist') > -1 ) { friendlyMessage = 'This can happen if you are trying to find something that well... does not exist:).'; }

  if (result.indexOf('Cannot find resource for the request SP.UserProfiles') > -1 ) { friendlyMessage = 'This can happen if you have a typo in a URL:).'; }


  if (result.indexOf('Invalid JSON. The property name \'\' is not valid.') > -1 ) { friendlyMessage = 'Check the code for a place where a single quote was replaced by a backtick.'; }

  if (result.indexOf('Cannot convert a primitive value to the expected type \'Edm.Double\'.') > -1 ) { friendlyMessage = 'You may be trying to save non-number to Number column :).'; }

  if (result.indexOf('Cannot convert a primitive value to the expected type \'Edm.String\'.') > -1 ) { friendlyMessage = 'You may be trying to save a Number or Boolean to String column :).'; }

  if ( friendlyMessage === null ) {
    if (result.indexOf('Cannot convert a primitive value to the expected type \'Edm.') > -1 ) { 
      let parts = result.split( 'Cannot convert a primitive value to the expected type \'Edm.');
      let expectedType = parts[1];
      expectedType = expectedType.substring(0, expectedType.indexOf('\'') );
      friendlyMessage = `You may be trying to save a non-${expectedType} value to a ${expectedType} column :).`
    }
  }

  if (result.indexOf('One or more column references are not allowed, because the columns are defined as a data type that is not supported in formulas.') > -1 ) { friendlyMessage = 'You may be trying to use a Hidden or Non-Existant column in a calculated column.'; }

  if (result.indexOf('The formula refers to a column that does not exist.') > -1 ) { friendlyMessage = 'Check the formula for spelling mistakes and missing or hidden columns'; }

  if (result.indexOf('You do not have permission') > -1 ) { friendlyMessage = 'You do not have access to something.  Double check to make sure you are logged in as well!'; }

  if (result.indexOf('does not exist on type') > -1 &&  result.indexOf('ListItem\'') > -1  && result.indexOf('The property') > -1 ) {
    if ( friendlyMessage != null ) { friendlyMessage += ' AND '; } else { friendlyMessage = ''; }
    friendlyMessage += 'Column: ' + result.split('\'')[1] + ' does not exist on list!';
  }

  if (result.indexOf('does not exist at site with URL') > -1 &&  result.indexOf('List \'') > -1 ) {
    if ( friendlyMessage != null ) { friendlyMessage += ' AND '; } else { friendlyMessage = ''; }
    friendlyMessage += 'List or Library: ' + result.split('\'')[1] + ' does not exist on site!  Maybe try List Name or List Title instead?';
  }

  if ( friendlyMessage === null ) {
    if ( result.indexOf( 'Error making HttpClient request in queryable [404]' ) > -1 ) {
      friendlyMessage = 'Check your site or list URL to make sure it is valid. Error [404]';
    } else if ( result.indexOf( 'Failed to fetch' ) > -1 ) {
      friendlyMessage = 'Failed to fetch:  Check to make sure your Url has the right domain (domain = to the left of /sites/)';
    }
  }

  let returnMess = friendlyMessage === null ? result : 'Ohh Snap!\n' + friendlyMessage + ' \n-- FULL ERROR MESSAGE: \n' + result ;

  if ( logErrors === true && ( traceString !== null && traceString !== undefined && traceString !== '' )  ) {
    saveErrorToLog( returnMess, errObj ? errObj : e, alertMe, consoleLog, traceString );
  }

  if ( consoleLog === true ) { 

    console.log('---===>>> ERROR - ErrorHandler Console Log:');
    console.log('errObj:',errObj);
    console.log('e:',e);
    console.log('result:',result);
    console.log('returnMess:',returnMess);
    console.log('traceString:',traceString);
  }

  if ( alertMe === true ) {

    if ( consoleLog !== true ) { 
      console.log('---===>>> ERROR - ErrorHandler Console Log:');
      console.log('errObj:',errObj);
      console.log('e:',e);
      console.log('result:',result);
      console.log('returnMess:',returnMess);
      console.log('traceString:',traceString);
    }

    if ( traceString && traceString.length > 0 && traceString.indexOf('getSiteInfo ~ 148') > - 1 ) {
      //Skip this particular case because it breaks Easy Contents when clicking on Site Contents links and Gear Links
    } else {
      alert( returnMess );
    }

  }

  return returnMess;

}

/**
 * 
 * @param returnResult 
 * @param alertMe 
 * @param consoleLog 
 * @param traceString :  Format = webpart|analyticsWeb|analyticsList|result|text1|text2|text3|number1|number2
 */

export function saveErrorToLog ( returnMess: string, errObj : any, alertMe : any, consoleLog : any, traceString: string | null, muteConsole: boolean = false ) {

  let trace: string[] =  traceString ? traceString.split('|') : [];

  let getParams = JSON.stringify( getUrlVars() ) ;
  let parsedMessage = returnMess.split('-- FULL ERROR MESSAGE:') ;
  let zzzRichText1 = parsedMessage.length > 0 ? parsedMessage[0]: 'No friendly error';
  let zzzRichText2 = parsedMessage.length > 0 ? parsedMessage[1]: returnMess;

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
