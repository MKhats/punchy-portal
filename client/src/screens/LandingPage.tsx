import React from 'react';
import { Page, PageHero, Spinner } from 'components/core';
import { IconAdd } from 'assets/icons';
import { useToast } from 'components/customHooks/useToast';
import { Select, RadioGroup, CheckboxGroup, Button, IconButton, Checkbox, TextArea } from 'components/core';
import { PickListSelect } from 'components/core/PicklistSelect';


const LandingPage = () => {
	const [selected, setSelected] = React.useState<string | undefined>(undefined);
	const [selectedCheck, setSelectedCheck] = React.useState<string[] | undefined>(undefined);
	const toast = useToast();

	const options = [
		{
			label: 'Josh',
			value: 'Josh',
			disabled: false,
		},
		{
			label: 'Ian',
			value: 'Ian',
			disabled: false,
		},
		{
			label: 'Robin',
			value: 'Robin',
			disabled: false,
		}
	];

	const superHeroes = [
		{
			label: 'Batman',
			value: 'Batman',
			name: 'Batman',
			disabled: false,
		},
		{
			label: 'Wonder Woman',
			value: 'Wonder Woman',
			name: 'Wonder Woman',
			disabled: false,
		},
		{
			label: 'Iron Man',
			value: 'Iron Man',
			name: 'Iron Man',
			disabled: false,
		}
	];

	return (
		<Page>
			<PageHero title="Welcome to Punchcard Core" />
			<div className="container-fluid">
				<div className="row mb-4">
					<div className="col-lg-3">
						<TextArea placeholder="Feed me strings" />
					</div>
					<div className="col-lg-3">
						<Button className="btn-primary" onClick={() => toast.success('How great are toasts, y\'know?')}>Notify!</Button>
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-lg-3">
						<Select
							options={[{ label: 'test', value: 'test' }]}
							onChange={(v: unknown) => console.log(v)}
						/>
					</div>
					<div className="col-lg-3">
						<Button className="btn-primary" onClick={() => toast.success('How great are toasts, y\'know?')}>Notify!</Button>
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-lg-3">
						<RadioGroup onChange={(v) => setSelected(v)} value={selected} name="Developers" options={options} />
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-lg-3">
						<CheckboxGroup onChange={(v) => setSelectedCheck(v)} value={selectedCheck} options={superHeroes} horizontal={true} />
					</div>
				</div>
				<div className="row">
					<div className="col-lg-3">
						<Button className="btn-secondary" loading={true} disabled={true}>hello</Button>
					</div>
					<div className="col-lg-3">
						<IconButton
							onClick={() => false}
							loading={true}
						>
							<IconAdd />
						</IconButton>
						<Spinner />
						<Checkbox isSwitch={true} />
					</div>
				</div>
				<PickListSelect
					picklistTypeCode="Province"
				/>
			</div>
		</Page>
	);
};

export default LandingPage;
