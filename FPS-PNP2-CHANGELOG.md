# Publish hints:

npm run clean
npm run build
npm version major/minor/patch
npm publish --access=public

npm install @mikezimm/fps-pnp2@1.0.8

# Changelog

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

