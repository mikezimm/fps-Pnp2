import { IWebEnsureUserResult } from "@pnp/sp/site-users/types";
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

  if ( !webUrl  ) { return { user: null as any, e: null, status: 'NoWeb' } ; }
  if ( !userEmail ) { return { user: null as any, e: null, status: 'NoUser' } ; }

  try {
    // 2022-12-10:  Verified needed full Url for this call
    const fullWebUrl = webUrl.indexOf('https:') === 0 ? webUrl : window.location.origin + webUrl;

    let thisListWeb = Web(fullWebUrl);

    const user: IWebEnsureUserResult = await thisListWeb.ensureUser(userEmail);

    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 SUCCESS: ensureUserInfo ~ 26`, user ) };

    // 2022-12-10:  Tried passing in user.user but it errored out all the time.  Now testing for .data first
    const userObject: any = user.data ? user.data : user.user;
    return { user: userObject, e: null, status: 'Success' }

  } catch (e) {
    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: ensureUserInfo ~ 33`, e ) };
    return { user: null as any, e: e, status: 'Error' }

  }

}
