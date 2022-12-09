import { IHelpfullOutput } from '@mikezimm/fps-js/lib/indexes/HelpfullErrors';

export interface IItemsError {
  items: any[];
  errorInfo: IHelpfullOutput;
}

export interface IOrderByBoolean {
  prop: string;
  asc: boolean;
}

export interface IMinFetchProps {
  webUrl: string;
  listTitle: string;
  restFilter?: string;
  selectThese?: string[];
  expandThese?: string[];
  context?: any; //Not needed until Pnpjs v3
  orderByBoolean?: IOrderByBoolean;
  alertMe?: boolean | undefined;
  consoleLog?: boolean | undefined;
}