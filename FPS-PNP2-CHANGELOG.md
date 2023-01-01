# Publish hints:

npm run clean
npm run build
npm version major/minor/patch
npm publish --access=public

npm install @mikezimm/fps-pnp2@1.0.27

# Changelog

## 1.0.27 - 2022-Dec-23:  ALVFinMan fetchItemAsHTML
- add IItemErrorObj as return object for fetchItemAsHTML

## 1.0.26 - 2022-Dec-23:  ALVFinMan fetchItemAsHTML
- add fetchItemAsHTML from ALVFinMan
- standardize fetches to all include error result and put in same order

## 1.0.25 - 2022-Dec-23:  Drilldown attachments
- update fetch attachments from issue:  https://github.com/mikezimm/drilldown7/issues/302

## 1.0.24 - 2022-Dec-23:  Drilldown GetSourceItems
- remove fetchSourceItems.  Now getSourceItems in fps-library-v2 is the replacement

## 1.0.23 - 2022-Dec-23:  Drilldown Updates
- standardize fetch return object interfaces

## 1.0.22 - 2022-Dec-23:  Drilldown Updates
- add fetchFields : src\services\sp\fetch\fields\fetch.ts
- add fetchViews  :  src\services\sp\fetch\views\fetch.ts
- add fetchLists  : src\services\sp\fetch\lists\fetchLists.ts

## 1.0.21 - 2022-Dec-21:  Drilldown Updates
- add IFPSResultStatus to IFPSResultStatus

## 1.0.20 - 2022-Dec-21:  Drilldown Updates
- add saveThisLogItemAsync with await this time

## 1.0.18 - 2022-Dec-21:  Drilldown Updates
- fix double web setup in fetchListProps

## 1.0.17 - 2022-Dec-17:  Drilldown Updates
- changed IFPSResultStatus from 'Failed' to 'Error'
- changed all return status values to IFPSResultStatus for consistancy
- added more result status if it does not pass initial check like 'NoWeb'
- export type IFPSResultStatus = 'Unknown' | 'Success' | 'Error' | 'NoWeb' | 'NoList' | 'NoItem' | 'NoUser';


## 1.0.15 - 2022-Dec-10:  Drilldown Updates
- change filename from src\services\sp\fetch\lists\functions.ts to fetchListProps

## 1.0.14 - 2022-Dec-10:  Drilldown Updates
- add fetchCount to fetchAnyItems

## 1.0.13 - 2022-Dec-10:  Drilldown Updates
- add common status IFPSResultStatus Fetch Item IItemsErrorObj
- add fetch Item Attachments:  src\services\sp\fetch\items\attachments.ts
- add fetch List Info:  src\services\sp\fetch\lists\functions.ts
- add update item:  src\services\sp\update\item.ts

## 1.0.12 - 2022-Dec-10
- remove userServices (commented out)
- removed dependancy on fps-js

## 1.0.11 - 2022-Dec-10
- tighten tsconfig rules
- fixes when turning on tsconfig rules:
    "strictNullChecks": true, ==>> reduced to false after some udpates/fixes
    "noUnusedLocals": true, ==>> reduced to false after some udpates/fixes
    "noImplicitAny": true,

## 1.0.10 - 2022-Dec-10
- Fix casing in src/index.ts /sp/Users to /sp/users

## 1.0.9 - 2022-Dec-10
- Fixed errors in ensureUserHere and ensureUserInfo per below:
- Tried passing in user.user but it errored out all the time.  Now testing for .data first
    const userObject: any = user.data ? user.data : user.user;
    return { user: userObject, e: null, status: 'success' }
- Tested full and relative Urls and relative Urls errored out.  Added
    const fullWebUrl = webUrl.indexOf('https:') === 0 ? webUrl : window.location.origin + webUrl;
    let thisListWeb = Web(fullWebUrl);

## 1.0.8 - 2022-Dec-10
- update fetchSiteAdmins: add (per testing) - import { IList } from "@pnp/sp/lists";

## 1.0.7 - 2022-Dec-10
- update pnp imports to include required things.  Originally found from testing fetchSiteAdmins

## 1.0.6 - 2022-Dec-09
- added proper pnp fetch interfaces to user functions

## 1.0.5 - 2022-Dec-09
- restructured users folder.  Added index to combine all functions with their return interface

## 1.0.4 - 2022-Dec-09
- rebuild src\services\sp\users\userServices.ts into files, move logic up to fps-library-v2

## 1.0.3 - 2022-Dec-09
Cleaned fetch items to bare min required to fetch, including ALVFinMan Source prepper
Cleaned logging to only save log item, moving the response cleanup logic to fps-library-v2
Moved all other logic to fps-library-v2

## 1.0.2 - 2202-Nov-30
add src\services\sp\users\userServices.ts

## 1.0.1 - 2202-Nov-27
update EasyPagesFetch.ts: const selectThese = [ ...baseSelectColumns, ...selColumns].join(",");

## 1.0.0 - 2202-Nov-24

### General

- Initial build and creating first component

## sp

created folders:  items, pages

### functions

