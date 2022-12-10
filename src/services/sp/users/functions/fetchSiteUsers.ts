import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { Web } from "@pnp/sp/webs";
import { check4Gulp } from "../../CheckGulping";
import { ISiteUsersResults } from "../interfaces/ISiteUsersResults";

export async function fetchSiteUsers(url: string, ): Promise<ISiteUsersResults> {

  if ( !url ) { return { users: null, e: null, status: 'none' } ; }

  try {

    url = `${url}`; // Did this because it previosly had + '' at the end... not sure why
    const thisWeb = Web(url);

    const allUsers: ISiteUserInfo[] = await thisWeb.siteUsers.get();

    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 SUCCESS: fetchSiteUsers ~17`, allUsers ) ; };
    return { users: allUsers, e: null, status: 'success' }

  } catch (e) {
    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: fetchSiteUsers ~21`, e ) ; };
    return { users: null, e: e, status: 'error' }

  }
}
