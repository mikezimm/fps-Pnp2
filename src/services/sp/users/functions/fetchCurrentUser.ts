import { ISiteUser } from "@pnp/sp/site-users/types";
// import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { Web } from "@pnp/sp/webs";
import { check4Gulp } from "../../CheckGulping";
import { IEnsureUserResults } from "../interfaces/IEnsureUserResults";

/***
 *     d888b  d88888b d888888b       .o88b. db    db d8888b. d8888b. d88888b d8b   db d888888b      db    db .d8888. d88888b d8888b.
 *    88' Y8b 88'     `~~88~~'      d8P  Y8 88    88 88  `8D 88  `8D 88'     888o  88 `~~88~~'      88    88 88'  YP 88'     88  `8D
 *    88      88ooooo    88         8P      88    88 88oobY' 88oobY' 88ooooo 88V8o 88    88         88    88 `8bo.   88ooooo 88oobY'
 *    88  ooo 88~~~~~    88         8b      88    88 88`8b   88`8b   88~~~~~ 88 V8o88    88         88    88   `Y8b. 88~~~~~ 88`8b
 *    88. ~8~ 88.        88         Y8b  d8 88b  d88 88 `88. 88 `88. 88.     88  V888    88         88b  d88 db   8D 88.     88 `88.
 *     Y888P  Y88888P    YP          `Y88P' ~Y8888P' 88   YD 88   YD Y88888P VP   V8P    YP         ~Y8888P' `8888Y' Y88888P 88   YD
 *
 *
 */
/**
 * Copied from ExStorage - gets current logged in user from site.
 * @param webUrl
 */

export async function fetchCurrentUser(webUrl: string): Promise<IEnsureUserResults>  {

  try {
    let thisWebInstance = Web(webUrl);
    const user: ISiteUser = await thisWebInstance.currentUser.get();

    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 SUCCESS: fetchCurrentUser ~ 29`, user ) };
    return { user: user, e: null, status: 'Success' }

  } catch (e) {
    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: fetchCurrentUser ~ 33`, e ) };
    return { user: null as any, e: e, status: 'Error' }

  }

}
