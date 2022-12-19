import { IBasePermissions } from "@pnp/sp/security";
import { IFPSResultStatus } from "../../IFPSResultStatus";


export interface IUserPermissionsResults {
  basePerms: IBasePermissions;
  e: any;
  status: IFPSResultStatus;
}
