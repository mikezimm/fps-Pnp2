
// from:  window.location.search.match(/debugManifestsFile(.*)manifests.js/gmi)
export const gulpRegex  = new RegExp( `debugManifestsFile(.*)manifests.js`, 'gmi' );

export function check4Gulp() : boolean {
  if ( window.location.search.match( gulpRegex ) ) { 
    return true;

  } else { 
    return false ;
  };
}

