import { Web } from "@pnp/sp/webs";
import { check4Gulp } from "../CheckGulping";
import { IEnsureUserResults } from "./IEnsureUserResults";

/**
 * This ensures user on other web
 * @param webUrl 
 * @param userEmail 
 * @returns 
 */
export async function ensureUserInfo(webUrl: string, userEmail: string): Promise<IEnsureUserResults> {

  if ( !webUrl || !userEmail ) { return { user: null, e: null, status: 'none' } ; }

  try {
    let thisListWeb = Web(webUrl);
    const user = await thisListWeb.ensureUser(userEmail);
    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 SUCCESS: ensureUserInfo ~19`, user ) };
    return { user: user, e: null, status: 'success' }

  } catch (e) {
    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: ensureUserInfo ~23`, e ) };
    return { user: null, e: e, status: 'error' }

  }

}
