import { IBasePermissions } from "@pnp/sp/security";


export interface IUserPermissionsResults {
  basePerms: IBasePermissions;
  e: any;
  status: 'success' | 'error' | 'none';
}
