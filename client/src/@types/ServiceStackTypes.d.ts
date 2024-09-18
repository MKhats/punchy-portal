/* Options:
Date: 2024-06-13 16:42:37
Version: 6.10
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://localhost:44305/api

//GlobalNamespace: 
MakePropertiesOptional: False
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/


interface IReturn<T>
{
}

interface IReturnVoid
{
}

interface IHasSessionId
{
    sessionId: string;
}

interface IHasBearerToken
{
    bearerToken: string;
}

interface IPost
{
}

interface SelectOptionDTO
{
    value: string;
    label: string;
}

type FeedbackTypeEnum = "Bug" | "Issue";

interface DataTableExampleMovieDTO
{
    id: number;
    movieName: string;
    yearReleased: number;
    genre: string;
    directorId?: number;
    directorName: string;
}

interface PermissionDTO
{
    id: number;
    code: string;
    name: string;
    description: string;
}

interface BidderDTO
{
    id: number;
    tableId: number;
    fullName: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    homePhone: string;
    mobilePhone: string;
    email: string;
    dateAdded?: string;
    dateAddedYear?: number;
    deleted: boolean;
}

interface PurchaseDTO
{
    id: number;
    bidderOption: SelectOptionDTO;
    fullName: string;
    merchandiseOption: SelectOptionDTO;
    itemName: string;
    price: number;
    purchaseDate?: string;
    comment: string;
    paymentId: number;
    sendEmail: string;
}

interface ChartDTO
{
    amounts: number[];
    yAxisLabels: string[];
}

type DocumentParentType = "Merchandise" | "Feedback" | "Tables";

interface DonorDTO
{
    id: number;
    fullName: string;
    contactName: string;
    address: string;
    postalCode: string;
    city: string;
    province: string;
    homePhone: string;
    mobilePhone: string;
    email: string;
    dateAdded?: string;
    dateAddedYear?: number;
    deleted: boolean;
}

interface MerchandiseDTO
{
    id: number;
    receiptNumber: string;
    itemName: string;
    lotId: string;
    description: string;
    specialConditions: string;
    certificateInfo: string;
    hasCertificate: boolean;
    retailValue: number;
    reserveValue: number;
    salePrice: number;
    donorId: number;
    fullName: string;
    donorOption: SelectOptionDTO;
    dateAdded: string;
    deleted: boolean;
    donorList: DonorDTO[];
}

interface TablesDTO
{
    id: number;
    tableNumber: number;
    tableName: string;
    capacity: number;
    numberOfBidders: number;
    serverName: string;
    allowAlcohol: boolean;
    isDeleted: boolean;
}

// @DataContract
interface ResponseError
{
    // @DataMember(Order=1)
    errorCode: string;

    // @DataMember(Order=2)
    fieldName: string;

    // @DataMember(Order=3)
    message: string;

    // @DataMember(Order=4)
    meta: { [index: string]: string; };
}

// @DataContract
interface ResponseStatus
{
    // @DataMember(Order=1)
    errorCode: string;

    // @DataMember(Order=2)
    message: string;

    // @DataMember(Order=3)
    stackTrace: string;

    // @DataMember(Order=4)
    errors: ResponseError[];

    // @DataMember(Order=5)
    meta: { [index: string]: string; };
}

interface WebSettings
{
    b2CClientId: string;
    b2CSignInPolicyURL: string;
    b2CKnownAuthorities: string[];
    b2CApiScopes: string[];
    allowUserPasswordChange: boolean;
}

interface MobileSettings
{
    b2CBaseUrl: string;
    b2CTenantName: string;
    b2CSignInFlow: string;
    b2CAuthCallBack: string;
    b2CClientId: string;
    stripeAPIUrl: string;
    stripeAPIKey: string;
    b2CApiScopes: string[];
    allowUserPasswordChange: boolean;
}

interface MessageDTO
{
    message: string;
}

interface LoggingExampleResponse
{
    result: string;
}

interface ProductDTO
{
    id: number;
    tannerId: number;
    productName: string;
    productType: string;
}

interface PickListType
{
    id: number;
    code: string;
    description: string;
    parentId?: number;
    parent: PickListType;
    isActive: boolean;
}

interface PickListItem
{
    id: number;
    pickListTypeId: number;
    pickListType: PickListType;
    parentId?: number;
    parent: PickListItem;
    isDefault: boolean;
    code: string;
    description: string;
    isActive: boolean;
    value1: string;
    value2: string;
    lastModifiedBy: string;
    sort?: number;
}

interface RoleDTO
{
    id: number;
    name: string;
    description: string;
    isDefault: boolean;
    permissionIds: number[];
}

interface Tenant
{
    id: number;
    name: string;
    isActive: boolean;
    lastModifiedBy: string;
}

interface PunchcardUser
{
    id: number;
    tenantId?: number;
    tenant: Tenant;
    azureObjectId: string;
    lastModifiedBy: string;
    rolesList: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    email: string;
}

interface CurrentUserDTO
{
    id?: number;
    tenantId: number;
    firstName: string;
    lastName: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    permissions: string[];
}

interface UserDetailsDTO
{
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    roleIds: number[];
    tenantId?: number;
    isActive: boolean;
    password?: string;
}

interface Bidder
{
    id: number;
    tableId: number;
    fullName: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    homePhone: string;
    mobilePhone: string;
    email: string;
    deleted: boolean;
}

interface DashboardDTO
{
    purchases: PurchaseDTO[];
    merchandises: MerchandiseDTO[];
    chartRevenueTotal: ChartDTO;
    chartTablesTotal: ChartDTO;
}

interface Document
{
    id: number;
    parentId: number;
    parentType: DocumentParentType;
    documentName: string;
    documentURL: string;
    uploadDate: string;
    uploadUserId: string;
    deleted: boolean;
}

interface Donor
{
    id: number;
    fullName: string;
    contactName: string;
    address: string;
    postalCode: string;
    city: string;
    province: string;
    homePhone: string;
    mobilePhone: string;
    email: string;
    deleted: boolean;
}

interface Merchandise
{
    id: number;
    receiptNumber: string;
    itemName: string;
    lotId: string;
    description: string;
    specialConditions: string;
    certificateInfo: string;
    hasCertificate: boolean;
    retailValue: number;
    reserveValue: number;
    salePrice: number;
    donorId: number;
    dateAdded: string;
    deleted: boolean;
}

interface PurchasesDTO
{
    purchaseList: PurchaseDTO[];
    merchandiseList: MerchandiseDTO[];
    bidderList: BidderDTO[];
}

interface Purchase
{
    id: number;
    bidderId: number;
    merchandiseId: number;
    price: number;
    purchaseDate?: string;
    comment: string;
    paymentId: number;
}

interface Tables
{
    id: number;
    tableNumber: number;
    capacity: number;
    tableName: string;
    serverName: string;
    allowAlcohol: boolean;
    isDeleted: boolean;
}

interface FeedbackDTO
{
    id: number;
    description: string;
    userName: string;
    userEmail: string;
    priority: number;
    severity: string;
    feedbackType: FeedbackTypeEnum;
    submittedDate: string;
    completedDate?: string;
    elevatedDate?: string;
    deleted: boolean;
    dismissed: boolean;
    statusName: string;
    browser: string;
    browserVersion: string;
    computerOs: string;
    computerOsVersion: string;
    language: string;
    deviceOs: string;
    deviceVersion: string;
    deviceLanguage: string;
    appVersion: string;
    buildId: string;
    batteryPercentage: number;
    isLowPowerMode: boolean;
    pagesVisited: string;
    appPermissions: string;
}

// @DataContract
interface AuthenticateResponse extends IHasSessionId, IHasBearerToken
{
    // @DataMember(Order=1)
    userId: string;

    // @DataMember(Order=2)
    sessionId: string;

    // @DataMember(Order=3)
    userName: string;

    // @DataMember(Order=4)
    displayName: string;

    // @DataMember(Order=5)
    referrerUrl: string;

    // @DataMember(Order=6)
    bearerToken: string;

    // @DataMember(Order=7)
    refreshToken: string;

    // @DataMember(Order=8)
    profileUrl: string;

    // @DataMember(Order=9)
    roles: string[];

    // @DataMember(Order=10)
    permissions: string[];

    // @DataMember(Order=11)
    responseStatus: ResponseStatus;

    // @DataMember(Order=12)
    meta: { [index: string]: string; };
}

// @DataContract
interface AssignRolesResponse
{
    // @DataMember(Order=1)
    allRoles: string[];

    // @DataMember(Order=2)
    allPermissions: string[];

    // @DataMember(Order=3)
    meta: { [index: string]: string; };

    // @DataMember(Order=4)
    responseStatus: ResponseStatus;
}

// @DataContract
interface UnAssignRolesResponse
{
    // @DataMember(Order=1)
    allRoles: string[];

    // @DataMember(Order=2)
    allPermissions: string[];

    // @DataMember(Order=3)
    meta: { [index: string]: string; };

    // @DataMember(Order=4)
    responseStatus: ResponseStatus;
}

// @Route("/anon/settings")
interface SettingsRequest
{
}

// @Route("/anon/web/settings")
interface WebSettingsRequest extends IReturn<WebSettings>
{
}

// @Route("/anon/mobile/settings")
interface MobileSettingsRequest extends IReturn<MobileSettings>
{
}

// @Route("/settings")
interface SecureSettingsRequest extends IReturn<MessageDTO>
{
}

// @Route("/settings/ss-authenticate")
interface ServiceStackAuthenticateSecureSettingsRequest
{
}

// @Route("/settings/core-authorizze")
interface NetCoreAuthorizeSecureSettingsRequest
{
}

// @Route("/helloAuth/customeronly")
interface HelloAuthCustomerRequest
{
    name: string;
}

// @Route("/helloAuth/adminonly")
interface HelloAuthAdminRequest
{
    name: string;
}

// @Route("/mobile/notification/installations/{installationId}", "DELETE")
interface MobileNotificationDeleteInstallation
{
    installationId: string;
}

// @Route("/mobile/notification/installation/", "POST")
interface MobileNotificationInstallRequest
{
    installationId: string;
    platform: string;
    pushChannel: string;
    tags: IList<string>;
}

// @Route("/mobile/notification/requests/", "POST")
interface MobileNotificationRequest
{
    text: string;
    action: string;
    tags: string[];
    silent: boolean;
}

// @Route("/data-table-example-data/movies", "GET")
interface DataTableExampleMoviesListRequest
{
}

// @Route("/examples/logging")
interface LoggingExampleRequest extends IReturn<LoggingExampleResponse>
{
}

// @Route("/products")
interface ProductsRequest
{
}

// @Route("/products/{Id}")
interface ProductRequest extends IReturn<ProductDTO>
{
    id: number;
    tannerId: number;
    productName: string;
    productType: string;
}

// @Route("/deleteProduct/{Id}", "POST")
interface PostDeleteProductRequest
{
    id: number;
}

// @Route("/permissions", "GET")
interface GetAllPermissionsRequest
{
}

// @Route("/pick-list-items/{Id}")
interface PickListItemSingleRequest extends IReturn<PickListItem>
{
    id: number;
}

// @Route("/pick-list-items", "GET")
// @Route("/pick-list-items/type/{TypeCode}", "GET")
interface PickListItemsRequest
{
    id?: number;
    typeCode: string;
}

// @Route("/pick-list-types/{Id}", "GET")
interface PickListTypeSingleRequest extends IReturn<PickListType>
{
    id: number;
}

// @Route("/pick-list-types", "GET")
interface PickListTypesRequest
{
}

// @Route("/pick-list-types", "POST")
interface PickListTypeRequest extends IReturn<PickListType>
{
    id?: number;
    code: string;
    description: string;
    parentId?: number;
    isActive: boolean;
}

// @Route("/pick-list-items", "POST")
interface PickListItemRequest extends IReturn<PickListItem>
{
    id?: number;
    pickListTypeId: number;
    code: string;
    description: string;
    isActive: boolean;
    isDefault: boolean;
    parentId: number;
}

// @Route("/roles/{Id}", "GET")
interface GetRoleRequest extends IReturn<RoleDTO>
{
    id: number;
}

// @Route("/roles", "POST")
interface PostRoleRequest extends IReturn<RoleDTO>
{
    id?: number;
    name: string;
    description: string;
    permissionIds: number[];
}

// @Route("/roles", "GET")
interface GetRolesRequest
{
}

// @Route("/tenant/{Id}", "GET")
interface TenantRequest extends IReturn<Tenant>
{
    id: number;
}

// @Route("/tenant", "GET")
interface TenantsRequest
{
}

// @Route("/tenant", "POST")
// @Route("/tenant/{Id}")
interface TenantUpdateRequest extends IReturn<Tenant>
{
    id?: number;
    name: string;
    isActive: boolean;
}

// @Route("/tenant-names", "GET")
interface TenantNamesRequest
{
}

// @Route("/users/{Id}", "GET")
interface PunchcardUserDetailsRequest extends IReturn<PunchcardUser>
{
    id: number;
}

// @Route("/current-user", "GET")
interface CurrentUserRequest extends IReturn<CurrentUserDTO>
{
}

// @Route("/tenant/user-update-info", "POST")
interface UpdateTenantUserInfoRequest extends IReturn<CurrentUserDTO>
{
    firstName: string;
    lastName: string;
    email: string;
}

// @Route("/tenant/user-update-password", "POST")
interface UpdateTenantUserPasswordRequest extends IReturn<CurrentUserDTO>
{
    password: string;
}

// @Route("/tenant/{TenantId}/users", "POST")
interface UpsertTenantUserRequest extends UserDetailsDTO, IReturn<PunchcardUser>
{
}

// @Route("/user/delete", "DELETE")
interface DeleteUserRequest
{
}

// @Route("/tenant/{TenantId}/users", "DELETE")
interface DeleteTenantUserRequest
{
    tenantId: number;
    userId: number;
}

// @Route("/tenant/{TenantId}/all-users", "GET")
interface GetAllTenantUsersRequest
{
    tenantId?: number;
}

// @Route("/tenant/{TenantId}/users/{UserId}", "GET")
interface GetTenantUserRequest extends IReturn<UserDetailsDTO>
{
    tenantId: number;
    userId: number;
}

// @Route("/tenant/{TenantId}/user-emails", "GET")
interface GetTenantUserEmailsRequest
{
    tenantId: number;
}

// @Route("/Bidders")
interface BiddersRequest
{
}

// @Route("/Bidder/{Id}")
interface BidderRequest extends IReturn<Bidder>
{
    id: number;
    tableId: number;
    fullName: string;
    address: string;
    postalCode: string;
    city: string;
    province: string;
    homePhone: string;
    mobilePhone: string;
    email: string;
    deleted: boolean;
}

// @Route("/anon/BidderReport", "GET")
interface BidderReportRequest
{
}

// @Route("/deletebidder/{Id}", "POST")
interface PostDeleteBidderRequest
{
    id: number;
}

// @Route("/Dashboard")
interface DashboardRequest extends IReturn<DashboardDTO>
{
}

// @Route("/documentdelete", "POST")
interface DocumentDeleteRequest extends IReturn<Document>
{
}

// @Route("/document", "POST")
interface DocumentRequest
{
}

// @Route("/documents/{parentId}/{parentType}")
interface DocumentsRequest
{
    parentId: number;
    parentType: string;
}

// @Route("/donors")
interface DonorsRequest
{
}

// @Route("/donor/{Id}")
interface DonorRequest extends IReturn<Donor>
{
    id: number;
    fullName: string;
    contactName: string;
    address: string;
    postalCode: string;
    city: string;
    province: string;
    homePhone: string;
    mobilePhone: string;
    email: string;
    deleted: boolean;
}

// @Route("/deletedonor/{Id}", "POST")
interface PostDeleteDonorRequest
{
    id: number;
}

// @Route("/Merchandises")
interface MerchandisesRequest
{
}

// @Route("/Merchandise/{Id}")
interface MerchandiseRequest extends IReturn<Merchandise>
{
    id: number;
    receiptNumber: string;
    itemName: string;
    lotId: string;
    description: string;
    specialConditions: string;
    certificateInfo: string;
    hasCertificate: boolean;
    retailValue: number;
    reserveValue: number;
    salePrice: number;
    donorId: number;
    deleted: boolean;
    donorOption: SelectOptionDTO;
    dateAdded: string;
}

// @Route("/deletemerchandise/{Id}", "POST")
interface PostDeleteMerchandiseRequest
{
    id: number;
}

// @Route("/Purchases")
interface PurchasesRequest extends IReturn<PurchasesDTO>
{
}

// @Route("/Purchase/{Id}")
interface PurchaseRequest extends IReturn<Purchase>
{
    id: number;
    bidderOption: string;
    merchandiseOption: string;
    price: number;
    purchaseDate?: string;
    comment: string;
    paymentId: number;
    sendEmail: boolean;
}

// @Route("/PurchaseDelete/{id}")
interface PurchaseDeleteRequest
{
    id: number;
}

// @Route("/tables")
interface TablesRequest
{
}

// @Route("/tables/{Id}")
interface TableRequest extends IReturn<Tables>
{
    id: number;
    tableName: string;
    capacity: number;
    serverName: string;
    allowAlcohol: boolean;
    isDeleted: boolean;
}

// @Route("/deleteTable/{Id}", "POST")
interface PostDeleteTableRequest
{
    id: number;
}

// @Route("/feedback", "POST")
interface PostFeedbackRequest extends FeedbackDTO, IReturn<FeedbackDTO>
{
}

// @Route("/feedback/{Id}", "GET")
interface GetFeedbackRequest extends IReturn<FeedbackDTO>
{
    id: number;
}

// @Route("/feedbacks", "GET")
interface GetFeedbacksRequest
{
}

// @Route("/dismissfeedback", "POST")
interface PostDismissFeedbackRequest
{
    id: number;
}

// @Route("/completefeedback", "POST")
interface PostCompleteFeedbackRequest
{
    id: number;
}

// @Route("/elevatefeedback", "POST")
interface PostElevateFeedbackRequest
{
    id: number;
}

// @Route("/deletefeedback", "POST")
interface PostDeleteFeedbackRequest
{
    id: number;
}

/** @description Sign In */
// @Route("/auth", "OPTIONS,GET,POST,DELETE")
// @Route("/auth/{provider}", "OPTIONS,GET,POST,DELETE")
// @Api(Description="Sign In")
// @DataContract
interface Authenticate extends IReturn<AuthenticateResponse>, IPost
{
    /** @description AuthProvider, e.g. credentials */
    // @DataMember(Order=1)
    provider: string;

    // @DataMember(Order=2)
    state: string;

    // @DataMember(Order=3)
    oauth_token: string;

    // @DataMember(Order=4)
    oauth_verifier: string;

    // @DataMember(Order=5)
    userName: string;

    // @DataMember(Order=6)
    password: string;

    // @DataMember(Order=7)
    rememberMe?: boolean;

    // @DataMember(Order=9)
    errorView: string;

    // @DataMember(Order=10)
    nonce: string;

    // @DataMember(Order=11)
    uri: string;

    // @DataMember(Order=12)
    response: string;

    // @DataMember(Order=13)
    qop: string;

    // @DataMember(Order=14)
    nc: string;

    // @DataMember(Order=15)
    cnonce: string;

    // @DataMember(Order=17)
    accessToken: string;

    // @DataMember(Order=18)
    accessTokenSecret: string;

    // @DataMember(Order=19)
    scope: string;

    // @DataMember(Order=20)
    meta: { [index: string]: string; };
}

// @Route("/assignroles", "POST")
// @DataContract
interface AssignRoles extends IReturn<AssignRolesResponse>, IPost
{
    // @DataMember(Order=1)
    userName: string;

    // @DataMember(Order=2)
    permissions: string[];

    // @DataMember(Order=3)
    roles: string[];

    // @DataMember(Order=4)
    meta: { [index: string]: string; };
}

// @Route("/unassignroles", "POST")
// @DataContract
interface UnAssignRoles extends IReturn<UnAssignRolesResponse>, IPost
{
    // @DataMember(Order=1)
    userName: string;

    // @DataMember(Order=2)
    permissions: string[];

    // @DataMember(Order=3)
    roles: string[];

    // @DataMember(Order=4)
    meta: { [index: string]: string; };
}

