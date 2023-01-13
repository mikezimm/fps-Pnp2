
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
import { Web } from "@pnp/sp/webs";
import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";

import { check4Gulp } from "../CheckGulping";
import { IGroupsResults } from "./interfaces/IGroupsResults";

export async function getSiteGroups( webUrl: string, ): Promise<IGroupsResults> {

  if ( !webUrl  ) { return { groups: [], e: 'NoWeb', status: 'NoWeb' } ; }

  try {
    // 2022-12-10:  ???? Verified needed full Url for this call
    const fullWebUrl = webUrl.indexOf('https:') === 0 ? webUrl : window.location.origin + webUrl;

    let thisWeb = Web(fullWebUrl);
    let groups: ISiteGroupInfo[] = await thisWeb.siteGroups.get();

    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 SUCCESS: getSiteGroups ~ 21`, fullWebUrl, groups ) ; };

    return { groups: groups, e: null, status: 'Success' }

  } catch (e) {

    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: getSiteGroups ~ 27`, e ) ; };
    return { groups: [], e: e, status: 'Error' }

  }

}
