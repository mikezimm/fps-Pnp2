/**
 * Originally from Drilldown - EasyPages
 */


import { fetchAnyItems } from "./functions";
import { IMinFetchProps, IOrderByBoolean } from "./Interface";
import { IItemsError } from "./Interface";

// Duplicate from src\logic\Arrays\sorting\Interfaces.ts
export interface ISeriesSortObject {
  prop: string;
  order: any;
  asc?: boolean; // Added to match IOrderBoolean needed for fetching
}

export interface IMinSourceFetchProps {
  webUrl: string;
  listTitle: string;
  selectThese?: string[];
  expandThese?: string[];
  restFilter?: string;
  orderBy?: ISeriesSortObject;
}

/**
 * fetchSourceItems takes IMinSourceFetchProps and fetches items and returns an items/error object: IItemsError
 * @param sourceProps 
 * @param alertMe 
 * @param consoleLog 
 * @returns 
 */
export async function fetchSourceItems( sourceProps: IMinSourceFetchProps, alertMe: boolean | undefined, consoleLog: boolean | undefined,) : Promise<IItemsError> {

  //This converts ISeriesSortObject which has string order to IOrderByBoolean for fetch requirements
  const orderBy: IOrderByBoolean = !sourceProps.orderBy ? null : {
    prop: sourceProps.orderBy.prop,
    asc: sourceProps.orderBy.asc ? sourceProps.orderBy.asc : sourceProps.orderBy.order === 'dec' ? false : true,
  };

  const FetchProps: IMinFetchProps = { ...sourceProps, ...{
      orderBy: orderBy,
      alertMe: alertMe,
      consoleLog: consoleLog,
    }
  }

  const result: IItemsError = await fetchAnyItems( FetchProps );

  return result;

}
