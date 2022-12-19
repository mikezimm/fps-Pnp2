/***
 *    d88888b d8b   db .d8888. db    db d8888b. d88888b      db    db .d8888. d88888b d8888b.      d888888b d8b   db d88888b  .d88b.
 *    88'     888o  88 88'  YP 88    88 88  `8D 88'          88    88 88'  YP 88'     88  `8D        `88'   888o  88 88'     .8P  Y8.
 *    88ooooo 88V8o 88 `8bo.   88    88 88oobY' 88ooooo      88    88 `8bo.   88ooooo 88oobY'         88    88V8o 88 88ooo   88    88
 *    88~~~~~ 88 V8o88   `Y8b. 88    88 88`8b   88~~~~~      88    88   `Y8b. 88~~~~~ 88`8b           88    88 V8o88 88~~~   88    88
 *    88.     88  V888 db   8D 88b  d88 88 `88. 88.          88b  d88 db   8D 88.     88 `88.        .88.   88  V888 88      `8b  d8'
 *    Y88888P VP   V8P `8888Y' ~Y8888P' 88   YD Y88888P      ~Y8888P' `8888Y' Y88888P 88   YD      Y888888P VP   V8P YP       `Y88P'
 *
 *
 */

import { ISiteUser } from "@pnp/sp/site-users/types";
import { IFPSResultStatus } from "../../IFPSResultStatus";

export interface IEnsureUserResults {
  user: ISiteUser;
  e: any;
  status: IFPSResultStatus;
}
