import { IWebEnsureUserResult } from "@pnp/sp/site-users";
import "@pnp/sp/site-users/web";
import { Web } from "@pnp/sp/webs";
import { check4Gulp } from "../../CheckGulping";
import { IEnsureUserResults } from "../interfaces/IEnsureUserResults";

/**
 * This ensures user on other web
 * @param webUrl 
 * @param userEmail 
 * @returns 
 */
export async function ensureUserInfo(webUrl: string, userEmail: string): Promise<IEnsureUserResults> {

  if ( !webUrl || !userEmail ) { return { user: null as any, e: null, status: 'none' } ; }

  try {
    // 2022-12-10:  Verified needed full Url for this call
    const fullWebUrl = webUrl.indexOf('https:') === 0 ? webUrl : window.location.origin + webUrl;

    let thisListWeb = Web(fullWebUrl);

    const user: IWebEnsureUserResult = await thisListWeb.ensureUser(userEmail);

    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 SUCCESS: ensureUserInfo ~ 21`, user ) };

    // 2022-12-10:  Tried passing in user.user but it errored out all the time.  Now testing for .data first
    const userObject: any = user.data ? user.data : user.user;
    return { user: userObject, e: null, status: 'success' }

  } catch (e) {
    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: ensureUserInfo ~ 28`, e ) };
    return { user: null as any, e: e, status: 'error' }

  }

}
