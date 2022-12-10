import { Web } from "@pnp/sp/webs";
import { check4Gulp } from "../CheckGulping";
import { IEnsureUserResults } from "./IEnsureUserResults";
/***
 *    d88888b d8b   db .d8888. db    db d8888b. d88888b      db    db .d8888. d88888b d8888b.      db   db d88888b d8888b. d88888b
 *    88'     888o  88 88'  YP 88    88 88  `8D 88'          88    88 88'  YP 88'     88  `8D      88   88 88'     88  `8D 88'
 *    88ooooo 88V8o 88 `8bo.   88    88 88oobY' 88ooooo      88    88 `8bo.   88ooooo 88oobY'      88ooo88 88ooooo 88oobY' 88ooooo
 *    88~~~~~ 88 V8o88   `Y8b. 88    88 88`8b   88~~~~~      88    88   `Y8b. 88~~~~~ 88`8b        88~~~88 88~~~~~ 88`8b   88~~~~~
 *    88.     88  V888 db   8D 88b  d88 88 `88. 88.          88b  d88 db   8D 88.     88 `88.      88   88 88.     88 `88. 88.
 *    Y88888P VP   V8P `8888Y' ~Y8888P' 88   YD Y88888P      ~Y8888P' `8888Y' Y88888P 88   YD      YP   YP Y88888P 88   YD Y88888P
 *
 *
 */
/**
 *
 * @param loginName  2021-03-01:  should really be string | undefined but set to any to get into npmfunctions
 * @param webUrl
 * @param supressSaveConflict
 */

export async function ensureUserHere(loginName: string | undefined, webUrl: string, supressSaveConflict: boolean): Promise<IEnsureUserResults> {

  if ( !webUrl || !loginName ) { return { user: null, e: null, status: 'none' } ; }

  let thisListWeb = Web(webUrl);

  try {
    const user = await thisListWeb.ensureUser(loginName);
    const users = thisListWeb.siteUsers;
    await users.add(user.data.LoginName);
    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 SUCCESS: ensureUserHere ~31`, user, users ) ; };

    return { user: user, e: null, status: 'success' }

  } catch (e) {

    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: ensureUserHere ~37`, e ) ; };
    return { user: null, e: e, status: 'error' }

  }

}
