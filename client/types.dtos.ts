/* Options:
Date: 2023-08-04 08:46:49
Version: 6.10
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://localhost:44305/api

//GlobalNamespace: 
//MakePropertiesOptional: False
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/


export interface IReturn<T> {
    createResponse(): T;
}

export interface IReturnVoid {
    createResponse(): void;
}

export interface IHasSessionId {
    sessionId: string;
}

export interface IHasBearerToken {
    bearerToken: string;
}

export interface IPost {
}

export enum FeedbackTypeEnum {
    Bug = 'Bug',
    Issue = 'Issue',
}

export class PermissionDTO {
    public id: number;
    public code: string;
    public name: string;
    public description: string;

    public constructor(init?: Partial<PermissionDTO>) { (Object as any).assign(this, init); }
}

export class PickListItemResponseDTO {
    public id: number;
    public pickListTypeId: number;
    public pickListTypeCode: string;
    public code: string;
    public description: string;
    public parentId?: number;
    public isDefault: boolean;
    public isActive: boolean;
    public value1: string;
    public value2: string;
    public sort: number;

    public constructor(init?: Partial<PickListItemResponseDTO>) { (Object as any).assign(this, init); }
}

export class DataTableExampleMovieDTO {
    public id: number;
    public movieName: string;
    public yearReleased: number;
    public genre: string;
    public directorId?: number;
    public directorName: string;

    public constructor(init?: Partial<DataTableExampleMovieDTO>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseError {
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public fieldName: string;

    // @DataMember(Order=3)
    public message: string;

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseError>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseStatus {
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public message: string;

    // @DataMember(Order=3)
    public stackTrace: string;

    // @DataMember(Order=4)
    public errors: ResponseError[];

    // @DataMember(Order=5)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseStatus>) { (Object as any).assign(this, init); }
}

export class WebSettings {
    public b2CClientId: string;
    public b2CSignInPolicyURL: string;
    public b2CKnownAuthorities: string[];

    public constructor(init?: Partial<WebSettings>) { (Object as any).assign(this, init); }
}

export class MobileSettings {
    public b2CBaseUrl: string;
    public b2CTenantName: string;
    public b2CSignInFlow: string;
    public b2CAuthCallBack: string;
    public b2CClientId: string;
    public stripeAPIUrl: string;
    public stripeAPIKey: string;
    public allowUserPasswordChange: boolean;

    public constructor(init?: Partial<MobileSettings>) { (Object as any).assign(this, init); }
}

export class MessageDTO {
    public message: string;

    public constructor(init?: Partial<MessageDTO>) { (Object as any).assign(this, init); }
}

export class FeedbackDTO {
    public id: number;
    public description: string;
    public userName: string;
    public userEmail: string;
    public priority: number;
    public severity: string;
    public feedbackType: FeedbackTypeEnum;
    public submittedDate: string;
    public completedDate?: string;
    public elevatedDate?: string;
    public deleted: boolean;
    public dismissed: boolean;
    public statusName: string;
    public browser: string;
    public browserVersion: string;
    public computerOs: string;
    public computerOsVersion: string;
    public language: string;
    public deviceOs: string;
    public deviceVersion: string;
    public deviceLanguage: string;
    public appVersion: string;
    public buildId: string;
    public batteryPercentage: number;
    public isLowPowerMode: boolean;
    public pagesVisited: string;
    public appPermissions: string;

    public constructor(init?: Partial<FeedbackDTO>) { (Object as any).assign(this, init); }
}

export class PickListType {
    public id: number;
    public code: string;
    public description: string;
    public parentId?: number;
    public parent: PickListType;
    public isActive: boolean;

    public constructor(init?: Partial<PickListType>) { (Object as any).assign(this, init); }
}

export class PickListItem {
    public id: number;
    public pickListTypeId: number;
    public pickListType: PickListType;
    public parentId?: number;
    public parent: PickListItem;
    public isDefault: boolean;
    public code: string;
    public description: string;
    public isActive: boolean;
    public value1: string;
    public value2: string;
    public lastModifiedBy: string;
    public sort?: number;

    public constructor(init?: Partial<PickListItem>) { (Object as any).assign(this, init); }
}

export class RoleDTO {
    public id: number;
    public name: string;
    public description: string;
    public isDefault: boolean;
    public permissionIds: number[];

    public constructor(init?: Partial<RoleDTO>) { (Object as any).assign(this, init); }
}

export class Tenant {
    public id: number;
    public name: string;
    public isActive: boolean;
    public lastModifiedBy: string;

    public constructor(init?: Partial<Tenant>) { (Object as any).assign(this, init); }
}

export class PunchcardUser {
    public id: number;
    public tenantId?: number;
    public tenant: Tenant;
    public azureObjectId: string;
    public lastModifiedBy: string;
    public rolesList: string;
    public firstName: string;
    public lastName: string;
    public isActive: boolean;
    public email: string;

    public constructor(init?: Partial<PunchcardUser>) { (Object as any).assign(this, init); }
}

export class CurrentUserDTO {
    public id?: number;
    public tenantId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public fullName: string;
    public isActive: boolean;
    public roles: string[];
    public permissions: string[];

    public constructor(init?: Partial<CurrentUserDTO>) { (Object as any).assign(this, init); }
}

export class UserDetailsDTO {
    public id?: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phoneNumber: string;
    public birthDate?: string;
    public gender: string;
    public roleIds: number[];
    public tenantId?: number;
    public isActive: boolean;
    public password: string;

    public constructor(init?: Partial<UserDetailsDTO>) { (Object as any).assign(this, init); }
}

export class LoggingExampleResponse {
    public result: string;

    public constructor(init?: Partial<LoggingExampleResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class AuthenticateResponse implements IHasSessionId, IHasBearerToken {
    // @DataMember(Order=1)
    public userId: string;

    // @DataMember(Order=2)
    public sessionId: string;

    // @DataMember(Order=3)
    public userName: string;

    // @DataMember(Order=4)
    public displayName: string;

    // @DataMember(Order=5)
    public referrerUrl: string;

    // @DataMember(Order=6)
    public bearerToken: string;

    // @DataMember(Order=7)
    public refreshToken: string;

    // @DataMember(Order=8)
    public profileUrl: string;

    // @DataMember(Order=9)
    public roles: string[];

    // @DataMember(Order=10)
    public permissions: string[];

    // @DataMember(Order=11)
    public responseStatus: ResponseStatus;

    // @DataMember(Order=12)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<AuthenticateResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class AssignRolesResponse {
    // @DataMember(Order=1)
    public allRoles: string[];

    // @DataMember(Order=2)
    public allPermissions: string[];

    // @DataMember(Order=3)
    public meta: { [index: string]: string; };

    // @DataMember(Order=4)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<AssignRolesResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class UnAssignRolesResponse {
    // @DataMember(Order=1)
    public allRoles: string[];

    // @DataMember(Order=2)
    public allPermissions: string[];

    // @DataMember(Order=3)
    public meta: { [index: string]: string; };

    // @DataMember(Order=4)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UnAssignRolesResponse>) { (Object as any).assign(this, init); }
}

// @Route("/anon/settings")
export class SettingsRequest {

    public constructor(init?: Partial<SettingsRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SettingsRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { }
}

// @Route("/anon/web/settings")
export class WebSettingsRequest implements IReturn<WebSettings>
{

    public constructor(init?: Partial<WebSettingsRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'WebSettingsRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new WebSettings(); }
}

// @Route("/anon/mobile/settings")
export class MobileSettingsRequest implements IReturn<MobileSettings>
{

    public constructor(init?: Partial<MobileSettingsRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'MobileSettingsRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new MobileSettings(); }
}

// @Route("/settings")
export class SecureSettingsRequest implements IReturn<MessageDTO>
{

    public constructor(init?: Partial<SecureSettingsRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SecureSettingsRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new MessageDTO(); }
}

// @Route("/settings/ss-authenticate")
export class ServiceStackAuthenticateSecureSettingsRequest {

    public constructor(init?: Partial<ServiceStackAuthenticateSecureSettingsRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ServiceStackAuthenticateSecureSettingsRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { }
}

// @Route("/settings/core-authorizze")
export class NetCoreAuthorizeSecureSettingsRequest {

    public constructor(init?: Partial<NetCoreAuthorizeSecureSettingsRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'NetCoreAuthorizeSecureSettingsRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { }
}

// @Route("/helloAuth/customeronly")
export class HelloAuthCustomerRequest {
    public name: string;

    public constructor(init?: Partial<HelloAuthCustomerRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'HelloAuthCustomerRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { }
}

// @Route("/helloAuth/adminonly")
export class HelloAuthAdminRequest {
    public name: string;

    public constructor(init?: Partial<HelloAuthAdminRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'HelloAuthAdminRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { }
}

// @Route("/feedback", "POST")
export class PostFeedbackRequest extends FeedbackDTO implements IReturn<FeedbackDTO>
{

    public constructor(init?: Partial<PostFeedbackRequest>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'PostFeedbackRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new FeedbackDTO(); }
}

// @Route("/feedback/{Id}", "GET")
export class GetFeedbackRequest implements IReturn<FeedbackDTO>
{
    public id: number;

    public constructor(init?: Partial<GetFeedbackRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetFeedbackRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new FeedbackDTO(); }
}

// @Route("/feedbacks", "GET")
export class GetFeedbacksRequest {

    public constructor(init?: Partial<GetFeedbacksRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetFeedbacksRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { }
}

// @Route("/dismissfeedback", "POST")
export class PostDismissFeedbackRequest {
    public id: number;

    public constructor(init?: Partial<PostDismissFeedbackRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PostDismissFeedbackRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { }
}

// @Route("/completefeedback", "POST")
export class PostCompleteFeedbackRequest {
    public id: number;

    public constructor(init?: Partial<PostCompleteFeedbackRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PostCompleteFeedbackRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { }
}

// @Route("/elevatefeedback", "POST")
export class PostElevateFeedbackRequest {
    public id: number;

    public constructor(init?: Partial<PostElevateFeedbackRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PostElevateFeedbackRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { }
}

// @Route("/deletefeedback", "POST")
export class PostDeleteFeedbackRequest {
    public id: number;

    public constructor(init?: Partial<PostDeleteFeedbackRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PostDeleteFeedbackRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { }
}

// @Route("/permissions", "GET")
export class GetAllPermissionsRequest {

    public constructor(init?: Partial<GetAllPermissionsRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetAllPermissionsRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { }
}

// @Route("/pick-list-items", "POST")
// @Route("/pick-list-items/{Id}")
export class PickListItemRequest implements IReturn<PickListItem>
{
    public id?: number;
    public pickListTypeId: number;
    public code: string;
    public description: string;
    public isActive: boolean;
    public isDefault: boolean;
    public parentId: number;

    public constructor(init?: Partial<PickListItemRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PickListItemRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new PickListItem(); }
}

// @Route("/pick-list-items", "GET")
// @Route("/pick-list-items/type/{TypeCode}", "GET")
export class PickListItemsRequest {
    public id?: number;
    public typeCode: string;

    public constructor(init?: Partial<PickListItemsRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PickListItemsRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { }
}

// @Route("/pick-list-types", "POST")
// @Route("/pick-list-types/{Id}")
export class PickListTypeRequest implements IReturn<PickListType>
{
    public id?: number;
    public code: string;
    public description: string;
    public parentId?: number;
    public isActive: boolean;

    public constructor(init?: Partial<PickListTypeRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PickListTypeRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new PickListType(); }
}

// @Route("/pick-list-types", "GET")
export class PickListTypesRequest {

    public constructor(init?: Partial<PickListTypesRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PickListTypesRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { }
}

// @Route("/roles/{Id}", "GET")
export class GetRoleRequest implements IReturn<RoleDTO>
{
    public id: number;

    public constructor(init?: Partial<GetRoleRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetRoleRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new RoleDTO(); }
}

// @Route("/roles", "POST")
export class PostRoleRequest extends RoleDTO implements IReturn<RoleDTO>
{

    public constructor(init?: Partial<PostRoleRequest>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'PostRoleRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new RoleDTO(); }
}

// @Route("/roles", "GET")
export class GetRolesRequest {

    public constructor(init?: Partial<GetRolesRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetRolesRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { }
}

// @Route("/tenant/{Id}", "GET")
export class TenantRequest implements IReturn<Tenant>
{
    public id: number;

    public constructor(init?: Partial<TenantRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'TenantRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new Tenant(); }
}

// @Route("/tenant", "GET")
export class TenantsRequest {

    public constructor(init?: Partial<TenantsRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'TenantsRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { }
}

// @Route("/tenant", "POST")
// @Route("/tenant/{Id}")
export class TenantUpdateRequest implements IReturn<Tenant>
{
    public id?: number;
    public name: string;
    public isActive: boolean;

    public constructor(init?: Partial<TenantUpdateRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'TenantUpdateRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new Tenant(); }
}

// @Route("/tenant-names", "GET")
export class TenantNamesRequest {

    public constructor(init?: Partial<TenantNamesRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'TenantNamesRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { }
}

// @Route("/users/{Id}", "GET")
export class PunchcardUserDetailsRequest implements IReturn<PunchcardUser>
{
    public id: number;

    public constructor(init?: Partial<PunchcardUserDetailsRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PunchcardUserDetailsRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new PunchcardUser(); }
}

// @Route("/current-user", "GET")
export class CurrentUserRequest implements IReturn<CurrentUserDTO>
{

    public constructor(init?: Partial<CurrentUserRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CurrentUserRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new CurrentUserDTO(); }
}

// @Route("/tenant/user-update-info", "POST")
export class UpdateTenantUserInfoRequest extends UserDetailsDTO implements IReturn<CurrentUserDTO>
{

    public constructor(init?: Partial<UpdateTenantUserInfoRequest>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateTenantUserInfoRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CurrentUserDTO(); }
}

// @Route("/tenant/user-update-password", "POST")
export class UpdateTenantUserPasswordRequest extends UserDetailsDTO implements IReturn<CurrentUserDTO>
{

    public constructor(init?: Partial<UpdateTenantUserPasswordRequest>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateTenantUserPasswordRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CurrentUserDTO(); }
}

// @Route("/tenant/{TenantId}/users", "POST")
export class UpsertTenantUserRequest extends UserDetailsDTO implements IReturn<PunchcardUser>
{

    public constructor(init?: Partial<UpsertTenantUserRequest>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UpsertTenantUserRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new PunchcardUser(); }
}

// @Route("/user/delete", "DELETE")
export class DeleteUserRequest {

    public constructor(init?: Partial<DeleteUserRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteUserRequest'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { }
}

// @Route("/tenant/{TenantId}/users", "DELETE")
export class DeleteTenantUserRequest {
    public tenantId: number;
    public userId: number;

    public constructor(init?: Partial<DeleteTenantUserRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteTenantUserRequest'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { }
}

// @Route("/tenant/{TenantId}/all-users", "GET")
export class GetAllTenantUsersRequest {
    public tenantId?: number;

    public constructor(init?: Partial<GetAllTenantUsersRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetAllTenantUsersRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { }
}

// @Route("/tenant/{TenantId}/users/{UserId}", "GET")
export class GetTenantUserRequest implements IReturn<UserDetailsDTO>
{
    public tenantId: number;
    public userId: number;

    public constructor(init?: Partial<GetTenantUserRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetTenantUserRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new UserDetailsDTO(); }
}

// @Route("/tenant/{TenantId}/user-emails", "GET")
export class GetTenantUserEmailsRequest {
    public tenantId: number;

    public constructor(init?: Partial<GetTenantUserEmailsRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetTenantUserEmailsRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { }
}

// @Route("/data-table-example-data/movies", "GET")
export class DataTableExampleMoviesListRequest {

    public constructor(init?: Partial<DataTableExampleMoviesListRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DataTableExampleMoviesListRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { }
}

// @Route("/examples/logging")
export class LoggingExampleRequest implements IReturn<LoggingExampleResponse>
{

    public constructor(init?: Partial<LoggingExampleRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'LoggingExampleRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new LoggingExampleResponse(); }
}

/**
* Sign In
*/
// @Route("/auth", "OPTIONS,GET,POST,DELETE")
// @Route("/auth/{provider}", "OPTIONS,GET,POST,DELETE")
// @Api(Description="Sign In")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost {
    /**
    * AuthProvider, e.g. credentials
    */
    // @DataMember(Order=1)
    public provider: string;

    // @DataMember(Order=2)
    public state: string;

    // @DataMember(Order=3)
    public oauth_token: string;

    // @DataMember(Order=4)
    public oauth_verifier: string;

    // @DataMember(Order=5)
    public userName: string;

    // @DataMember(Order=6)
    public password: string;

    // @DataMember(Order=7)
    public rememberMe?: boolean;

    // @DataMember(Order=9)
    public errorView: string;

    // @DataMember(Order=10)
    public nonce: string;

    // @DataMember(Order=11)
    public uri: string;

    // @DataMember(Order=12)
    public response: string;

    // @DataMember(Order=13)
    public qop: string;

    // @DataMember(Order=14)
    public nc: string;

    // @DataMember(Order=15)
    public cnonce: string;

    // @DataMember(Order=17)
    public accessToken: string;

    // @DataMember(Order=18)
    public accessTokenSecret: string;

    // @DataMember(Order=19)
    public scope: string;

    // @DataMember(Order=20)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<Authenticate>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'Authenticate'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AuthenticateResponse(); }
}

// @Route("/assignroles", "POST")
// @DataContract
export class AssignRoles implements IReturn<AssignRolesResponse>, IPost {
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public permissions: string[];

    // @DataMember(Order=3)
    public roles: string[];

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<AssignRoles>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AssignRoles'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AssignRolesResponse(); }
}

// @Route("/unassignroles", "POST")
// @DataContract
export class UnAssignRoles implements IReturn<UnAssignRolesResponse>, IPost {
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public permissions: string[];

    // @DataMember(Order=3)
    public roles: string[];

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<UnAssignRoles>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UnAssignRoles'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new UnAssignRolesResponse(); }
}

