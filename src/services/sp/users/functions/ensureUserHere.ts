import { IWebEnsureUserResult } from "@pnp/sp/site-users/types";
import "@pnp/sp/site-users/web";
import { Web } from "@pnp/sp/webs";
import { check4Gulp } from "../../CheckGulping";
import { IEnsureUserResults } from "../interfaces/IEnsureUserResults";

/**
 *  NOTE:  THIS IS SAME AS ensureUserInfo EXCEPT IT TRIES TO ADD USER IF NOT THERE.
 *  WHY IS THIS NEEDED?  ADDING ISSUE TO ACTION NEWS which is what called it
 *  https://github.com/mikezimm/actionnews/issues/14
 * 
 * @param loginName  2021-03-01:  should really be string | undefined but set to any to get into npmfunctions
 * @param webUrl
 * @param supressSaveConflict
 */

export async function ensureUserHere(loginName: string | undefined, webUrl: string, ): Promise<IEnsureUserResults> {

  if ( !webUrl  ) { return { user: null as any, e: null, status: 'NoWeb' } ; }
  if ( !loginName ) { return { user: null as any, e: null, status: 'NoUser' } ; }

  try {
    // 2022-12-10:  Verified needed full Url for this call
    const fullWebUrl = webUrl.indexOf('https:') === 0 ? webUrl : window.location.origin + webUrl;

    let thisListWeb = Web(fullWebUrl);
    
    const user: IWebEnsureUserResult = await thisListWeb.ensureUser(loginName);
    const users = thisListWeb.siteUsers;
    await users.add(user.data.LoginName);

    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 SUCCESS: ensureUserHere ~ 32`, user, users ) ; };
    // 2022-12-10:  Tried passing in user.user but it errored out all the time.  Now testing for .data first
    const userObject: any = user.data ? user.data : user.user;
    return { user: userObject, e: null, status: 'Success' }

  } catch (e) {

    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: ensureUserHere ~ 39`, e ) ; };
    return { user: null as any, e: e, status: 'Error' }

  }

}
