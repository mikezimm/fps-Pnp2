
// Not needed confirmed via testing 2022-12-10
// import { IList } from "@pnp/sp/lists";
// import "@pnp/sp/lists";
// import "@pnp/sp/webs";

import "@pnp/sp/lists/web";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";

import { check4Gulp } from "../../CheckGulping";
import { ISiteUsersResults } from "../interfaces/ISiteUsersResults";

export async function fetchSiteAdmins( webUrl: string ): Promise<ISiteUsersResults> {

  if ( !webUrl ) { return { users: null as any, e: null, status: 'NoWeb' } ; }

  try {
    let thisWeb = Web(webUrl);

    //let adminFilter = "IsSiteAdmin eq true"; //This did not work....
    let adminFilter = "IsSiteAdmin eq 1"; //Updated per @koltyakov: https://github.com/pnp/pnpjs/issues/1480
    const siteAdmins = await thisWeb.siteUserInfoList.items.filter(adminFilter).get();

    // This was added because loginName is not retured but is in other functions so it just copies it to make it easier to resuse.
    siteAdmins.map(user => {
      if (!user.loginName && user.Name) { user.loginName = user.Name; }
      if (!user.Email && user.EMail) { user.Email = user.EMail; }
    });

    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 SUCCESS: fetchSiteAdmins ~ 22`, siteAdmins ) ; };
    return { users: siteAdmins, e: null, status: 'Success' }

  } catch (e) {
    if ( check4Gulp() === true ) { console.log( `fps-Pnp2 ERROR: fetchSiteAdmins ~ 26`, e ) ; };
    return { users: null as any, e: e, status: 'Error' }

  }

}
