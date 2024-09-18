import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

// Default screens
import { LoadingPage, PageFooter } from './components/core';
import FourOhFourPage from './screens/404Page';
import FourOhOnePage from './screens/401Page';


// Admin Pages
import TenantListPage from './admin/Tenant/TenantListingPage';
import TenantDetailsPage from './admin/Tenant/TenantDetailsPage';
import TenantUserListPage from './admin/Users/TenantUserListPage';
import TenantUserDetailsPage from './admin/Users/TenantUserDetailsPage';
import RoleListingPage from './admin/Authorization/RoleListingPage';
import RoleDetailsPage from './admin/Authorization/RoleDetailsPage';
import PickListTypeListPage from './admin/PickList/PickListTypeListPage';
import PickListItemListPage from './admin/PickList/PickListItemListPage';
import PickListTypeDetails from './admin/PickList/PickListTypeDetails';
import PickListItemDetails from './admin/PickList/PickListItemDetails';

// User Settings Pages
import UpdateUserInfo from './screens/UpdateUserInfo';
import UserProfile from './screens/UserProfile';
import UpdateUserPassword from './screens/UpdateUserPassword';

// Feedback Pages
import FeedbackList from './screens/feedback/FeedbackList';
import FeedbackDetails from './screens/feedback/FeedbackDetails';
import FeedbackForm from './screens/feedback/FeedbackForm';

// App History Tracking
import { EventEmitter } from 'events';
import AppHistoryTrackerProvider from './screens/feedback/useAppHistoryTracker';
import TrackerWrapper from 'context/useTracking';

// Authorization Imports
import { Permissions } from './auth/Permissions';
import RequiresPermissions from './context/RequiresPermissions';

// Punchcard Core Exmaples. Delete before production.
import DataTableExample from './punchcard-core-examples/dataTableExample';
import FormControlExamplePage from './punchcard-core-examples/FormControlExamplePage';
import TabsExamplePage from './punchcard-core-examples/TabsExamplePage';
import ModalsExamplePage from './punchcard-core-examples/ModalsExamplePage';
import ToastsExamplePage from './punchcard-core-examples/ToastExamplePage';
import ButtonExamplePage from './punchcard-core-examples/ButtonsExamplePage';
import PickListSelectExample from './punchcard-core-examples/PicklistSelect';
import FormExample from './punchcard-core-examples/FormControlExample';
import NavBar from 'components/navigation/NavBar';
import Dashboard from 'onboarding/Dashboard';
import DonorList from 'onboarding/donor/DonorList';
import Donor from 'onboarding/donor/Donor';
import BidderList from 'onboarding/bidder/BidderList';
import Bidder from 'onboarding/bidder/Bidder';
import MerchandiseList from 'onboarding/merchandise/MerchandiseList';
import Merchandise from 'onboarding/merchandise/Merchandise';
import Purchase from 'onboarding/purchase/Purchase';
import TableList from 'onboarding/table/TableList';
import { SettingsContext } from 'context/SettingsContext';
import TannerOnboardingPage from 'onboarding/tannerOnBoarding/TannerOnboardingPage';
import Product from 'onboarding/products/Product';
import Tables from 'onboarding/bidderTable/Tables';
import TablesBidderList from 'onboarding/bidderTable/TablesBidderList';
import TablesList from 'onboarding/bidderTable/TablesList';
import PunchyPortal from 'components/punchyPortal/PunchyPortal';

export const eventEmitter = new EventEmitter();

const AppNavigator = () => {
	const { settings } = React.useContext(SettingsContext);

	const Root = () => (
		<AppHistoryTrackerProvider>
			<TrackerWrapper>
				<React.Fragment>
					<PunchyPortal />
					<Outlet /> {/* This is where the nested routes will render */}
				</React.Fragment>
			</TrackerWrapper>
		</AppHistoryTrackerProvider>
	);
	console.log(settings);
	const router = createBrowserRouter([
		{
			element: <Root />, // This is the root element that will be rendered
			errorElement: <FourOhFourPage />,
			children: [
				{
					path: '/',
					element: <Dashboard />,
				},
				{
					path: '/tannerOnboarding',
					element: <TannerOnboardingPage />
				},
				{
					path: '401',
					element: <FourOhOnePage />,
				},
				{
					path: 'AzureADB2C/Account/SignOut',
					element: <LoadingPage />,
				},
				{
					path: 'admin',
					children: [
						{
							path: 'tenants',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<TenantListPage />
								</RequiresPermissions>
							),
						},
						{
							path: 'tenants/:tenantId',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<TenantDetailsPage />
								</RequiresPermissions>
							),
						},
						{
							path: 'tenants/:tenantId/users',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadUser, Permissions.WriteUser]}>
									<TenantUserListPage />
								</RequiresPermissions>
							),
						},
						{
							path: 'tenants/:tenantId/users/:userId',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadUser, Permissions.WriteUser]}>
									<TenantUserDetailsPage />
								</RequiresPermissions>
							),
						},
						{
							path: 'roles',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadRole, Permissions.WriteRole]}>
									<RoleListingPage />
								</RequiresPermissions>
							),
						},
						{
							path: 'roles/:roleId',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadRole, Permissions.WriteRole]}>
									<RoleDetailsPage />
								</RequiresPermissions>
							),
						},
					],
				},
				{
					path: 'pick-lists',
					element: (
						<RequiresPermissions requiredPermissions={[Permissions.ReadPickList, Permissions.WritePickList]}>
							<PickListTypeListPage />
						</RequiresPermissions>
					),
				},
				{
					path: 'pick-lists/:pickListTypeId',
					element: (
						<RequiresPermissions requiredPermissions={[Permissions.ReadPickList, Permissions.WritePickList]}>
							<PickListTypeDetails />
						</RequiresPermissions>
					),
				},
				{
					path: 'pick-lists/:pickListTypeId/pick-list-items',
					element: (
						<RequiresPermissions requiredPermissions={[Permissions.ReadPickList, Permissions.WritePickList]}>
							<PickListItemListPage />
						</RequiresPermissions>
					),
				},
				{
					path: 'pick-lists/:pickListTypeId/pick-list-items/:pickListItemId',
					element: (
						<RequiresPermissions requiredPermissions={[Permissions.ReadPickList, Permissions.WritePickList]}>
							<PickListItemDetails />
						</RequiresPermissions>
					),
				},
				{
					path: 'settings',
					children: [
						{
							path: 'profile',
							element: <UserProfile />,
						},
						{
							path: 'update-info',
							element: <UpdateUserInfo />,
						},
						{
							path: 'update-password',
							element: settings?.allowUserPasswordChange ? <UpdateUserPassword /> : <FourOhFourPage />,
						},
					],
				},
				{
					path: 'feedback',
					element: <FeedbackForm />,
				},
				{
					path: 'feedback/feedbackList',
					element: (
						<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.ReadPickList, Permissions.ReadRole]}>
							<FeedbackList />
						</RequiresPermissions>
					),
				},
				{
					path: 'feedback/:feedbackId',
					element: (
						<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.ReadPickList, Permissions.ReadRole]}>
							<FeedbackDetails />
						</RequiresPermissions>
					),
				},
				{
					path: 'donor',
					children: [
						{
							path: 'donorlist',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<DonorList />
								</RequiresPermissions>
							),
						},
						{
							path: ':donorId',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<Donor />
								</RequiresPermissions>
							),
						},
					],
				},
				{
					path: 'bidder',
					children: [
						{
							path: 'bidderlist',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<BidderList />
								</RequiresPermissions>
							),
						},
						{
							path: ':bidderId',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<Bidder />
								</RequiresPermissions>
							),
						},
					],
				},
				{
					path: 'merchandise',
					children: [
						{
							path: 'merchandiselist',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<MerchandiseList />
								</RequiresPermissions>
							),
						},
						{
							path: ':merchandiseId',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<Merchandise />
								</RequiresPermissions>
							),
						},
					],
				},
				{
					path: 'purchase',
					children: [
						{
							path: 'purchase',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<Purchase />
								</RequiresPermissions>
							),
						},
					],
				},
				{
					path: 'table',
					children: [
						{
							path: 'tablelist',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<TableList />
								</RequiresPermissions>
							),
						},
					],
				},
				{
					path: 'donor',
					children: [
						{
							path: 'donorlist',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<DonorList />
								</RequiresPermissions>
							),
						},
						{
							path: ':donorId',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<Donor />
								</RequiresPermissions>
							),
						},
					],
				},
				{
					path: 'bidder',
					children: [
						{
							path: 'bidderlist',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<BidderList />
								</RequiresPermissions>
							),
						},
						{
							path: ':bidderId',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<Bidder />
								</RequiresPermissions>
							),
						},
					],
				},
				{
					path: 'merchandise',
					children: [
						{
							path: 'merchandiselist',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<MerchandiseList />
								</RequiresPermissions>
							),
						},
						{
							path: ':merchandiseId',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<Merchandise />
								</RequiresPermissions>
							),
						},
					],
				},
				{
					path: 'purchase',
					children: [
						{
							path: 'purchase',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<Purchase />
								</RequiresPermissions>
							),
						},
					],
				},
				{
					path: 'tables',
					children: [
						{
							path: 'tablelist',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<TablesList />
								</RequiresPermissions>
							),
						},
						{
							path: ':tableId',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>	
									<Tables />
								</RequiresPermissions>
							),
						},
						{
							path: ':tableId/bidders-list',
							element: (
								<RequiresPermissions requiredPermissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
									<TablesBidderList />
								</RequiresPermissions>
							),
						},
					],
				},
				{
					path: 'products',
					children: [
						{
							path: ':productId',
							element: <Product />
						}
					]
				},
				{
					path: 'punchcardcore',
					children: [
						{
							path: 'data-table',
							element: <DataTableExample />,
						},
						{
							path: 'form-controls',
							element: <FormControlExamplePage />,
						},
						{
							path: 'tabs-controls',
							element: <TabsExamplePage />,
						},
						{
							path: 'picklist-controls',
							element: <PickListSelectExample />,
						},
						{
							path: 'form-example',
							element: <FormExample />,
						},
						{
							path: 'modals',
							element: <ModalsExamplePage />,
						},
						{
							path: 'toasts',
							element: <ToastsExamplePage />,
						},
						{
							path: 'buttons',
							element: <ButtonExamplePage />,
						},
					],
				},
			],
		},
	]);

	return <RouterProvider router={router} fallbackElement={<LoadingPage />} />;
};

export default AppNavigator;