import { IMinSourceFetchProps, ISeriesSortObject } from "../fetch/items/fetchSourceItems";

// copied from /EasyPages/epTypes.ts

export interface IMinSourceWPProps {

  webUrl: string;
  listTitle: string;
  restFilter?: string;
  evalFilter?: string; //Format of eval( enter string value here )
  orderByProp?: string;
  orderByAsc?: boolean;

}

export interface ISourceProps extends IMinSourceFetchProps {

  //Must be Exact from IMinSourceFetchProps
  webUrl: string;
  listTitle: string;
  selectThese?: string[];
  expandThese?: string[];
  restFilter?: string;
  orderBy?: ISeriesSortObject;

  //These are specific to ISourceProps
  defType: string; //Used in Search Meta function

  webRelativeLink: string;
  viewItemLink?: string;
  columns: string[];
  searchProps: string[];

  evalFilter?: string; //Format of eval
  searchSource: string;
  searchSourceDesc: string;
  itemFetchCol?: string[]; //higher cost columns to fetch on opening panel
  isModern?: boolean;

  EasyPageOverflowTab?: string;
  meta0?: string[]; // Used for quick filtering - aka buttons or Pivots - meta0 is used for things like Type
  meta1?: string[]; // Used for quick filtering - aka buttons or Pivots - meta1 is normal button
  meta2?: string[]; // Used for quick filtering - aka buttons or Pivots - meta2 is normal button
  meta3?: string[]; // Used for quick filtering - aka buttons or Pivots - meta3 is normal button
  metaX?: string[]; // Used for quick filtering - For common filters like Modified and Created metadata

  defSearchButtons: string[]; //These are default buttons always on that source page.  Use case for Manual:  Policy, Instruction etc...

}
