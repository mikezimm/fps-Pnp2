/**
 * 
 * THIS HAS BEEN DEPRECATED.
 * USE \fps-library-v2\src\pnpjs\SourceItems\getSourceItems.ts
 * 
 * 
 */



// /**
//  * Originally from Drilldown - EasyPages
//  */


// import { fetchAnyItems } from "./fetch";
// import { IMinFetchProps, IOrderByBoolean } from "./Interface";
// import { IItemsErrorObj } from "./Interface";

// // Duplicate from src\logic\Arrays\sorting\Interfaces.ts
// export interface ISeriesSortObject {
//   prop: string;
//   order: any;
//   asc?: boolean; // Added to match IOrderBoolean needed for fetching
// }

// export interface IMinSourceFetchProps {
//   webUrl: string;
//   listTitle: string;
//   selectThese?: string[];
//   expandThese?: string[];
//   restFilter?: string;
//   fetchCount: number; // Default is 200 if no value is provided
//   orderBy?: ISeriesSortObject;
// }

// /**
//  * fetchSourceItems takes IMinSourceFetchProps and fetches items and returns an items/error object: IItemsError
//  * it also adds the correct orderBy property needed for fetching
//  * @param sourceProps 
//  * @param alertMe 
//  * @param consoleLog 
//  * @returns 
//  */
// export async function fetchSourceItems( sourceProps: IMinSourceFetchProps, alertMe: boolean | undefined, consoleLog: boolean | undefined,) : Promise<IItemsErrorObj> {

//   //This converts ISeriesSortObject which has string order to IOrderByBoolean for fetch requirements
//   const orderBy: IOrderByBoolean = !sourceProps.orderBy ? null as any : {
//     prop: sourceProps.orderBy.prop,
//     asc: sourceProps.orderBy.asc ? sourceProps.orderBy.asc : sourceProps.orderBy.order === 'dec' ? false : true,
//   };

//   const FetchProps: IMinFetchProps = { ...sourceProps, ...{
//       orderBy: orderBy,
//       alertMe: alertMe,
//       fetchCount: sourceProps.fetchCount,
//       consoleLog: consoleLog,
//     }
//   }

//   const result: IItemsErrorObj = await fetchAnyItems( FetchProps );

//   return result;

// }
