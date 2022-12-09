# Check imports in userServices and SaveErrorToLog

Do I need all these?
If I remove them, will it 'build', but not throw any errors and not work down stream?

src\services\sp\users\userServices.ts

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { Web } from "@pnp/sp/webs";

import { IWebEnsureUserResult } from "@pnp/sp/site-users/";
import { PrincipalType } from "@pnp/sp";
import { PermissionKind } from '@pnp/sp/security';

--- Per Julie, this syntax was correct.
--- You need the Web part to get Web.
--- But then you also need the webs, lists etc to do those calls down stream
