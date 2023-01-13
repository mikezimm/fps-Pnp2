
import { ISiteUsersResults } from "../users/interfaces/ISiteUsersResults";
import { getUsersFromGroupId } from "./getUsersFromGroupId";
import { getUsersFromGroupName } from "./getUsersFromGroupName";

export async function getUsersFromGroup( webUrl: string, thisGroup : string | number ): Promise<ISiteUsersResults> {

  if ( typeof thisGroup === 'number' ) {
    return await getUsersFromGroupId( webUrl, thisGroup );

  } else { // Assumes thisGroup is string and therefore get by name
    return await getUsersFromGroupName( webUrl, thisGroup );

  }

}
