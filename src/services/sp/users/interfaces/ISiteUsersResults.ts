/***
*     d888b  d88888b d888888b      .d8888. d888888b d888888b d88888b       .d8b.  d8888b. .88b  d88. d888888b d8b   db .d8888.
*    88' Y8b 88'     `~~88~~'      88'  YP   `88'   `~~88~~' 88'          d8' `8b 88  `8D 88'YbdP`88   `88'   888o  88 88'  YP
*    88      88ooooo    88         `8bo.      88       88    88ooooo      88ooo88 88   88 88  88  88    88    88V8o 88 `8bo.
*    88  ooo 88~~~~~    88           `Y8b.    88       88    88~~~~~      88~~~88 88   88 88  88  88    88    88 V8o88   `Y8b.
*    88. ~8~ 88.        88         db   8D   .88.      88    88.          88   88 88  .8D 88  88  88   .88.   88  V888 db   8D
*     Y888P  Y88888P    YP         `8888Y' Y888888P    YP    Y88888P      YP   YP Y8888D' YP  YP  YP Y888888P VP   V8P `8888Y'
*
*
*/

import { ISiteUserInfo } from "@pnp/sp/site-users/types";

export interface ISiteUsersResults {
  users: ISiteUserInfo[];
  e: any;
  status: 'success' | 'error' | 'none';
}
