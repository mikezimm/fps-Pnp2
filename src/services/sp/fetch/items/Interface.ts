import { IFPSResultStatus } from "../../IFPSResultStatus";

export interface IItemsErrorObj {
  status: IFPSResultStatus;
  items: any[];
  e: any;
}

export interface IItemErrorObj {
  status: IFPSResultStatus;
  item: any;
  e: any;
}

export interface IOrderByBoolean {
  prop: string;
  asc: boolean;
}

export interface IMinFetchProps {
  webUrl: string;
  listTitle: string;
  restFilter?: string;
  fetchCount: number; // Default is 200 if no value is provided
  selectThese?: string[];
  expandThese?: string[];
  context?: any; //Not needed until Pnpjs v3
  orderByBoolean?: IOrderByBoolean;
  alertMe?: boolean | undefined;
  consoleLog?: boolean | undefined;
}
