import { Web } from "@pnp/sp/webs";
import { check4Gulp } from "../../CheckGulping";
import { ISiteUsersResults } from "../interfaces/ISiteUsersResults";

export async function fetchSiteUsers(url: string, ): Promise<ISiteUsersResults> {

  if ( !url ) { return { users: null, e: null, status: 'none' } ; }

  try {

    url = `${url}`; // Did this because it previosly had + '' at the end... not sure why
    const thisWeb = Web(url);

    const allUsers = await thisWeb.siteUsers.get();
    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 SUCCESS: fetchSiteUsers ~18`, allUsers ) ; };
    return { users: allUsers, e: null, status: 'success' }

  } catch (e) {
    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: fetchSiteUsers ~22`, e ) ; };
    return { users: null, e: e, status: 'error' }

  }

}
