

//import { getBrowser, amIOnThisWeb, getWebUrlFromLink, getUrlVars,  } from './LogFunctions';
//import { getCurrentPageLink, makeListLink, makeSiteLink, } from './LogFunctions';

import { SimpleLink } from '@mikezimm/fps-js/lib/indexes/LinkInterface';

export function getBrowser(validTypes: any ,changeSiteIcon: any){

  let thisBrowser = "";
  return thisBrowser;

}

export function amIOnThisWeb( webUrl: string ) {

  let result = false;
  let ImOnThisWeb = getWebUrlFromLink( null , 'abs' );
  webUrl = getWebUrlFromLink( webUrl , 'abs' );

  if ( ImOnThisWeb == webUrl ) {
      result = true;
  }

  return result;

}

export function getWebUrlFromLink( SiteLink: string | null, absoluteOrRelative: 'abs' | 'rel' ) {

  if ( !SiteLink || SiteLink === '' ) {
      SiteLink = window.location.pathname ; }
  else { SiteLink = SiteLink + ''; }

  //Remove all search parameters first
  if ( SiteLink.toLowerCase().indexOf('?') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('?')  );  }

  if ( SiteLink.toLowerCase().indexOf('/sitepages/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('/sitepages/')  );  }
  if ( SiteLink.toLowerCase().indexOf('/documents/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('/documents/')  );  }
  if ( SiteLink.toLowerCase().indexOf('/siteassets/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('/siteassets/')  );  }
  if ( SiteLink.toLowerCase().indexOf('/lists/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('/lists/')  );  }
  if ( SiteLink.toLowerCase().indexOf('/_layouts/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('/_layouts/')  );  }
  if ( SiteLink.toLowerCase().indexOf('/forms/') > 0 ) { 
      SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('/forms/') );  
      //Need to take up one more notch
      SiteLink = SiteLink.substr( 0, SiteLink.lastIndexOf('/') );
  }

  if ( absoluteOrRelative === 'abs' ) {
      if ( SiteLink.toLowerCase().indexOf('/sites/') === 0 ) { SiteLink = window.location.origin + SiteLink; } 

  } else if ( absoluteOrRelative === 'rel' ) {
      if ( SiteLink.toLowerCase().indexOf(window.location.origin) === 0 ) { SiteLink = SiteLink.substring( window.location.origin.length ); } 

  } else {
      alert('whoops.... unexpected paramter in getWebUrlFromLink: absoluteOrRelative = ' + absoluteOrRelative );
  }

  return SiteLink;

}

export function getUrlVars() {
  let vars : any = {};
  if ( !location.search || location.search.length === 0 ) { return [] ; }
  vars = location.search
  .slice(1)
  .split('&')
  .map(p => p.split('='))
  .reduce((obj, pair) => {
    const [key, value] = pair.map(decodeURIComponent);
    return ({ ...obj, [key]: value }) ;
  }, {});
  let params = Object.keys(vars).map( k => { return k + '=' + vars[k] ; } );
  return params;
}

export interface ICamelCaseLinkObject {
  Url: string;
  Description: string;
}

export function getCurrentPageLink ( ) : ICamelCaseLinkObject {
  let PageURL = window.location.href;
  let PageTitle = PageURL;
  if ( PageTitle.indexOf('?') > 0 ) { PageTitle = PageTitle.substring(0, PageTitle.indexOf('?') ) ; }  //2021-05-10:  Removed -1 because page title was missing last character.
  let PageLink = {
      'Url': PageURL,
      'Description': PageTitle.substring(PageTitle.lastIndexOf("/") + 1) ,
  };
  return PageLink;
}

export function makeListLink ( TargetList: string , webTitle: string ) : ICamelCaseLinkObject | null {
  let targetList = !TargetList ? null :{
      'Url': TargetList.indexOf('http') === 0 ? TargetList : window.location.origin + TargetList,
      'Description': TargetList.replace(window.location.origin,'').replace(webTitle,'').replace(webTitle.toLowerCase(),'').replace('/lists',''),
  };
  return targetList;

}

export function makeSiteLink ( TargetSite: string, webTitle: string ) : ICamelCaseLinkObject | null {

  let targetSite = !TargetSite ? null : {
      'Url':  TargetSite && TargetSite.indexOf('http') === 0 ? TargetSite : window.location.origin + TargetSite ,
      'Description': webTitle ? webTitle : TargetSite.replace(window.location.origin,'') ,
  };

  return targetSite;
}
