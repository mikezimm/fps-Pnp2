import { IWebEnsureUserResult } from "@pnp/sp/site-users";
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

  if ( !webUrl || !loginName ) { return { user: null, e: null, status: 'none' } ; }

  let thisListWeb = Web(webUrl);

  try {
    const user: IWebEnsureUserResult = await thisListWeb.ensureUser(loginName);
    const users = thisListWeb.siteUsers;
    await users.add(user.data.LoginName);

    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 SUCCESS: ensureUserHere ~27`, user, users ) ; };
    return { user: user.user, e: null, status: 'success' }

  } catch (e) {

    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: ensureUserHere ~32`, e ) ; };
    return { user: null, e: e, status: 'error' }

  }

}
