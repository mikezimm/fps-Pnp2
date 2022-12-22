import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";
import { check4Gulp } from "../CheckGulping";

export async function saveThisLogItemAsync(web: string, list: string, saveItem: any, muteConsole: boolean = false): Promise<'success' | any> {

  const fullWebUrl: string = web.indexOf('/sites/') === 0 ? `${window.location.origin}${web}` : web;
  let saveWeb = Web(fullWebUrl);

  let result = null;
  try {
    const returnResult = await saveWeb.lists.getByTitle(list).items.add(saveItem);
    if (check4Gulp() === true) { console.log('fps-Pnp2 SUCCESS: saveThisLogItemAsync  ~ 35', web, list, saveItem, returnResult); };
    result = 'Success';

  } catch (e) {
    if (check4Gulp() === true) { console.log(`fps-Pnp2 ERROR: saveThisLogItemAsync ~ 40`, e); };
    result = e;
  }

  return result;

}
