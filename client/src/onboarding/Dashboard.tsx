import React, { useEffect, useState } from 'react';
import onboardingAPI from 'APICalls/onboardingAPI';
import MerchandiseSummary from 'components/onboarding/MerchandiseSummary';
import PurchaseSummary from 'components/onboarding/PurchaseSummary';
import 'chart.js/auto';
import { Line, Pie } from 'react-chartjs-2';
import {
	Chart, ChartData, ChartOptions,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { toast } from 'react-toastify';
import { Page, PageHero } from 'components/core';
import HelpPanel from 'components/onboarding/HelpPanel';


Chart.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const defaultValue: DashboardDTO = {
	purchases: [],
	merchandises: [],
	chartRevenueTotal: {
		amounts: [1, 5, 22, 33, 44, 55, 56],
		yAxisLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	},
	chartTablesTotal: {
		amounts: [1, 5, 22, 33, 44, 55, 56],
		yAxisLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	},
};
const getDash = `
useEffect(() => {
	async function getDashboard() {
		const dash: DashboardDTO | null = await onboardingAPI.dashboard.getDashboard()`;
const purchase = `
<DataTable
	data={props.purchases}
	className="dashboardTable"
	columns={columns}
	filterable={false}
	resizable={false}
	showPagination={false}
	noDataText="No purchases found."
/>`;
const linegraph = `
const data = {
	labels: dash.chartRevenueTotal!.yAxisLabels!,
	datasets: [
		{
			label: 'Revenue',
			data: dash.chartRevenueTotal!.amounts!,
			borderColor: 'rgb(255, 99, 132)',
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		},
	],
};`;
const linegraphdata = `
<Line options={chartOptions} data={chartData} />;`;
const piegraph = `
const piedata = {
	labels: dash.chartTablesTotal!.yAxisLabels,
	datasets: [
		{
			data: dash.chartTablesTotal!.amounts!,
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				...
`;
const piegraphdata = `
<Pie data={pieData} />;`;
const azurefunction = `
[FunctionName("TimerFunction")]
	public static async Task RunAsync([TimerTrigger("0 0 */24 * * *")] TimerInfo myTimer, ILogger log)
	{
		try
		{
			var baseUrl = GetEnvironmentVariable("BASE_URL");
			var url = baseUrl + "/api/anon/bidderreport";
			using (HttpClient client = new HttpClient())
			{
				var result = await client.GetAsync(url);
				var responseMessage = await result.Content.ReadAsStringAsync();
			}
		}
`;
const bidderreport = `
string reportRecipient = _appSettings.BiddersExportEmail;
	if (reportRecipient != null && reportRecipient != "")
	{
		List<Bidder> bidders = await Db.Bidders.Where(x => x.Deleted == false).OrderBy(y => y.FullName).ToListAsync();
		if (bidders != null && bidders.Count > 0)
		{
			await SendBidderEmail(bidders.ToCsv());
			return "Email Sent";
		}
	} `;
const helpbuttons: helpDialog[] = [
	{
		title: 'Summary Tables',
		message: <div>On page load, <span className="codeExample">React.useEffect</span> loads dashboard data
			<pre><code>{getDash}</code></pre>
			the data is then passed to the <span className="elementExample">Purchase Summary</span> component,
			and within that component, to a datatable.
			<pre><code>{purchase}</code></pre>
			The same thing occurs for the Merchandise summary
		</div>,
		link: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/client/src/onboarding/Dashboard.tsx&version=GBfeature/biddersearch&line=63&lineEnd=63&lineStartColumn=2&lineEndColumn=19&lineStyle=plain&_a=contents',
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Server.ServiceInterface/CoreProject/DashboardService.cs&version=GBfeature/biddersearch&line=28&lineEnd=28&lineStartColumn=3&lineEndColumn=64&lineStyle=plain&_a=contents',
	},
	{
		title: 'Cumulative Totals',
		message: <div>On page load, <span className="codeExample">React.useEffect</span> loads dashboard data
			<pre><code>{getDash}</code></pre>
			Once loaded, the chart details are set.
			<pre><code>{linegraph}</code></pre>
			Then the chart details are assigned to the line graph
			<pre><code>{linegraphdata}</code></pre>
		</div>,
		link: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/client/src/onboarding/Dashboard.tsx&version=GBfeature/biddersearch&line=63&lineEnd=63&lineStartColumn=2&lineEndColumn=19&lineStyle=plain&_a=contents',
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Server.ServiceInterface/CoreProject/DashboardService.cs&version=GBfeature/biddersearch&line=28&lineEnd=28&lineStartColumn=3&lineEndColumn=64&lineStyle=plain&_a=contents',
	},
	{
		title: 'Purchases by Table',
		message: <div>On page load, <span className="codeExample">React.useEffect</span> loads dashboard data
			<pre><code>{getDash}</code></pre>
			Once loaded, the chart details are set.
			<pre><code>{piegraph}</code></pre>
			Then the chart details are assigned to the line graph
			<pre><code>{piegraphdata}</code></pre>
		</div>,
		link: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/client/src/onboarding/Dashboard.tsx&version=GBfeature/biddersearch&line=63&lineEnd=63&lineStartColumn=2&lineEndColumn=19&lineStyle=plain&_a=contents',
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Server.ServiceInterface/CoreProject/DashboardService.cs&version=GBfeature/biddersearch&line=28&lineEnd=28&lineStartColumn=3&lineEndColumn=64&lineStyle=plain&_a=contents',
	},
	{
		title: 'Customize Azure B2C',
		message: <div>
			B2C can be customized to change the background, or add additional fields to the signup page<br />
			<ul>
				<li>
					Switch Directory to Punchcard UAT B2C<br />
					<a target="_blank" href="https://onboardingdevstorage.blob.core.windows.net/b2chtml/b2c1.PNG" rel="noreferrer"><img style={{ border: '1px dashed gray', height: 80 }} src="https://onboardingdevstorage.blob.core.windows.net/b2chtml/b2c1.PNG" alt="Open B2C Directory" /></a>
				</li>
				<li>
					Open Azure B2C<br />
					<a target="_blank" href="https://onboardingdevstorage.blob.core.windows.net/b2chtml/b2c2.PNG" rel="noreferrer"><img style={{ border: '1px dashed gray', height: 80 }} src="https://onboardingdevstorage.blob.core.windows.net/b2chtml/b2c2.PNG" alt="Open B2C Directory" /></a>
				</li>
				<li>
					Open User Flows and select (or create) a User Flow for the application<br />
					<a target="_blank" href="https://onboardingdevstorage.blob.core.windows.net/b2chtml/b2c3.PNG" rel="noreferrer"><img style={{ border: '1px dashed gray', height: 80 }} src="https://onboardingdevstorage.blob.core.windows.net/b2chtml/b2c3.PNG" alt="Open B2C Directory" /></a>
				</li>
				<li>
					Open Page Layouts and select the <span className="elementExample">Unified sign up or sign in page</span><br />
					<a target="_blank" href="https://onboardingdevstorage.blob.core.windows.net/b2chtml/b2c4.PNG" rel="noreferrer"><img style={{ border: '1px dashed gray', height: 80 }} src="https://onboardingdevstorage.blob.core.windows.net/b2chtml/b2c4.PNG" alt="Open B2C Directory" /></a>
				</li>
				<li>
					Here, you can add a custom page URI (for a custom background)
				</li>
				<li>
					You can also add new fields for the Sign Up Page by updating the&nbsp;
					<span className="elementExample">User Attributes</span> and <span className="elementExample">Application Claims</span>
				</li>
			</ul>
		</div>,
	},
	{
		title: 'Azure Functions',
		message: <div>
			This project contains an Azure function that runs once a day, sending an email with an attached csv file.<br />
			Here, we define how often the function runs and the api end point called when the function executes.<br />
			To publish the function to Azure, right click the Azure Function project and select <span className="elementExample">Publish</span>.
			<pre><code>{azurefunction}</code></pre>
			The api end point retrieves the list of Bidders and sends the information via SendGrid.
			<pre><code>{bidderreport}</code></pre>
		</div>,
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Azure.Functions/TimerFunction.cs&version=GBmain&line=18&lineEnd=18&lineStartColumn=3&lineEndColumn=101&lineStyle=plain&_a=contents'
	},
];


const Dashboard = () => {
	const [dashboard, setDashboard] = useState(defaultValue);
	const [loading, setLoading] = useState(true);
	const [chartData, setChartData] = React.useState<ChartData<'line', number[], string>>({ datasets: [] });
	const [pieData, setPieData] = React.useState<ChartData<'pie', number[], string>>({ datasets: [] });
	const chartOptions = React.useMemo(() => {
		const options: ChartOptions<'line'> = {
			responsive: true,
			scales: {
				// to remove the labels
				x: {
					ticks: {
						display: false,
					},

					// to remove the x-axis grid
					grid: {
						drawBorder: false,
						display: false,
					},
				},
			},
		};
		return options;
	}, []);
	useEffect(() => {
		async function getDashboard() {
			const dash: DashboardDTO | null = await onboardingAPI.dashboard.getDashboard();
			if (dash !== null) {
				setDashboard(dash);
				const data = {
					labels: dash.chartRevenueTotal!.yAxisLabels!,
					datasets: [
						{
							label: 'Revenue',
							data: dash.chartRevenueTotal!.amounts!,
							borderColor: 'rgb(255, 99, 132)',
							backgroundColor: 'rgba(255, 99, 132, 0.5)',
						},
					],
				};
				const piedata = {
					labels: dash.chartTablesTotal!.yAxisLabels,
					datasets: [
						{
							data: dash.chartTablesTotal!.amounts!,
							backgroundColor: [
								'rgba(255, 99, 132, 0.2)',
								'rgba(54, 162, 235, 0.2)',
								'rgba(255, 206, 86, 0.2)',
								'rgba(75, 192, 192, 0.2)',
								'rgba(153, 102, 255, 0.2)',
								'rgba(255, 159, 64, 0.2)',
							],
							borderColor: [
								'rgba(255, 99, 132, 1)',
								'rgba(54, 162, 235, 1)',
								'rgba(255, 206, 86, 1)',
								'rgba(75, 192, 192, 1)',
								'rgba(153, 102, 255, 1)',
								'rgba(255, 159, 64, 1)',
							],
							borderWidth: 1,
						},
					],
				};
				setChartData(data);
				setPieData(piedata);
				setLoading(false);
			} else {
				toast.error('Unable to retrieve Dashboard Summary');
			}
		}
		getDashboard();
	}, []);

	if (loading) {
		return null;
	}
	return (
		<Page title="Dashboard">
			<HelpPanel helpButtons={helpbuttons} />
			<PageHero
				className="d-flex"
				title="Dashboard"
			/>

			<div className="row">
				<div className="col-lg-6">
					<PurchaseSummary purchases={dashboard.purchases!} />
				</div>
				<div className="col-lg-6">
					<MerchandiseSummary merchandise={dashboard.merchandises} />
				</div>
			</div>
			<div className="row">
				<div className="col-lg-6">
					<h4>Cumulative Totals</h4>
					<Line options={chartOptions} data={chartData} />;
				</div>
				<div className="col-lg-3">
					<h4>Purchases by Table</h4>
					<Pie data={pieData} />;
				</div>
			</div>
		</Page>
	);
};

export default Dashboard;