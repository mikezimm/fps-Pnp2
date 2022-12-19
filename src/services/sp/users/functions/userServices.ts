// import { sp } from "@pnp/sp";
// import "@pnp/sp/webs";
// import "@pnp/sp/site-users/web";
// import "@pnp/sp/lists/web";
// // import { IList } from "@pnp/sp/lists";

// import { Web } from "@pnp/sp/webs";

// import { IWebEnsureUserResult } from "@pnp/sp/site-users/";
// import { PrincipalType } from "@pnp/sp";
// import { PermissionKind } from '@pnp/sp/security';


// import { getHelpfullErrorV2 } from '@mikezimm/fps-js/lib/logic/Errors/friendly';
// import { doesObjectExistInArray } from '@mikezimm/fps-js/lib/logic/Arrays/searching/objectfind';
// import { IUser } from '@mikezimm/fps-js/lib/logic/Users/IUserInterfaces';
// import { getFullUrlFromSlashSitesUrl } from '@mikezimm/fps-js/lib/logic/Strings/urlServices';
// import { BaseErrorTrace } from '../../../../PackageConst';

// /***
//  *    db    db .d8888. d88888b d8888b. 
//  *    88    88 88'  YP 88'     88  `8D 
//  *    88    88 `8bo.   88ooooo 88oobY' 
//  *    88    88   `Y8b. 88~~~~~ 88`8b   
//  *    88b  d88 db   8D 88.     88 `88. 
//  *    ~Y8888P' `8888Y' Y88888P 88   YD 
//  *                                     
//  *                                     

// import { getPrincipalTypeString, ensureUserInfo, checkIfUserExistsInArray, getEmailFromLoginName, checkForLoginName
//     ensureUserHere, ensureTheseUsers, getUserPermissions, getSiteAdmins,  } from '@mikezimm/npmfunctions/dist/Users/userServices';

// import { IUser } from '@mikezimm/npmfunctions/dist/Users/IUserInterfaces';

//  */


// /***
//  *     d888b  d88888b d888888b      d8888b. d8888b. d888888b d8b   db  .o88b. d888888b d8888b.  .d8b.  db           d888888b db    db d8888b. d88888b 
//  *    88' Y8b 88'     `~~88~~'      88  `8D 88  `8D   `88'   888o  88 d8P  Y8   `88'   88  `8D d8' `8b 88           `~~88~~' `8b  d8' 88  `8D 88'     
//  *    88      88ooooo    88         88oodD' 88oobY'    88    88V8o 88 8P         88    88oodD' 88ooo88 88              88     `8bd8'  88oodD' 88ooooo 
//  *    88  ooo 88~~~~~    88         88~~~   88`8b      88    88 V8o88 8b         88    88~~~   88~~~88 88              88       88    88~~~   88~~~~~ 
//  *    88. ~8~ 88.        88         88      88 `88.   .88.   88  V888 Y8b  d8   .88.   88      88   88 88booo.         88       88    88      88.     
//  *     Y888P  Y88888P    YP         88      88   YD Y888888P VP   V8P  `Y88P' Y888888P 88      YP   YP Y88888P         YP       YP    88      Y88888P 
//  *                                                                                                                                                    
//  *                                                                                                                                                    
//  */

// export function getPrincipalTypeString( type: PrincipalType ) {
//   if ( type === 0 ) { return 'None'; }
//   if ( type === 1 ) { return 'User'; }
//   if ( type === 2 ) { return 'Distribution'; }
//   if ( type === 4 ) { return 'Security'; }
//   if ( type === 8 ) { return 'SharePoint'; }
//   if ( type === 15 ) { return 'All'; }
// }


// /***
//  *    d88888b d8b   db .d8888. db    db d8888b. d88888b      db    db .d8888. d88888b d8888b.      d888888b d8b   db d88888b  .d88b.  
//  *    88'     888o  88 88'  YP 88    88 88  `8D 88'          88    88 88'  YP 88'     88  `8D        `88'   888o  88 88'     .8P  Y8. 
//  *    88ooooo 88V8o 88 `8bo.   88    88 88oobY' 88ooooo      88    88 `8bo.   88ooooo 88oobY'         88    88V8o 88 88ooo   88    88 
//  *    88~~~~~ 88 V8o88   `Y8b. 88    88 88`8b   88~~~~~      88    88   `Y8b. 88~~~~~ 88`8b           88    88 V8o88 88~~~   88    88 
//  *    88.     88  V888 db   8D 88b  d88 88 `88. 88.          88b  d88 db   8D 88.     88 `88.        .88.   88  V888 88      `8b  d8' 
//  *    Y88888P VP   V8P `8888Y' ~Y8888P' 88   YD Y88888P      ~Y8888P' `8888Y' Y88888P 88   YD      Y888888P VP   V8P YP       `Y88P'  
//  *                                                                                                                                    
//  *                                                                                                                                    
//  */

// export async function ensureUserInfo ( webUrl: string, userEmail: string ) {

//     let thisListWeb = Web(webUrl);
//     //const username = "mike.zimmerman@autoliv.com";
//     let result = await thisListWeb.ensureUser(userEmail);
//     console.log('userInfo', result );

//     let thisUser: IUser = {
//             title: result.data.Title,
//             Title: result.data.Title,
//             initials: '',  //Single person column
//             email: result.data.Email,  //Single person column
//             id: result.data.Id,
//             Id: result.data.Id,
//             ID: result.data.Id,
          
//             isSiteAdmin:result.data.IsSiteAdmin,
//             LoginName: result.data.LoginName,
//             Name: result.data.LoginName,
          
//             //These optional props are from the React PeoplePicker control
//             imageInitials: '', //same as Initials,         From React People Picker control
//             imageUrl: '',  //Thumbnail URL,                From React People Picker control
//             loginName: result.data.LoginName,  //Same as LoginName and Name,  From React People Picker control
//             text: result.data.Title,   //Same as Title and title,         From React People Picker control

//             remoteID: null,
//             ensureWeb: webUrl,
//     };

//     return thisUser;
// }

// /***
//  *     .o88b. db   db d88888b  .o88b. db   dD      d888888b d88888b      db    db .d8888. d88888b d8888b.                     
//  *    d8P  Y8 88   88 88'     d8P  Y8 88 ,8P'        `88'   88'          88    88 88'  YP 88'     88  `8D                     
//  *    8P      88ooo88 88ooooo 8P      88,8P           88    88ooo        88    88 `8bo.   88ooooo 88oobY'                     
//  *    8b      88~~~88 88~~~~~ 8b      88`8b           88    88~~~        88    88   `Y8b. 88~~~~~ 88`8b                       
//  *    Y8b  d8 88   88 88.     Y8b  d8 88 `88.        .88.   88           88b  d88 db   8D 88.     88 `88.                     
//  *     `Y88P' YP   YP Y88888P  `Y88P' YP   YD      Y888888P YP           ~Y8888P' `8888Y' Y88888P 88   YD                     
//  *                                                                                                                            
//  *                                                                                                                            
//  *    d88888b db    db d888888b .d8888. d888888b .d8888.      d888888b d8b   db       .d8b.  d8888b. d8888b.  .d8b.  db    db 
//  *    88'     `8b  d8'   `88'   88'  YP `~~88~~' 88'  YP        `88'   888o  88      d8' `8b 88  `8D 88  `8D d8' `8b `8b  d8' 
//  *    88ooooo  `8bd8'     88    `8bo.      88    `8bo.           88    88V8o 88      88ooo88 88oobY' 88oobY' 88ooo88  `8bd8'  
//  *    88~~~~~  .dPYb.     88      `Y8b.    88      `Y8b.         88    88 V8o88      88~~~88 88`8b   88`8b   88~~~88    88    
//  *    88.     .8P  Y8.   .88.   db   8D    88    db   8D        .88.   88  V888      88   88 88 `88. 88 `88. 88   88    88    
//  *    Y88888P YP    YP Y888888P `8888Y'    YP    `8888Y'      Y888888P VP   V8P      YP   YP 88   YD 88   YD YP   YP    YP    
//  *                                                                                                                            
//  *                                                                                                                            
//  */

// export function checkIfUserExistsInArray( recentUsers : IUser[] , user: IUser ) {

//     let remoteId : any = false;

//     remoteId = doesObjectExistInArray(recentUsers, "Id", user.id, true );
//     if ( remoteId === false ) { remoteId = doesObjectExistInArray(recentUsers, "email", user.email, true ); }
//     if ( remoteId === false ) { remoteId = doesObjectExistInArray(recentUsers, "loginName", user.loginName, true ); }
//     if ( remoteId === false ) { remoteId = doesObjectExistInArray(recentUsers, "email", user.email, true ); }
//     if ( remoteId === false ) { remoteId = doesObjectExistInArray(recentUsers, "title", user.title, true ); }

//     if ( remoteId === false ) {
//         alert('Error addTheseFieldsToSaveObject:\n' +  JSON.stringify( user ));
//     } else {
//         remoteId = parseInt(remoteId, 10);
//     }

//     return remoteId;
// }

// //getEmailFromLoginName, checkForLoginName

// /***
//  *     d888b  d88888b d888888b      d88888b .88b  d88.  .d8b.  d888888b db      
//  *    88' Y8b 88'     `~~88~~'      88'     88'YbdP`88 d8' `8b   `88'   88      
//  *    88      88ooooo    88         88ooooo 88  88  88 88ooo88    88    88      
//  *    88  ooo 88~~~~~    88         88~~~~~ 88  88  88 88~~~88    88    88      
//  *    88. ~8~ 88.        88         88.     88  88  88 88   88   .88.   88booo. 
//  *     Y888P  Y88888P    YP         Y88888P YP  YP  YP YP   YP Y888888P Y88888P 
//  *                                                                              
//  *                                                                              
//  */


// export function getEmailFromLoginName( uName: string ) {

// let result = null;

// if (uName.indexOf('|') > -1 && uName.indexOf('@') > 0 ) {
//     //This is an ID structure from reading in from the list:  "i:0#.f|membership|clicky.mcclickster@mcclickster.onmicrosoft.com"
//     let uProps = uName.split('|');
//     let expectedEmailIndex = 2;
//     if (uProps.length === 3 && uProps[expectedEmailIndex].indexOf('@') > -1) {
//         result = uProps[expectedEmailIndex];
//     } else {
//         alert('Not able to find email from this user name: ' + uName );
//     }
// }

// return result;

// }

// /***
//  *     d888b  d88888b d888888b      db       .d88b.   d888b  d888888b d8b   db      d8b   db  .d8b.  .88b  d88. d88888b 
//  *    88' Y8b 88'     `~~88~~'      88      .8P  Y8. 88' Y8b   `88'   888o  88      888o  88 d8' `8b 88'YbdP`88 88'     
//  *    88      88ooooo    88         88      88    88 88         88    88V8o 88      88V8o 88 88ooo88 88  88  88 88ooooo 
//  *    88  ooo 88~~~~~    88         88      88    88 88  ooo    88    88 V8o88      88 V8o88 88~~~88 88  88  88 88~~~~~ 
//  *    88. ~8~ 88.        88         88booo. `8b  d8' 88. ~8~   .88.   88  V888      88  V888 88   88 88  88  88 88.     
//  *     Y888P  Y88888P    YP         Y88888P  `Y88P'   Y888P  Y888888P VP   V8P      VP   V8P YP   YP YP  YP  YP Y88888P 
//  *                                                                                                                      
//  *                                                                                                                      
//  */

// export function checkForLoginName( u : IUser ) {

//   let results = undefined;

//   if ( u.Name ) {
//       results = u.Name;

//   } else if ( u.loginName ) {
//       results = u.loginName;

//   } else if ( u.LoginName ) {
//       results = u.LoginName;

//   } else if ( u.email ) {
//       results = u.email;
//   }

//   return results;

// }

// /***
//  *    d88888b d8b   db .d8888. db    db d8888b. d88888b      db    db .d8888. d88888b d8888b.      db   db d88888b d8888b. d88888b 
//  *    88'     888o  88 88'  YP 88    88 88  `8D 88'          88    88 88'  YP 88'     88  `8D      88   88 88'     88  `8D 88'     
//  *    88ooooo 88V8o 88 `8bo.   88    88 88oobY' 88ooooo      88    88 `8bo.   88ooooo 88oobY'      88ooo88 88ooooo 88oobY' 88ooooo 
//  *    88~~~~~ 88 V8o88   `Y8b. 88    88 88`8b   88~~~~~      88    88   `Y8b. 88~~~~~ 88`8b        88~~~88 88~~~~~ 88`8b   88~~~~~ 
//  *    88.     88  V888 db   8D 88b  d88 88 `88. 88.          88b  d88 db   8D 88.     88 `88.      88   88 88.     88 `88. 88.     
//  *    Y88888P VP   V8P `8888Y' ~Y8888P' 88   YD Y88888P      ~Y8888P' `8888Y' Y88888P 88   YD      YP   YP Y88888P 88   YD Y88888P 
//  *                                                                                                                                 
//  *                                                                                                                                 
//  */

//  /**
//   * 
//   * @param loginName  2021-03-01:  should really be string | undefined but set to any to get into npmfunctions
//   * @param webUrl 
//   * @param supressSaveConflict 
//   */
// export async function ensureUserHere( loginName: string | undefined, webUrl: string, supressSaveConflict: boolean ) {
    
//     let thisListWeb = Web(webUrl);

//     let errMessage = null;

//     if ( loginName === undefined ) {
//         return undefined ;
//     } else {
//         try {
//             const user = await thisListWeb.ensureUser(loginName);
//             const users = thisListWeb.siteUsers;
//             await users.add(user.data.LoginName);
//             console.log('ensureUserHere: user', user );
//             console.log('ensureUserHere: users', users );
//             return user ;
    
//         } catch (e) {
//             let helpfulErrorEnd = [ webUrl, loginName, null, null ].join('|');
//             errMessage = getHelpfullErrorV2(e, true, true, [ BaseErrorTrace , 'Error', 'userServices Ensure User Here ~ 244', helpfulErrorEnd ].join('|'));
//             let saveMessage =  'Ensure Failed!\n' + loginName + "\n" + webUrl + "\n" + errMessage.returnMess;
    
//             if ( supressSaveConflict === true && errMessage.returnMess.indexOf('Save Conflict') === 0 ) {
//               //Do nothting
//             } else {
//               alert( saveMessage );
//             }
    
//             console.log( saveMessage );
//         }
//     }


// }

// /***
//  *    d88888b d8b   db .d8888. db    db d8888b. d88888b      d888888b db   db d88888b .d8888. d88888b      db    db .d8888. d88888b d8888b. .d8888. 
//  *    88'     888o  88 88'  YP 88    88 88  `8D 88'          `~~88~~' 88   88 88'     88'  YP 88'          88    88 88'  YP 88'     88  `8D 88'  YP 
//  *    88ooooo 88V8o 88 `8bo.   88    88 88oobY' 88ooooo         88    88ooo88 88ooooo `8bo.   88ooooo      88    88 `8bo.   88ooooo 88oobY' `8bo.   
//  *    88~~~~~ 88 V8o88   `Y8b. 88    88 88`8b   88~~~~~         88    88~~~88 88~~~~~   `Y8b. 88~~~~~      88    88   `Y8b. 88~~~~~ 88`8b     `Y8b. 
//  *    88.     88  V888 db   8D 88b  d88 88 `88. 88.             88    88   88 88.     db   8D 88.          88b  d88 db   8D 88.     88 `88. db   8D 
//  *    Y88888P VP   V8P `8888Y' ~Y8888P' 88   YD Y88888P         YP    YP   YP Y88888P `8888Y' Y88888P      ~Y8888P' `8888Y' Y88888P 88   YD `8888Y' 
//  *                                                                                                                                                  
//  *                                                                                                                                                  
//  */

// export async function ensureTheseUsers ( theseUsers: IUser[], checkTheseUsers: IUser[] , webUrl: string ) {

//     let updateState: boolean ;

//     console.log('ensureTheseUsers', theseUsers);
//     let recentUsers : IUser[] = checkTheseUsers;
//     let ensureLogin : IUser[] = [];

//     //Get each user and check if they are in stateUsers:  getEmailFromLoginName, checkForLoginName
//     if ( theseUsers.length > 0 ) {
//       theseUsers.map( ensureUser => {
//         let loginName = checkForLoginName( ensureUser );
//         if ( loginName ) {
  
//           let isAlreadyInState = false;
  
//           //Check if loginName of new user is already in state
//           recentUsers.map( existingUser => {
//             if ( existingUser.loginName === loginName ) { isAlreadyInState = true ; }
//           });
  
//           if ( isAlreadyInState === false ) {
//             console.log('NEED TO ENSURE LOGIN: ', loginName );
//             updateState = true;
//             ensureUser.loginName = loginName;
//             ensureLogin.push(ensureUser);
//           }
//         }
//       });
//     }

//     if ( ensureLogin.length > 0 ) {
//       for (let i = 0; i < ensureLogin.length; i++) {
//         let user : IWebEnsureUserResult | undefined = await ensureUserHere( ensureLogin[i].loginName, webUrl, false );
//         let localId = ensureLogin[i].id ? ensureLogin[i].id : ensureLogin[i].Id;
//         if ( user !== undefined ) {
//             recentUsers.push({
//                 id: localId,
//                 Id: localId,
//                 remoteID: user.data.Id,
//                 title: user.data.Title,
//                 Title: user.data.Title,
//                 loginName: user.data.LoginName,
//                 email: user.data.Email,
//                 PrincipalType: user.data.PrincipalType,
//               });
//         } else {
//             recentUsers.push({
//                 id: localId,
//                 Id: localId,
//                 remoteID: '',
//                 title: '',
//                 Title: '',
//                 loginName: '',
//                 email: '',
//                 PrincipalType: undefined,
//               });
//         }

//       }
//       console.log('updated state recentUsers: ', recentUsers );

//     }

//     return recentUsers;

//   }




//   /***
//  *     d888b  d88888b d888888b      db    db .d8888. d88888b d8888b.      d8888b. d88888b d8888b. .88b  d88. d888888b .d8888. .d8888. d888888b  .d88b.  d8b   db .d8888. 
//  *    88' Y8b 88'     `~~88~~'      88    88 88'  YP 88'     88  `8D      88  `8D 88'     88  `8D 88'YbdP`88   `88'   88'  YP 88'  YP   `88'   .8P  Y8. 888o  88 88'  YP 
//  *    88      88ooooo    88         88    88 `8bo.   88ooooo 88oobY'      88oodD' 88ooooo 88oobY' 88  88  88    88    `8bo.   `8bo.      88    88    88 88V8o 88 `8bo.   
//  *    88  ooo 88~~~~~    88         88    88   `Y8b. 88~~~~~ 88`8b        88~~~   88~~~~~ 88`8b   88  88  88    88      `Y8b.   `Y8b.    88    88    88 88 V8o88   `Y8b. 
//  *    88. ~8~ 88.        88         88b  d88 db   8D 88.     88 `88.      88      88.     88 `88. 88  88  88   .88.   db   8D db   8D   .88.   `8b  d8' 88  V888 db   8D 
//  *     Y888P  Y88888P    YP         ~Y8888P' `8888Y' Y88888P 88   YD      88      Y88888P 88   YD YP  YP  YP Y888888P `8888Y' `8888Y' Y888888P  `Y88P'  VP   V8P `8888Y' 
//  *                                                                                                                                                                       
//  *        Updated function from https://github.com/pnp/pnpjs/issues/1480#issuecomment-745203843                                                                                                                                                               
//  */

//   export async function getUserPermissions( webUrl: string , supressError: boolean ) {
//     let thisWeb = Web(webUrl);
    

//     try {
//         const userPerm = await thisWeb.getCurrentUserEffectivePermissions();
       
//         console.log({
//           'PermissionKind.ViewListItems': sp.web.hasPermissions(userPerm, PermissionKind.ViewListItems),
//           'PermissionKind.AddListItems': sp.web.hasPermissions(userPerm, PermissionKind.AddListItems),
//           'PermissionKind.ManageWeb': sp.web.hasPermissions(userPerm, PermissionKind.ManageWeb),
//           'PermissionKind.FullMask': sp.web.hasPermissions(userPerm, PermissionKind.FullMask),
//         });

//         return { permissions: userPerm, errMessage: '' } ;

//       } catch (e) {
//         let helpfulErrorEnd = [ webUrl, '', null, null ].join('|');
//         let errMessage = getHelpfullErrorV2(e, true, true, [ BaseErrorTrace , 'Error', 'getUserPerms getUserEffPerms ~ 371', helpfulErrorEnd ].join('|'));

//         if ( supressError === true && errMessage.returnMess.indexOf('Save Conflict') === 0 ) {
//           alert( errMessage.returnMess );
//         }
//         console.log( 'getUserPermissions', errMessage ) ;
//         return { users: [] as any, errMessage: errMessage.returnMess } ;

//     }

//   }

//   /***
//  *     d888b  d88888b d888888b      .d8888. d888888b d888888b d88888b       .d8b.  d8888b. .88b  d88. d888888b d8b   db .d8888. 
//  *    88' Y8b 88'     `~~88~~'      88'  YP   `88'   `~~88~~' 88'          d8' `8b 88  `8D 88'YbdP`88   `88'   888o  88 88'  YP 
//  *    88      88ooooo    88         `8bo.      88       88    88ooooo      88ooo88 88   88 88  88  88    88    88V8o 88 `8bo.   
//  *    88  ooo 88~~~~~    88           `Y8b.    88       88    88~~~~~      88~~~88 88   88 88  88  88    88    88 V8o88   `Y8b. 
//  *    88. ~8~ 88.        88         db   8D   .88.      88    88.          88   88 88  .8D 88  88  88   .88.   88  V888 db   8D 
//  *     Y888P  Y88888P    YP         `8888Y' Y888888P    YP    Y88888P      YP   YP Y8888D' YP  YP  YP Y888888P VP   V8P `8888Y' 
//  *                                                                                                                              
//  *                                                                                                                              
//  */

//   export async function getSiteAdmins( webUrl: string , supressError: boolean ) {
//     let thisWeb = Web(webUrl);

    
//     //let adminFilter = "IsSiteAdmin eq true"; //This did not work....
//     let adminFilter = "IsSiteAdmin eq 1";  //Updated per @koltyakov: https://github.com/pnp/pnpjs/issues/1480

//     try {
 
//       const siteAdmins = await thisWeb.siteUserInfoList.items.filter( adminFilter ).get();

//       /**
//        * This was added because loginName is not retured but is in other functions so it just copies it to make it easier to resuse.
//        */
//       siteAdmins.map( user => {
//         if ( !user.loginName && user.Name ) { user.loginName = user.Name ; }
//         if ( !user.Email && user.EMail ) { user.Email = user.EMail ; }
//       });

//       return { users: siteAdmins, errMessage: '' }  ;

//     } catch (e) {

//       let helpfulErrorEnd = [ webUrl, '', null, null ].join('|');
//       let errMessage = getHelpfullErrorV2(e, true, true, [ BaseErrorTrace , 'Error', 'getUserPerms getSiteAdmis ~ 418', helpfulErrorEnd ].join('|'));
//       if ( supressError !== true ) {
//         alert( errMessage.returnMess );
//       }
//       console.log( 'getSiteAdmins', errMessage );

//       return { users: [] as any, errMessage: errMessage.returnMess }  ;
//   }

// }

// /***
//  *     d888b  d88888b d888888b      .d8888. d888888b d888888b d88888b      db    db .d8888. d88888b d8888b. .d8888. 
//  *    88' Y8b 88'     `~~88~~'      88'  YP   `88'   `~~88~~' 88'          88    88 88'  YP 88'     88  `8D 88'  YP 
//  *    88      88ooooo    88         `8bo.      88       88    88ooooo      88    88 `8bo.   88ooooo 88oobY' `8bo.   
//  *    88  ooo 88~~~~~    88           `Y8b.    88       88    88~~~~~      88    88   `Y8b. 88~~~~~ 88`8b     `Y8b. 
//  *    88. ~8~ 88.        88         db   8D   .88.      88    88.          88b  d88 db   8D 88.     88 `88. db   8D 
//  *     Y888P  Y88888P    YP         `8888Y' Y888888P    YP    Y88888P      ~Y8888P' `8888Y' Y88888P 88   YD `8888Y' 
//  *                                                                                                                  
//  *                                                                                                                  
//  */

//     /**
//      * The use case for this function is to build a set of random users for sample items based on real users in the site.
//      * 
//      * This will get all site users from a site
//      * Then if they need to be real people, it will filter for real users
//      * Then build up the detail arrays based on if it detects valid properties in those keys.
//      * NOTE that it's possible that the number of users returned in Ids may be different than in the Titles.
//      * @param url 
//      * @param props 
//      * @param realPeopleOnly 
//      */
//     //Get this from npmFunctions userServices

//     export type IValidUserProp = 'Id' | 'Title' | 'Name' | 'Email';

//     export interface IValueUserInfos {
//       Ids: number[];
//       Titles: string[];
//       Names: string[];
//       Emails: string[];
//       Users: any[];
//       Props: IValidUserProp[];
//       errMessage: string;
//     }

//     export async function getSiteUsers( url: string, props: IValidUserProp[], realPeopleOnly: boolean ) {
//     url = getFullUrlFromSlashSitesUrl( url ) + '';
//     const thisWeb = Web( url );
//     let validUserInfos: IValueUserInfos = {
//         Ids: [],
//         Titles: [],
//         Names: [],
//         Emails: [],
//         Users: [],
//         Props: props,
//         errMessage: '',
//     };
  
//     try {
//       const allUsers = await thisWeb.siteUsers.get();
  
//       allUsers.map ( u => {
//         let isReal = false;
  
//         //UserId is typically an object with keys:  NameIdIssuer & NameId.  Only getting users with that
//         let uId = u.UserId !== null ? u.Id : null ;
//         let uTitle = u.Title ? u.Title : null;
//         let uEmail = u.Email ? u.Email : null ;
//         let uName = u.UserPrincipalName !== null ? u.UserPrincipalName : u.LoginName ;
  
//         //Through testing, found that system accounts have a LoginName but NOT UserPrincipalName
//         //So for "real test", I'm using UserPrincipalName to check.

//         if ( u.UserId !== null && u.UserPrincipalName !== null && u.UserPrincipalName !== undefined ) { isReal = true; }
//         if ( isReal === true || realPeopleOnly === false ) {
//             if ( props.indexOf( 'Id') > - 1 && uId !== null ) { validUserInfos.Ids.push( uId ); }
//             if ( props.indexOf( 'Title') > - 1 && uTitle !== null ) { validUserInfos.Titles.push( uTitle ); }
//             if ( props.indexOf( 'Name') > - 1 && uName !== null ) { validUserInfos.Names.push( uName ); }
//             if ( props.indexOf( 'Email') > - 1 && uEmail !== null ) { validUserInfos.Emails.push( uEmail ); }
//             validUserInfos.Users.push( u );
//           }
//         });
//       console.log('validUserInfos SiteUsers:', validUserInfos );
  
//     } catch(e){
//       let helpfulErrorEnd = [ 'Get Site Users', '', null, null ].join('|');
//       const errorInfo = getHelpfullErrorV2(e, true, true, [ BaseErrorTrace , 'Error', 'getValidUsers ~ 437', helpfulErrorEnd ].join('|') );
//       validUserInfos.errMessage = errorInfo.returnMess;
//       console.log('Not able to get SiteUsers', validUserInfos.errMessage);
//     }
  
//     return validUserInfos;
  
//   }

// /***
//  *     d888b  d88888b d888888b       .o88b. db    db d8888b. d8888b. d88888b d8b   db d888888b      db    db .d8888. d88888b d8888b. 
//  *    88' Y8b 88'     `~~88~~'      d8P  Y8 88    88 88  `8D 88  `8D 88'     888o  88 `~~88~~'      88    88 88'  YP 88'     88  `8D 
//  *    88      88ooooo    88         8P      88    88 88oobY' 88oobY' 88ooooo 88V8o 88    88         88    88 `8bo.   88ooooo 88oobY' 
//  *    88  ooo 88~~~~~    88         8b      88    88 88`8b   88`8b   88~~~~~ 88 V8o88    88         88    88   `Y8b. 88~~~~~ 88`8b   
//  *    88. ~8~ 88.        88         Y8b  d8 88b  d88 88 `88. 88 `88. 88.     88  V888    88         88b  d88 db   8D 88.     88 `88. 
//  *     Y888P  Y88888P    YP          `Y88P' ~Y8888P' 88   YD 88   YD Y88888P VP   V8P    YP         ~Y8888P' `8888Y' Y88888P 88   YD 
//  *                                                                                                                                   
//  *                                                                                                                                   
//  */

//   /**
//    * Copied from ExStorage - gets current logged in user from site.
//    * @param webUrl 
//    */
  
//   export async function getCurrentUser( webUrl: string): Promise<IUser> {
//     let currentUser : IUser =  {};
//     let thisWebInstance = Web(webUrl);
//     await thisWebInstance.currentUser.get().then((r) => {
//       currentUser = {
//         title: r['Title'] , //
//         Title: r['Title'] , //
//         initials: r['Title'].split(" ").map((n)=>n[0]).join(""), //Single person column
//         email: r['Email'] , //Single person column
//         id: r['Id'] , //
//         Id: r['Id'] , //
//         ID: r['Id'] , //
//         remoteID: null,
//         isSiteAdmin: r['IsSiteAdmin'],
//         LoginName: r['LoginName'],
//         Name: r['LoginName'],
//       };
//       // this.setState({ currentUser: currentUser });
      
//     });
//     return currentUser;
//   }