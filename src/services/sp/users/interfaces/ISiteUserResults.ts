import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { IFPSResultStatus } from "../../IFPSResultStatus";


export interface ISiteUserResults {
  user: ISiteUserInfo;
  e: any;
  status: IFPSResultStatus;
}
